export const  contractAddress ="0xd9725bd5d20b7725c6dc1eebef204bee20ac0e2e"
export const  contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_phoneNumber",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_email",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_bloodGroup",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_previousHistory",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_DateOfAdmissionOrDateOfVisit",
          "type": "string"
        }
      ],
      "name": "addRecord",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllRecord",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "phoneNumber",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "email",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "bloodGroup",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "previousHistory",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "DateOfAdmissionOrDateOfVisit",
              "type": "string"
            }
          ],
          "internalType": "struct MedicalRecordStorage.Record[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getRecordCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "recordList",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "phoneNumber",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "email",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "bloodGroup",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "previousHistory",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "DateOfAdmissionOrDateOfVisit",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_index",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_names",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_phoneNumber",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_email",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_bloodGroup",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_previousHistory",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_dateOfAdmission",
          "type": "string"
        }
      ],
      "name": "updateRecord",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]