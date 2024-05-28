// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicalRecords {
    address public owner;

    struct Record {
        string name;
        string sex;
        uint age;
        string phoneNumber;
        string previousHistory;
        string email;
        string ipfsHash; // Hash of the file stored on IPFS
    }

    mapping(address => Record) private records;
    mapping(address => bool) private recordExists;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    event RecordCreated(address indexed patientAddress, string name);
    event RecordUpdated(address indexed patientAddress, string name);
    event RecordDeleted(address indexed patientAddress);

    constructor() {
        owner = msg.sender;
    }

    function createRecord(
        address _patientAddress,
        string memory _name,
        string memory _sex,
        uint _age,
        string memory _phoneNumber,
        string memory _previousHistory,
        string memory _email,
        string memory _ipfsHash
    ) public onlyOwner {
        require(!recordExists[_patientAddress], "Record already exists for this address");

        records[_patientAddress] = Record({
            name: _name,
            sex: _sex,
            age: _age,
            phoneNumber: _phoneNumber,
            previousHistory: _previousHistory,
            email: _email,
            ipfsHash: _ipfsHash
        });

        recordExists[_patientAddress] = true;
        emit RecordCreated(_patientAddress, _name);
    }

    function updateRecord(
        address _patientAddress,
        string memory _name,
        string memory _sex,
        uint _age,
        string memory _phoneNumber,
        string memory _previousHistory,
        string memory _email,
        string memory _ipfsHash
    ) public onlyOwner {
        require(recordExists[_patientAddress], "Record does not exist for this address");

        records[_patientAddress] = Record({
            name: _name,
            sex: _sex,
            age: _age,
            phoneNumber: _phoneNumber,
            previousHistory: _previousHistory,
            email: _email,
            ipfsHash: _ipfsHash
        });

        emit RecordUpdated(_patientAddress, _name);
    }

    function deleteRecord(address _patientAddress) public onlyOwner {
        require(recordExists[_patientAddress], "Record does not exist for this address");

        delete records[_patientAddress];
        recordExists[_patientAddress] = false;

        emit RecordDeleted(_patientAddress);
    }

    function getRecord(address _patientAddress) public view returns (
        string memory name,
        string memory sex,
        uint age,
        string memory phoneNumber,
        string memory previousHistory,
        string memory email,
        string memory ipfsHash
    ) {
        require(recordExists[_patientAddress], "Record does not exist for this address");

        Record storage record = records[_patientAddress];
        return (
            record.name,
            record.sex,
            record.age,
            record.phoneNumber,
            record.previousHistory,
            record.email,
            record.ipfsHash
        );
    }
}
