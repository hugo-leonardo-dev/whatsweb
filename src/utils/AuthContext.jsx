import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router";
import { ID} from 'appwrite';

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        getUserOnLoad()
    }, [])

    const getUserOnLoad = async () => {
        try{
            let accountDetails = await account.get();
            setUser(accountDetails)
        }catch(error){
            
        }
        setLoading(false)
    }

    const handleUserLogin = async (e, credentials) => {
        e.preventDefault()
        console.log('CREDS:', credentials)

        try{
            let response = await account.createEmailSession(credentials.email, credentials.password)
            let accountDetails = await account.get();
            setUser(accountDetails)
            navigate('/')
        }catch(error){
            console.error(error)
        }
    }

    const handleUserLogout = async () => {
        const response = await account.deleteSession('current');
        setUser(null)
    }

    const handleUserRegister = async (e, credentials) => {
        e.preventDefault()

        if(credentials.password1 !== credentials.password2){
            alert('As senhas não são iguais! Por favor, tente novamente.');
            return 
        }

        try{
            
            let response = await account.create(ID.unique(), credentials.email, credentials.password1, credentials.name);
            console.log('Usuário registrado!', response)

            await account.createEmailSession(credentials.email, credentials.password1)
            let accountDetails = await account.get();
            setUser(accountDetails);
            navigate('/');
        }catch(error){
            console.error(error)
        }
    }

    const contextData = {
        user,
        handleUserLogin,
        handleUserLogout,
        handleUserRegister
    }

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? <p>Carregando...</p> : children}
        </AuthContext.Provider>
    )
}

export const userAuth = ()=> {return useContext(AuthContext)}

export default AuthContext;