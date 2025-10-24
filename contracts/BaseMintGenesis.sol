// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract BaseMintGenesis is ERC721A, Ownable, Pausable, ReentrancyGuard {
    uint256 public constant MAX_SUPPLY = 10000;
    uint256 public constant MAX_MINTS_PER_WALLET = 5;
    string private _baseTokenURI;

    constructor() ERC721A("BaseMint Genesis", "BMG") {}

    function mint(uint256 quantity) external payable whenNotPaused nonReentrant {
        require(totalSupply() + quantity <= MAX_SUPPLY, "Exceeds max supply");
        require(
            _numberMinted(msg.sender) + quantity <= MAX_MINTS_PER_WALLET,
            "Exceeds max mints per wallet"
        );
        require(quantity > 0, "Quantity must be greater than 0");

        _mint(msg.sender, quantity);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function setBaseURI(string calldata baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function _startTokenId() internal view virtual override returns (uint256) {
        return 1;
    }
}
