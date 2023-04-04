// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract IPFShashStorage {
    struct File {
        string fileName;
        string ipfsHash;
    }

    mapping(string => File) private files;

    function upload (string memory fileName, string memory ipfsHash) public {
        require(bytes(files[fileName].ipfsHash).length == 0, "File already exsits");
        files[fileName] = File(fileName, ipfsHash);
    }

    function getIPFSHash(string memory fileName) public view returns (string memory) {
        require(bytes(files[fileName].ipfsHash).length > 0, "File not found");
        return files[fileName].ipfsHash;
    }

    function isFileStored(string memory fileName) public view returns(bool) {
        return bytes(files[fileName].ipfsHash).length > 0;
    }
}