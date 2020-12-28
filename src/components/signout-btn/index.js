import React, { useContext} from 'react';
import { UserContext } from '../../contexts/user';
import { logout } from '../../services/auth';
import './style.css';

export default function SignOutBtn() {
    const [, setUser] = useContext(UserContext).user;    

    const signOutBtnClick = () => {
        
         setUser(null);
        
    };

    return (
        <div className="signOutBtn" onClick={signOutBtnClick}>
            <i><p>Sign Out</p></i>
        </div>
    )     
}
