import Axios from 'axios';
import { ToastAndroid } from 'react-native';

export const AuthLogin = async (email, senha) => {
        if(email.trim() !=''){
            if(senha.trim() !=''){
                try {
                    const response = await Axios.post('https://backend-blockchain-chico.herokuapp.com/auth/login', {
                        email: email,
                        password: senha,
                    });
                    if (response.data.ic_sucesso == true) {
                        return response;
                    }
                    else if (response.data.ic_sucesso == false) {
                        ToastAndroid.show("Não foi possível realizar o login", ToastAndroid.SHORT);
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
            else{
                ToastAndroid.show("Por favor preencher o campo \"Senha\" corretamente!", ToastAndroid.SHORT);
            }
        }
        else{
            ToastAndroid.show("Por favor preencher o campo \"E-mail\" corretamente!", ToastAndroid.SHORT);
        }

}