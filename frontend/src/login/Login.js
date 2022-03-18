import './Login.css'
import { useState } from "react"
import {Link} from "react-router-dom"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

const Login = () => {
    const [useLoginForm, setUseLoginForm] = useState(true)

    return (
        <div className="container-login">
            <div className="login">
                <div className="container-login-option">
                    <Link className="link-login-option" to='' onClick={() => setUseLoginForm(true)}>Login</Link>
                    <Link className="link-login-option" to='' onClick={() => setUseLoginForm(false)}>Sign up</Link>
                </div>
                {useLoginForm ? <LoginForm/> : <SignupForm/>}
            </div>
        </div>
    )
}

export default Login
