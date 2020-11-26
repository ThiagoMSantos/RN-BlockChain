import React, { createContext, useState, useEffect} from 'react';
import Keychain from 'react-native-keychain';
import * as Auth from '../services/authLogin';

const AuthContext = createContext({ logado: Boolean, nome:String});

export const AuthProvider = ({ children }) =>{
    
    const [nomeUsuario, setNome] = useState('oi');
    const [logado, setLogado] = useState(Boolean);

    function LogIn(email, senha){
        Auth.AuthLogin(email, senha).then( res =>{
            setNome(res.data.usuario.nome);
            setLogado(true);    
            Keychain.setGenericPassword(res.data.usuario.nome+"", res.data.usuario.cpf+"");
        });

    }

    function LogOut(){
        Keychain.resetGenericPassword();
        setLogado(false);
    }

    useEffect(()=>{
        async function loadStorageData(){
            try {
                const credenciais = await Keychain.getGenericPassword();
                if (credenciais) {
                    setLogado(true);
                } else {
                    console.log('No credentials stored')
                }
            } catch (error) {
                console.log('Keychain couldn\'t be accessed!', error);
            }
        }

        loadStorageData();
    }, []);

    return(
        <AuthContext.Provider value ={{logado, LogIn, nome: nomeUsuario, LogOut}}>
            {children}
        </AuthContext.Provider>
    )
    
}

export default AuthContext;