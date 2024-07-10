// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import {MusicFactory} from "./MusicFactory.sol";


contract MusicCollection is ERC721URIStorage {

    string public songTitle;
    string public baseUri;
    string public limitedUri;
    uint256 public totalSupply;
    address public artist;

    MusicFactory factoryAddress;


    constructor(address _artist, address _factoryAddress, string memory _baseUri, string memory _songTitle, string memory _limited) ERC721("MusicCollection", "MC")  {
        artist = _artist;
        factoryAddress = MusicFactory(_factoryAddress);
        baseUri = _baseUri;
        songTitle = _songTitle;
        limitedUri = _limited;
    }



    // Check how many keys do you hold

    function getKeysNumber(address _shareSubject) view public returns (uint256) {
        return factoryAddress.keysBalance(_shareSubject, msg.sender);
    }


    // An artist send first edition to one of the key holders (this function is executed from the Factory.sol)

    function sendFirstEdition(address _to) public {
        require(totalSupply == 0, "The first edition has been already sent.");
        totalSupply++;
        _mint(_to, totalSupply);
        _setTokenURI(totalSupply, baseUri);
    } 


    // An artist send limited edition to one of the key holders (this function is executed from the Factory.sol)

    function sendLimitedEdition(address _to) public {
        require(totalSupply == 0, "The first edition has been already sent.");
        totalSupply++;
        _mint(_to, totalSupply);
        _setTokenURI(totalSupply, limitedUri);
    } 


    // Key holders can mint collectable music for free

    function mint(address _artist) public {
        require(getKeysNumber(_artist) > 0, "You do not own the key of this artist.");
        require(balanceOf(msg.sender) < 1, "You already own this collectable music.");
        totalSupply++;
        _mint(msg.sender, totalSupply);
        _setTokenURI(totalSupply, baseUri);
    }
 
}
