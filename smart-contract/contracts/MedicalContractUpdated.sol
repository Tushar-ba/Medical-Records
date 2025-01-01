// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

contract MedicalContract is OwnableUpgradeable,AccessControlUpgradeable {
    bytes32 public CAN_VIEW = keccak256("CAN_VIEW");
    uint256 public recordId = 1;

    struct Record {
        string name;
        string _hash;
        uint256 phNumber;
        string gender;
        string previousHistory;
        string bloodType;
    }
    
    mapping(uint256 => Record) private records;

    event RecordCreated(uint256 recordId, address recorder);
    event RecordDeleted(uint256 recordId, address recorder);
    event RecordUpdated(uint256 recordId, address recorder);

    error FieldsCannotBeEmpty();

    // Initializer function
    function initialize(address _initialOwner) public initializer {
        __Ownable_init(_initialOwner);
        _grantRole(DEFAULT_ADMIN_ROLE, _initialOwner);
    }

    // Create a record
    function createRecord(
        string memory _name,
        string memory _hash,
        uint256 _Phnumber,
        string memory _gender,
        string memory _bloodType,
        string memory _previoushistory
    ) public onlyOwner {
        if (bytes(_name).length == 0 && _Phnumber == 0 && bytes(_gender).length == 0 && bytes(_bloodType).length == 0) {
            revert FieldsCannotBeEmpty();
        }
        Record storage newRecord = records[recordId];
        newRecord.name = _name;
        newRecord._hash = _hash;
        newRecord.phNumber = _Phnumber;
        newRecord.bloodType = _bloodType;
        newRecord.gender = _gender;
        newRecord.previousHistory = _previoushistory;
        emit RecordCreated(recordId, msg.sender);
        recordId++;
    }

    //deleteRecord
    function deleteRecord(uint256 _recordId) onlyOwner external {
        delete records[_recordId];
        emit RecordDeleted(_recordId,msg.sender);
        recordId--;
    }

    function updateRecord(
                        uint256 _recordId,
                        string memory _name,
                        string memory _hash,
                        uint256 _Phnumber,
                        string memory _gender,
                        string memory _bloodType,
                        string memory _previoushistory
    ) public onlyOwner {
        Record storage newRecord = records[_recordId];
        newRecord.name = _name;
        newRecord._hash = _hash;
        newRecord.phNumber = _Phnumber;
        newRecord.bloodType = _bloodType;
        newRecord.gender = _gender;
        newRecord.previousHistory = _previoushistory;
        emit RecordCreated(_recordId, msg.sender);
    }

    function grantAccess(address _to) external  onlyRole(DEFAULT_ADMIN_ROLE){
        grantRole(CAN_VIEW,_to);
    }

    function revokeAccess(address _to) external onlyRole(DEFAULT_ADMIN_ROLE){
        revokeRole(CAN_VIEW,_to);
    }

    function viewTheRecord(uint256 _recordId) external view returns(Record memory) {
        require(hasRole(CAN_VIEW,msg.sender),"you dont have the role");
        Record memory info = records[_recordId];
        return info;
    }  
}
