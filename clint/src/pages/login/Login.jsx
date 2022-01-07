import { useContext, useRef } from "react"
import { Context } from "../../context/Context"
import axios from 'axios'
import "./Login.css"

function Login() {

    const userRef = useRef()
    const passwordRef = useRef()
    const {dispatch, isFetching} = useContext(Context)

    const handleLogin = async (e) => {
        e.preventDefault()
        dispatch({type: "LOGIN_START"})
        try {
            const res = await axios.post("/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value
            })
            dispatch({type: "LOGIN_SUCCESS", payload: res.data})
        } catch (err) {
            dispatch({type: "LOGIN_FAILURE"})
        }
    }

    
    return (
        <div className="login">
            <span className="loginTitle">LogIn</span>
            <form className="loginFrom" onSubmit={handleLogin}>
                <label>Username</label>
                <input 
                    type="text" 
                    className="loginInput" 
                    placeholder="Enter Your username ..."
                    required
                    ref={userRef}
                />
                <label>Password</label>
                <input 
                    type="password"  
                    className="loginInput" 
                    placeholder="Enter Your Password ..."
                    required
                    ref={passwordRef}
                />
                <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
            </form>
        </div>
    )
}

export default Login
