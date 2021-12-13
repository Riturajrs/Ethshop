import React, {useState} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ReorderIcon from '@material-ui/icons/Reorder';
import UserIcon from '@material-ui/icons/AccountCircle';
import WalletIcon from '@material-ui/icons/AccountBalanceWallet';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useMoralis } from "react-moralis";
import '../App.css';
import './navbar.css';

function Navbar() {
    const [showLinks, setShowLinks] = useState(true);
    const { authenticate, isAuthenticated, user, logout, isAuthenticating } = useMoralis();
    const loginHandler = (e) => {
        e.preventDefault();
        authenticate();
    };
    const logoutHandler = (e) => {
        e.preventDefault();
        logout();
    };
    if (user) {
        console.log(user.get("ethAddress"));
    }
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
                    <a href='/wishlist'> <FavoriteIcon /> </a>
                    <a href='/metamask'> <WalletIcon /> </a>
                    <a href='/user'> <UserIcon /> </a>
                    {!isAuthenticated && <button disabled={isAuthenticating} onClick={loginHandler}>Login</button>}
                    {isAuthenticated && <button disabled={isAuthenticating} onClick={logoutHandler}>Logout</button>}
                </div>   
            </div>
        </div>
    )
}

export default Navbar;
