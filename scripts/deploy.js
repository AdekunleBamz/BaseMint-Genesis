const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Deploying BaseMint Genesis to Base Mainnet...");
  const network = await hre.ethers.provider.getNetwork();
  console.log(`🌐 Network: ${network.name} (chainId: ${network.chainId})`);
  
  // Get deployer info
  const [deployer] = await hre.ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  const balanceWei = await hre.ethers.provider.getBalance(deployerAddress);
  console.log(`👤 Deployer: ${deployerAddress}`);
  console.log(`💰 Balance: ${hre.ethers.formatEther(balanceWei)} ETH`);
  
  // Get the contract factory
  const BaseMintGenesis = await hre.ethers.getContractFactory("BaseMintGenesis");

  // Estimate deployment gas and cost with fee data
  const deployTxRequest = await BaseMintGenesis.getDeployTransaction();
  const feeData = await hre.ethers.provider.getFeeData();
  // Fallbacks for networks that may not return both EIP-1559 fields
  const oneGwei = hre.ethers.parseUnits("1", "gwei");
  const maxFeePerGas = feeData.maxFeePerGas || feeData.gasPrice || oneGwei;
  const maxPriorityFeePerGas = feeData.maxPriorityFeePerGas || hre.ethers.parseUnits("0.1", "gwei");

  let gasEstimate;
  try {
    gasEstimate = await hre.ethers.provider.estimateGas({
      from: deployerAddress,
      to: undefined, // contract creation
      data: deployTxRequest.data,
      value: deployTxRequest.value || 0n
    });
  } catch (e) {
    // Conservative fallback if node can't estimate
    gasEstimate = 2_500_000n;
  }

  // Over-estimate a bit to be safe
  const gasBuffer = gasEstimate + (gasEstimate / 10n); // +10%
  const estimatedCostWei = gasBuffer * (maxFeePerGas || oneGwei);
  console.log(`🧮 Estimated gas: ${gasEstimate.toString()} (buffered: ${gasBuffer.toString()})`);
  console.log(`⛽ Max fee per gas: ${hre.ethers.formatUnits(maxFeePerGas, "gwei")} gwei`);
  console.log(`💵 Estimated max deploy cost: ${hre.ethers.formatEther(estimatedCostWei)} ETH`);

  if (balanceWei < estimatedCostWei) {
    const shortfallWei = estimatedCostWei - balanceWei;
    console.error("❌ Insufficient funds for deployment.");
    console.error(`   Needed:  ${hre.ethers.formatEther(estimatedCostWei)} ETH`);
    console.error(`   Have:    ${hre.ethers.formatEther(balanceWei)} ETH`);
    console.error(`   Short:   ${hre.ethers.formatEther(shortfallWei)} ETH`);
    console.error("👉 Top up your wallet on Base (chainId 8453) and try again.");
    process.exit(1);
  }

  // Deploy the contract
  console.log("📦 Deploying contract...");
  const baseMintGenesis = await BaseMintGenesis.deploy({
    maxFeePerGas,
    maxPriorityFeePerGas
  });
  
  // Wait for deployment to complete
  await baseMintGenesis.waitForDeployment();
  
  const contractAddress = await baseMintGenesis.getAddress();
  console.log("✅ BaseMint Genesis deployed to:", contractAddress);
  const deployTx = baseMintGenesis.deploymentTransaction();
  console.log("🔗 Transaction hash:", deployTx?.hash);

  // Wait for receipt and print actual gas used and cost
  const receipt = await deployTx.wait();
  const gasUsed = receipt.gasUsed;
  const effectiveGasPrice = receipt.effectiveGasPrice || maxFeePerGas;
  const actualCostWei = gasUsed * effectiveGasPrice;
  console.log(`🧾 Gas used: ${gasUsed.toString()} @ ${hre.ethers.formatUnits(effectiveGasPrice, "gwei")} gwei`);
  console.log(`💸 Actual deploy cost: ${hre.ethers.formatEther(actualCostWei)} ETH`);

  // Save contract address to frontend config
  const frontendConfigPath = path.join(__dirname, "..", "app", "config", "contract.ts");
  
  // Create config directory if it doesn't exist
  const configDir = path.dirname(frontendConfigPath);
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }
  
  // Write contract address to frontend config
  const configContent = `// Auto-generated contract configuration
export const CONTRACT_ADDRESS = "${contractAddress}";
export const CHAIN_ID = 8453; // Base Mainnet
export const CHAIN_NAME = "Base";
export const RPC_URL = "https://mainnet.base.org";
export const BLOCK_EXPLORER_URL = "https://basescan.org";
`;
  
  fs.writeFileSync(frontendConfigPath, configContent);
  console.log("📝 Contract address saved to frontend config");
  
  // Also save to a simple JSON file for easy access
  const contractInfo = {
    address: contractAddress,
    chainId: 8453,
    chainName: "Base",
    rpcUrl: "https://mainnet.base.org",
    blockExplorerUrl: "https://basescan.org",
    deployedAt: new Date().toISOString(),
    transactionHash: deployTx?.hash,
    gasUsed: gasUsed.toString(),
    effectiveGasPriceGwei: hre.ethers.formatUnits(effectiveGasPrice, "gwei"),
    actualCostEth: hre.ethers.formatEther(actualCostWei)
  };
  
  fs.writeFileSync(
    path.join(__dirname, "..", "contract-info.json"),
    JSON.stringify(contractInfo, null, 2)
  );
  
  console.log("📄 Contract info saved to contract-info.json");
  console.log("\n🎉 Deployment completed successfully!");
  console.log("📋 Next steps:");
  console.log("1. Add your private key to .env file");
  console.log("2. Run: npm install");
  console.log("3. Run: npm run dev");
  console.log("4. Visit your frontend to start minting!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
