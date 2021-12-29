// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract HaikoinToken is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  address contractAddress;

  constructor(address marketplaceAddress) ERC721("Haikoins", "HAIK") {
    contractAddress = marketplaceAddress;
  }

  function createToken(string memory tokenURI) public returns (uint) {
    _tokenIds.increment();

    uint256 newTokenId = _tokenIds.current();

    _safeMint(msg.sender, newTokenId);
    _setTokenURI(newTokenId, tokenURI);
    setApprovalForAll(contractAddress, true);

    return newTokenId;
  }
}