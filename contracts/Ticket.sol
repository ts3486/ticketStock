// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";

contract Ticket is ERC721Full {

    string[] public tickets;
    mapping(string => bool) _ticketExists;

    constructor() ERC721Full("Ticket", "TICKET") public {}

    //in real life scenario the public should be changed to sth more restrictive, like owner
    function mint(string memory _ticket) public {

        //check if ticket exists
        require(!_ticketExists[_ticket]);

        //Add ticket 
        uint _id = tickets.push(_ticket);

        //Call the mint funciton
        _mint(msg.sender, _id);

        //set ticketExists to true for the specific ticket
        _ticketExists[_ticket] = true;

    }

    // function addTicket(){

    // };

    // function deleteTicket(){

    // }; 
}


//minting: Minting basically refers to the process of turning digital assets
//into a part of the Ethereum blockchain as a public ledger. The digital asset owernship
//would be tamper-proof and immune to any modifications.
