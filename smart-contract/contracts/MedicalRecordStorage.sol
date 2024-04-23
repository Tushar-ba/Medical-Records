// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicalRecords {
    struct Record {
        string name;
        string phoneNumber;
        string email;
        string allergies;
        string bloodGroup;
        string previousHistory;
        string gender;
        uint timestamp;
    }

    mapping(address => Record) private records;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function addRecord(
        address patient,
        string memory name,
        string memory phoneNumber,
        string memory email,
        string memory allergies,
        string memory bloodGroup,
        string memory previousHistory,
        string memory gender
    ) public onlyOwner {
        records[patient] = Record(
            name,
            phoneNumber,
            email,
            allergies,
            bloodGroup,
            previousHistory,
            gender,
            block.timestamp
        );
    }

    function updateRecord(
        address patient,
        string memory name,
        string memory phoneNumber,
        string memory email,
        string memory allergies,
        string memory bloodGroup,
        string memory previousHistory,
        string memory gender
    ) public onlyOwner {
        require(records[patient].timestamp != 0, "Record does not exist");
        records[patient] = Record(
            name,
            phoneNumber,
            email,
            allergies,
            bloodGroup,
            previousHistory,
            gender,
            block.timestamp
        );
    }

    function getRecord(address patient) public view returns (
        string memory name,
        string memory phoneNumber,
        string memory email,
        string memory allergies,
        string memory bloodGroup,
        string memory previousHistory,
        string memory gender,
        uint timestamp
    ) {
        Record storage record = records[patient];
        return (
            record.name,
            record.phoneNumber,
            record.email,
            record.allergies,
            record.bloodGroup,
            record.previousHistory,
            record.gender,
            record.timestamp
        );
    }
}
// 0x85c92b6405c0d0d120a4bdd1de40bb7bfbb554c9