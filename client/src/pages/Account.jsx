import React, { useContext } from 'react'
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from '../context/authContext'

const LogIn = () => {
    const [formValid, setFormValid] = useState(false);

    //INITIALIZE inputs WITH DEFAULT username & password
    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    })

    //INITIALIZE error WITH null
    const [err, setError] = useState(null)

    const navigate = useNavigate()

    const { login } = useContext(AuthContext)

    //HANDLE INPUT
    const handleChange = (e) => {
        //UPDATE inputs WITH NEW VALUE
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
        setFormValid(e.target.form.checkValidity());
    }

    //LOGIN
    const handleLogin = async (e) => {
        e.preventDefault()
        if (!formValid) {
            setError('Please fill in all required fields.');
            return;
        }
        try {
            await login(inputs)
            navigate("/")
        } catch (err) {
            setError(err.response.data)
        }
    }

    return (
        <div className='auth'>
            <h1>
                Log In
            </h1>
            <form>
                <input required name='username' type="text" placeholder='username' onChange={handleChange} />
                <input required name='password' type="password" placeholder='password' onChange={handleChange} />

                <button onClick={handleLogin} disabled={!formValid}>Login</button>
            </form>

            {err &&
                <div className='errorMessage'>
                    {err}
                </div>
            }

            <div className='redirect'>
                <p>Not registered?</p>
                <Link className='link' to="/register">Sign up</Link>
            </div>
        </div>
    )
}

export default LogIn