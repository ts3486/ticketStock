// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";

contract Ticket is ERC721Full {

    string[] public tickets;
    mapping(string => bool) _ticketExists;

    constructor() ERC721Full("Ticket", "TICKET") public {}

    //in real life scenario the public should be changed to sth more restrictive, like owner
    function mint(string memory _ticket) public {

        require(!_ticketExists[_ticket]);

        //Add ticket 
        uint _id = tickets.push(_ticket);

        //Call the mint funciton
        _mint(msg.sender, _id);

        //check if ticket id exists?
        _ticketExists[_ticket] = true;

        //Track the ticket

    }
}


//minting: Minting basically refers to the process of turning digital art 
//into a part of the Ethereum blockchain as a public ledger. The digital art 
//would be tamper-proof and immune to any modifications.
