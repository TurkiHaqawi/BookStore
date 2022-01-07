import './TopBar.css' 
import {Link} from "react-router-dom"
import { useContext } from 'react'
import { Context } from '../../context/Context'

function TopBar() {

    const {user, dispatch} = useContext(Context)

    const handleLogout = () => {
        dispatch({type: "LOGOUT"})
    }

    return (
        <div className="topBar">
            <div className="topLeft">
                <span className="logo">BookStore</span>
            </div>

            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link to="/" className="link"> Home </Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/addBook" className="link"> Add Book</Link>
                    </li>
                    <li className="topListItem">About</li>
                </ul>
            </div>

            <div className="topRight">
                <span className="userName"></span>
                <ul className="topList">
                    {user ? (
                        <li className="topListItem" onClick={handleLogout}> 
                            <Link to="/" className="link">Logout</Link>
                        </li>
                    ) : (
                        <>
                            <li className="topListItem">
                                <Link to="/login" className="link">Login</Link>
                            </li>
                            <li className="topListItem">
                                <Link to="/register" className="link">
                                    Sign Up
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default TopBar
