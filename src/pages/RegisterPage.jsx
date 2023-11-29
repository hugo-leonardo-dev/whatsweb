import React from 'react'
import {useState} from 'react'
import { userAuth } from '../utils/AuthContext'
import { Link } from 'react-router-dom'

const RegisterPage = () => {

    const [credentials, setCredentials] = useState({
      name: '',
      email:'', 
      password1:'', 
      password2:''
    })

    const {handleUserRegister} = userAuth()

    const handleInputChange = (e) => {
        let name = e.target.name
        let value = e.target.value 
    
        setCredentials({...credentials, [name]:value})
      }

      return (
        <div className="auth--container">
          <div className="form--wrapper">
    
            <form onSubmit={(e) => {handleUserRegister(e, credentials)}}>
    
                <div className="field--wrapper">
                    <label>Nome:</label>
                    <input 
                      required
                      type="text" 
                      name="name"
                      placeholder="Digite seu nome..."
                      value={credentials.name}
                      onChange={(e) => {handleInputChange(e)}}
                    />
                </div>
                <div className="field--wrapper">
                    <label>Email:</label>
                    <input 
                      required
                      type="email" 
                      name="email"
                      placeholder="Digite seu email..."
                      value={credentials.email}
                      onChange={(e) => {handleInputChange(e)}}
                    />
                </div>
    
                <div className="field--wrapper">
                    <label>Senha:</label>
                    <input 
                      required
                      type="password" 
                      name="password1"
                      placeholder="Digite uma senha..."
                      value={credentials.password1}
                      onChange={(e) => {handleInputChange(e)}}
                    />
                </div>
    
                <div className="field--wrapper">
                    <label>Confirme sua senha:</label>
                    <input 
                      required
                      type="password" 
                      name="password2"
                      placeholder="Digite sua senha novamente..."
                      value={credentials.password2}
                      onChange={(e) => {handleInputChange(e)}}
                    />
                </div>
    
                <div className="field--wrapper">
                    <input className="btn btn--lg btn--main" type="submit" value="Registrar"/>
                </div>
            </form>
    
            <p>Já possui uma conta? Entre <Link to="/login">aqui</Link></p>
          </div>
        </div>
      )
}

export default RegisterPage