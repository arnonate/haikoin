// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";

contract HaikoinToken is ERC721, ERC721URIStorage, ERC721Enumerable, Ownable {
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIds;

  // address contractAddress;

  // constructor(address marketplaceAddress) ERC721("Haikoins", "HAIK") {
  //   contractAddress = marketplaceAddress;
  // }

  constructor() ERC721("Haikoins", "HAIK") {}

  // Overrides
  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, tokenId);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, ERC721Enumerable)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    super._burn(tokenId);
  }

  function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721, ERC721URIStorage)
    returns (string memory)
  {
    return super.tokenURI(tokenId);
  }

  // Methods
  function burnHaikoin(uint256 tokenId) public {
    _burn(tokenId);
  }

  function fetchHaikoinsOwned(address _owner)
    external
    view
    returns (string[] memory)
  {
    uint256 tokenCount = balanceOf(_owner);
    string[] memory tokenIds = new string[](tokenCount);

    for (uint256 i = 0; i < tokenCount; i++) {
      tokenIds[i] = tokenURI(tokenOfOwnerByIndex(_owner, i));
    }

    return tokenIds;
  }

  function mintHaikoin(string memory ipfsURI) public payable {
    _tokenIds.increment();
    uint256 newTokenId = _tokenIds.current();

    _safeMint(msg.sender, newTokenId);
    _setTokenURI(newTokenId, ipfsURI);
  }

  function transferHaikoin(
    address from,
    address to,
    uint256 tokenId
  ) external {
    require(ownerOf(tokenId) == from, "From address must be token owner");

    safeTransferFrom(from, to, tokenId);
  }
}
