// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TicketNFT is ERC721Enumerable, Ownable {
  using Strings for uint256;

  //baseURI is the location URL of the user (document containing the node).
  string baseURI;
  string public baseExtension = ".json";
  uint256 public cost = 0.0001 ether;
  uint256 public maxSupply = 100;

  mapping(uint256 => string) public tokenURIs;
  mapping(string => uint256) public tokenIds;

  constructor(
    string memory _name,
    string memory _symbol,
    string memory _initBaseURI
  ) ERC721(_name, _symbol) {
    setBaseURI(_initBaseURI);
  }

  // internal
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

   function burn(uint256 tokenId) internal {
      _burn(tokenId);
  }

  function _transferFrom(address from, address to, uint256 tokenId) internal {
    transferFrom(from, to, tokenId);
  }

  // public
  function mintTicket(string memory _tokenURI) public payable {
    uint256 supply = totalSupply();
    // require(supply <= maxSupply);

    if (msg.sender != owner()) {
      require(msg.value >= cost);
    }

    uint256 _tokenId = supply + 1;

    _mint(msg.sender, _tokenId);
    _setTokenURI(_tokenId, _tokenURI);
  }

  function checkOwner(uint256 tokenId) public view returns (address) {

    require(_exists(tokenId), "cannot check owner of nonexistent token");

    address owner = ownerOf(tokenId);
    return owner;
  }

  function getValueAtMapping(string memory ticketURI)  public view returns(uint256 value) {
      return tokenIds[ticketURI];
}

  // function walletOfOwner(address _owner) public view returns (uint256[] memory) {
  //   uint256 ownerTokenCount = balanceOf(_owner);
  //   uint256[] memory _tokenIds = new uint256[](ownerTokenCount);
  //   for (uint256 i; i < ownerTokenCount; i++) {
  //     tokenIds[i.toString()] = tokenOfOwnerByIndex(_owner, i);
  //   }
  //   return _tokenIds;
  // }

  //tokenURI related funtions

  function _setTokenURI(uint256 tokenId,  string memory _tokenURI) internal virtual {


    string memory currentBaseURI = _baseURI();

    tokenURIs[tokenId] = string(abi.encodePacked(currentBaseURI, _tokenURI, baseExtension));
    tokenIds[string(abi.encodePacked(currentBaseURI, _tokenURI, baseExtension))] = tokenId;
  }

  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

    string memory currentBaseURI = _baseURI();

    return
      bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
        : "no uri";
  }


//functions for changing values.

  function setSupply(uint256 _newSupply) public {
    maxSupply = _newSupply;
  }

  // Only owner
  function setCost(uint256 _newCost) public onlyOwner {
    cost = _newCost;
  }

  function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
  }

  function withdraw() public payable onlyOwner {
    (bool success, ) = payable(msg.sender).call{ value: address(this).balance }("");
    require(success);
  }
}
