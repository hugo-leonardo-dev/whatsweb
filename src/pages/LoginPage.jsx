import React, {useEffect, useState} from 'react'
import { userAuth } from '../utils/AuthContext'
import {useNavigate, Link} from 'react-router-dom'

const LoginPage = () => {

    const {user, handleUserLogin} = userAuth();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        if(user){
            navigate('/')
        }
    }, [])

    const handleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setCredentials({...credentials, [name]:value})
    }

  return (
    <div className='auth--container'>
        <div className='form--wrapper'>
            <form onSubmit={(e) => {handleUserLogin(e, credentials)}}>
                <div className='field--wrapper'>
                    <label>Email: </label>
                    <input 
                        type="email"
                        required 
                        name="email" 
                        placeholder='Digite seu email...'
                        value={credentials.email}
                        onChange={handleInputChange}
                        />
                </div>
                <div className='field--wrapper'>
                    <label>Senha: </label>
                    <input 
                        type="password"
                        required 
                        name="password" 
                        placeholder='Digite sua senha...'
                        value={credentials.password}
                        onChange={handleInputChange}
                        />
                </div>

                <div className='field--wrapper'>
                    <input 
                        className='btn btn--lg btn--main'
                        type="submit" 
                        value="Entrar" />
                </div>
            </form>
            <p>Não tem uma conta? Registre-se <Link to="/register"> aqui </Link></p>
        </div>
    </div>
  )
}

export default LoginPage