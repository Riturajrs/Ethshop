import React, {useState} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import RoomIcon from '@material-ui/icons/Room';
import ReorderIcon from '@material-ui/icons/Reorder';
import UserIcon from '@material-ui/icons/AccountCircle';
import WalletIcon from '@material-ui/icons/AccountBalanceWallet';
import '../App.css';
import './navbar.css';

function Navbar() {
    const [showLinks, setShowLinks] = useState(true);
    return (
        <div className='Navbar'>
            <div className='leftSide'>
                <div className='links'>
                    <a href='/home'>OlX</a>
                </div>
            </div>
            <div className='middile'>
                <input type='text' placeholder='Search..' />
                <button type='sumbmit'><SearchIcon /></button>
            </div>
            <div className='rightSide'>
                <button onClick={() => setShowLinks(!showLinks)}><ReorderIcon /></button>
                <div className='links' id = {showLinks ? 'hidden' : ''}>
                    <a href='/wishlist'> <RoomIcon /> </a>
                    <a href='/metamask'><WalletIcon /></a>
                    <a href='/user'> <UserIcon /></a>
                </div>   
            </div>
        </div>
    )
}

export default Navbar;
