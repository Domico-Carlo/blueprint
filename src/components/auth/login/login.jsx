import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { doSignInWithEmailAndPassword,doSignWithGoogle } from '../../../firebase/auth'
import { useAuth } from '../../../contexts/authContext/AuthProvider'

const Login = () => {
    const { userLoggedIn } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        if(!isSigningIn){
            setIsSigningIn(true)
            await doSignInWithEmailAndPassword(email, password)

        }
    }

    const onGoogleSignIn = (e) => {
        e.preventDefault()
        if(!isSigningIn) {
            setIsSigningIn(true)
            doSignWithGoogle().catch(err => {
                setIsSigningIn(false)
            })
        }
    }

    return (
        <div>
            {userLoggedIn && (<Navigate to={'/home'} replace={true}/>)}

            <main className="Login-Page">
                <div className="Top-Part"></div>
                <div className="text-center">
                    <div className="Title">
                        <h2 className="SignIn-Banner">
                            Sign In
                        </h2>
                        <h2 className="Enter-yo-details-foo">
                            Please enter your details
                        </h2>
                    </div>
                </div>
                <form
                onSubmit={onSubmit}
                className="Login-Form">
                    <div>
                        <label className="email-text">
                            Email
                        </label>
                        <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email} onChange={(e) => { setEmail(e.target.value) }}
                                className="email-input"
                        />
                    </div>
                    <div>
                    <label className="text-sm text-gray-600 font-bold">
                                Password
                            </label>
                            <input
                                type="password"
                                autoComplete='current-password'
                                required
                                value={password} onChange={(e) => { setPassword(e.target.value) }}
                                className="password-input"
                            /> 
                    </div>
                    {errorMessage ** (
                        <span className ='errors-message-login'>{errorMessage}</span>
                    )}
                    <button
                            type="submit"
                            disabled={isSigningIn}
                            className={'SignIn Button'}
                    >
                        {isSigningIn ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
                <p className="Dont-Have-Acc">Don't have an account? <Link to={'/register'} className="signup-bruv">Sign up</Link></p>
                <div className="OrButton">OR</div>
                <button 
                    disabled={isSigningIn}
                    onClick={(e) => { onGoogleSignIn(e) }}
                    className='Google-Sign-In-Button'
                >
                {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                </button>
            </main>

        </div>
    )
}   

export default Login
