// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;


import "@openzeppelin/contracts/access/Ownable.sol";

import {MusicCollection} from "./MusicCollection.sol";
import {Verify} from "./Verify.sol";


contract Mutest is Ownable {

    address public protocolFeeDestination;
    uint256 public protocolFeePercent;
    uint256 public subjectFeePercent;
    uint256 public numberContracts;
    

    mapping(address => mapping(address => uint256)) public keysBalance;
    mapping(address => uint256) public keysSupply;


    MusicCollection[] public listOfAllCollections;
    Verify verifyContract;


    event Trade(address indexed trader, address indexed subject, bool isBuy, uint256 shareAmount, uint256 ethAmount, uint256 protocolEthAmount, uint256 subjectEthAmount, uint256 supply);



    constructor() Ownable(msg.sender) {
        
    }







    // Create new music collection and send the first edition

    event MusicCollectionCreated(address indexed creator, address collectionAddress);

    // Other contract code...

    function createMusicCollectionTwo(string memory _tokenString, address _to, string memory _songTitle, string memory _limited) public {
        require(keysBalance[msg.sender][_to] > 0, "Sender doesnt hold your key");
        MusicCollection create = new MusicCollection(msg.sender, address(this), _tokenString, _songTitle, _limited);
        listOfAllCollections.push(create);
        listOfAllCollections[numberContracts].sendLimitedEdition(_to);
        numberContracts++;

        emit MusicCollectionCreated(msg.sender, address(create)); // Emit the event
    }


   

    // Buy, sell and get price of the keys

     function setFeeDestination(address _feeDestination) public onlyOwner {
        protocolFeeDestination = _feeDestination;
    }


    function setProtocolFeePercent(uint256 _feePercent) public onlyOwner {
        protocolFeePercent = _feePercent;
    }


    function setSubjectFeePercent(uint256 _feePercent) public onlyOwner {
        subjectFeePercent = _feePercent;
    }


    function getPrice(uint256 supply, uint256 amount) public pure returns (uint256) {
        uint256 sum1 = supply == 0 ? 0 : (supply - 1 )* (supply) * (2 * (supply - 1) + 1) / 6;
        uint256 sum2 = supply == 0 && amount == 1 ? 0 : (supply - 1 + amount) * (supply + amount) * (2 * (supply - 1 + amount) + 1) / 6;
        uint256 summation = sum2 - sum1;
        return summation * 1 ether / 16000;
    }


    function getBuyPrice(address sharesSubject, uint256 amount) public view returns (uint256) {
        return getPrice(keysSupply[sharesSubject], amount);
    }


    function getSellPrice(address sharesSubject, uint256 amount) public view returns (uint256) {
        return getPrice(keysSupply[sharesSubject] - amount, amount);
    }


    function getBuyPriceAfterFee(address sharesSubject, uint256 amount) public view returns (uint256) {
        uint256 price = getBuyPrice(sharesSubject, amount);
        uint256 protocolFee = price * protocolFeePercent / 1 ether;
        uint256 subjectFee = price * subjectFeePercent / 1 ether;
        return price + protocolFee + subjectFee;
    }


    function getSellPriceAfterFee(address sharesSubject, uint256 amount) public view returns (uint256) {
        uint256 price = getSellPrice(sharesSubject, amount);
        uint256 protocolFee = price * protocolFeePercent / 1 ether;
        uint256 subjectFee = price * subjectFeePercent / 1 ether;
        return price - protocolFee - subjectFee;
    }


    function buyShares(address sharesSubject, uint256 amount) public payable {
        uint256 supply = keysSupply[sharesSubject];
        uint256 price = getPrice(supply, amount);
        uint256 protocolFee = price * protocolFeePercent / 1 ether;
        uint256 subjectFee = price * subjectFeePercent / 1 ether;
        require(msg.value >= price + protocolFee + subjectFee, "Insufficient payment");
        keysBalance[sharesSubject][msg.sender] = keysBalance[sharesSubject][msg.sender] + amount;
        keysSupply[sharesSubject] = supply + amount;
        emit Trade(msg.sender, sharesSubject, true, amount, price, protocolFee, subjectFee, supply + amount);
        (bool success1, ) = protocolFeeDestination.call{value: protocolFee}("");
        (bool success2, ) = sharesSubject.call{value: subjectFee}("");
        require(success1 && success2, "Unable to send funds");
    }


    function sellShares(address sharesSubject, uint256 amount) public payable {
        uint256 supply = keysSupply[sharesSubject];
        require(supply > amount, "Cannot sell the last share");
        uint256 price = getPrice(supply - amount, amount);
        uint256 protocolFee = price * protocolFeePercent / 1 ether;
        uint256 subjectFee = price * subjectFeePercent / 1 ether;
        require(keysBalance[sharesSubject][msg.sender] >= amount, "Insufficient shares");
        keysBalance[sharesSubject][msg.sender] = keysBalance[sharesSubject][msg.sender] - amount;
        keysSupply[sharesSubject] = supply - amount;
        emit Trade(msg.sender, sharesSubject, false, amount, price, protocolFee, subjectFee, supply - amount);
        (bool success1, ) = msg.sender.call{value: price - protocolFee - subjectFee}("");
        (bool success2, ) = protocolFeeDestination.call{value: protocolFee}("");
        (bool success3, ) = sharesSubject.call{value: subjectFee}("");
        require(success1 && success2 && success3, "Unable to send funds");
    }





}