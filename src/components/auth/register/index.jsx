import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth'

const Register = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmedPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { userLoggedIn } = useAuth()
    
    const onSubmit = async (e) => {
        e.preventDefault()
        if(!isRegistering){
            setIsRegistering(true)
            await doCreateUserWithEmailAndPassword(email,password)
        }
    }
    return (
        <>
        {userLoggedIn && (<Navigate to={'/home'} replace={true}/>)}
        <main className='The-Rest-Plaza'>
            <div className='HorrorReg'>
                <h2 className='RegText'>Sign Up</h2>
                <h2 className='EnterYourDetails'>Please enter your detials</h2>

            </div>
        </main>
        </>
    )

}