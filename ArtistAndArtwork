pragma solidity ^0.5.0;

import "Context.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721Receiver.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/drafts/Counters.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/introspection/ERC165.sol";


    // The artist can have a collection of artworks that they have created

contract Artist is IERC721 {

    // Mapping from token ID to owner
    mapping (uint256 => address) private _tokenOwner;
    // Mapping from token ID to approved address
    mapping (uint256 => address) private _tokenApprovals;
    // Mapping from owner to number of owned token
    mapping (address => Counters.Counter) private _ownedTokensCount;
    // Mapping from owner to operator approvals
    mapping (address => mapping (address => bool)) private _operatorApprovals;

    // Equals to `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`
    // which can be also obtained as `IERC721Receiver(0).onERC721Received.selector`
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    bytes4 private constant _InterfaceId_ERC721 = 0x80ac58cd;
  /*
   * 0x80ac58cd ===
   *   bytes4(keccak256('balanceOf(address)')) ^
   *   bytes4(keccak256('ownerOf(uint256)')) ^
   *   bytes4(keccak256('approve(address,uint256)')) ^
   *   bytes4(keccak256('getApproved(uint256)')) ^
   *   bytes4(keccak256('setApprovalForAll(address,bool)')) ^
   *   bytes4(keccak256('isApprovedForAll(address,address)')) ^
   *   bytes4(keccak256('transferFrom(address,address,uint256)')) ^
   *   bytes4(keccak256('safeTransferFrom(address,address,uint256)')) ^
   *   bytes4(keccak256('safeTransferFrom(address,address,uint256,bytes)'))
   */





    // Collection of artworks by this Artist
    mapping(uint => ArtWork) artworks;
    address artist;

    // constructor is used to initialize an object
    // constructor should be of the same name as that of class
    // register the supported interfaces to conform to ERC721 via ERC165
    
    constructor() public {
        artist = msg.sender;
        _registerInterface(_InterfaceId_ERC721);

    }

    // The artist can make new artworks and add them to their collection
    
    function createArtwork(uint hashIPFS, string memory Name) public returns (ArtWork) {
       ArtWork artContract = new ArtWork(hashIPFS, Name, artist);
       artworks[hashIPFS] = artContract;
       return artContract;
    }
    
    //  
    //  Gets the owner of the specified token ID.
    //  tokenId uint256 ID of the token to query the owner of
    //  eturn address currently marked as the owner of the given token ID
    //  
    
    function ownerOf(uint256 tokenId) public view returns (address) {
        address owner = _tokenOwner[tokenId];
        require(owner != address(0), "ERC721: owner query for nonexistent token");

        return owner;
    }

    
    // Check to see if the artist is the originator of an artwork
    
    function checkArtwork(uint hashIPFS) public view returns(bool) {
        if(artworks[hashIPFS] == ArtWork(0x0)) {
            return false;
        }
        return true;  
    }
}
    // An artwork is stored on IPFS and we keep the hash and name of the artwork on the blockchain

contract ArtWork is IERC721 {

    event Transfer(address indexed from, address indexed to, uint256 tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 tokenId);
    // Mapping from token ID to approved address
    mapping (uint256 => address) private _tokenApprovals;
    // Mapping from token ID to owner
    mapping (uint256 => address) private _tokenOwner;
    // Mapping from owner to operator approvals
    mapping (address => mapping (address => bool)) private _operatorApprovals;

  
    
    // Detail of artwork 
    address artist;
    string  name;
    uint  hashIPFS;
    address owner;
    
    constructor(uint ipfsHash, string memory artName, address originalOwner) public {
        artist = msg.sender;
        name = artName;
        hashIPFS = ipfsHash;
        owner = originalOwner;
    }

    // An artwork can change ownership
    // 
    // Safely transfers the ownership of a given token ID to another address
    // otherwise the transfer is reverted.
    // Requires the msg.sender to be the owner, approved, or operator
    // from current owner of the token
    // to address to receive the ownership of the given token ID
    // tokenId uint256 ID of the token to be transferred
    //  
    function safeTransferFrom(address from, address to, uint256 tokenId) public {
       require(msg.sender == owner, "ERC721: transfer caller is not owner nor approved");
       safeTransferFrom(from, to, tokenId, "");
    }
    
    
    //  
    // Approves another address to transfer the given token ID
    // The zero address indicates there is no approved address.
    // There can only be one approved address per token at a given time.
    // Can only be called by the token owner or an approved operator.
    // @param to address to be approved for the given token ID
    // @param tokenId uint256 ID of the token to be approved
    //  
    function approve(address to, uint256 tokenId) public {
        require(to != owner, "ERC721: approval to current owner");
        require(msg.sender == owner || isApprovedForAll(owner, msg.sender),
            "ERC721: approve caller is not owner nor approved for all");
        tokenId = to;
        emit Approval(owner, to, tokenId);
    }   
        
        
    // 
    // Gets the approved address for a token ID, or zero if no address set
    // Reverts if the token ID does not exist.
    // @param tokenId uint256 ID of the token to query the approval of
    // @return address currently approved for the given token ID
    //  
    function getApproved(uint256 tokenId) public view returns (address) {
        require(_exists(tokenId), "ERC721: approved query for nonexistent token");
        return _tokenApprovals[tokenId];
    }

    // 
    // Returns whether the specified token exists.
    // @param tokenId uint256 ID of the token to query the existence of
    // @return bool whether the token exists
    // 
    function _exists(uint256 tokenId) internal view returns (bool) {
        owner = _tokenOwner[tokenId];
        return owner != address(0);
    }

    // 
    // Returns whether the given spender can transfer a given token ID.
    // @param spender address of the spender to query
    // @param tokenId uint256 ID of the token to be transferred
    // @return bool whether the msg.sender is approved for the given token ID,
    // is an operator of the owner, or is the owner of the token
    // 
    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view returns (bool) {
        require(_exists(tokenId), "ERC721: operator query for nonexistent token");
        owner = _tokenOwner[tokenId];
        return (spender == owner || getApproved(tokenId) == spender || isApprovedForAll(owner, spender));
    }

    // 
    // Sets or unsets the approval of a given operator
    // An operator is allowed to transfer all tokens of the sender on their behalf.
    // @param to operator address to set the approval
    // @param approved representing the status of the approval to be set
    //  
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "ERC721: approve to caller");

        _operatorApprovals[msg.sender][to] = approved;
        emit Approval(msg.sender, to, approved);
    }

    // 
    // Tells whether an operator is approved by a given owner.
    // @param owner owner address which you want to query the approval of
    // @param operator operator address which you want to query the approval of
    // @return bool whether the given operator is approved by the given owner
    // 
    function isApprovedForAll(address owner, address operator) public view returns (bool) {
        return _operatorApprovals[owner][operator];
    }
    
}   
    
    
