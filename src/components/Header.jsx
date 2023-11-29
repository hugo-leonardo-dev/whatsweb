import React from 'react'
import { LogOut } from 'react-feather'
import { userAuth } from '../utils/AuthContext'

const Header = () => {

    const {user, handleUserLogout} = userAuth()

    return (
        <div className='header--wrapper'>
            {user ? (
                <>
                    Bem-vindo, {user.name}!
                    <LogOut onClick={handleUserLogout} className='header--link' />
                </>
            ) : (
                <button>Logout</button>
            )}
        </div>
    )
}

export default Header