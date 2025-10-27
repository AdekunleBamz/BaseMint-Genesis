const { ethers } = require('hardhat');

async function main() {
  // Get the contract
  const contractAddress = "0x0BBF2963b11732739b40fac2cD3AD3b16D2e1480";
  const BaseMintGenesis = await ethers.getContractFactory("BaseMintGenesis");
  const contract = BaseMintGenesis.attach(contractAddress);

  // Set the base URI to point to our metadata API
  const baseURI = "https://basemint-genesis.vercel.app/api/metadata/";
  
  console.log("Setting base URI to:", baseURI);
  
  const tx = await contract.setBaseURI(baseURI);
  await tx.wait();
  
  console.log("Base URI set successfully!");
  console.log("Transaction hash:", tx.hash);
  
  // Verify the base URI was set
  const currentBaseURI = await contract._baseURI();
  console.log("Current base URI:", currentBaseURI);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

