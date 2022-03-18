import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../common/AuthContext"
import axios from "axios"
import Constant from "../common/Constant"

const LoginForm = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const { registerUser } = useAuth()

    const handleSubmit = async (e) => {
        setError('')
        e.preventDefault()
        if (password !== confirmPassword){
            return setError("Password does not match")
        }
        try {
            setIsLoading(true)
            let res = await registerUser(email, password)
            console.log(res.user.uid)
            await axios.post(`${Constant.API_BASE}/users`, {
                name:  name,
                email: email,
                phoneNumber: phoneNumber,
                uid: res.user.uid
            })
            navigate('/')
        } catch (err) {
            console.log(err.message)
            setError(err.message)
        }
        setIsLoading(false)
    }

    const toggle = async () => {
        var x = document.getElementById("password");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
        var y = document.getElementById("confirm-password");
        if (y.type === "password") {
          y.type = "text";
        } else {
          y.type = "password";
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="container-login-form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input type="text" name="phone" onChange={e => setPhoneNumber(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input type="password" name="confirm-password" id="confirm-password" onChange={e => setConfirmPassword(e.target.value)}/>
                    </div>
                    <div className="container-show-password">
                        <label htmlFor="">Show Password</label>
                        <input type="checkbox" onClick={toggle}/>
                    </div>
                    {isLoading
                        ?<Link to="" className="link-submit" onClick={handleSubmit}> Loading</Link>
                        :<Link to="" className="link-submit" onClick={handleSubmit}>Create Account</Link>
                    }
                    {error && <p>{error}</p>}
            </div>
        </form>
    )
}

export default LoginForm
