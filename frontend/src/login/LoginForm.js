import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../common/AuthContext"


const LoginForm = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const { loginUser } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            setIsLoading(true)
            await loginUser(email, password)
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
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="container-login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className="container-show-password">
                        <label htmlFor="">Show Password</label>
                        <input type="checkbox" onClick={toggle}/>
                    </div>
                    {isLoading
                        ?<Link to="" className="link-submit" onClick={handleSubmit}> Loading</Link>
                        :<Link to="" className="link-submit" onClick={handleSubmit}> Login to Account</Link>
                    }
                    {error && <p>{error}</p>}
            </div>
        </form>
    )
}

export default LoginForm
