import React, { useContext } from 'react';
import './style.css';
import { SignInBtn } from '../../components';
import { UserContext } from '../../contexts/user';
import SignOutBtn from '../../components/signout-btn';

export default function Navbar() {

    const [user, setUser] = useContext(UserContext).user; 

    return (
        <div className="navbar">
            <b><p className="navbar_title" style={{fontSize:"55px"}}>Poster</p></b>
            { user ? <img className="navbar_img" src={user.photoURL} alt="profile_img"/> : <SignInBtn />}
            { user ? <div className="navbar_name">
                        <div> {`Welcome, `}  </div>
                        <div className="navbar_Username">{` ${user.email.replace("@gmail.com","")}`} </div>
                    </div>:""}
            { user ? <SignOutBtn/> :""}
            
        </div>
    )     
}