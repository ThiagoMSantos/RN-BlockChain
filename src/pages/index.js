import React, { useState , useContext, useEffect} from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
import AuthContext from '../contexts/auth';
import SplashScreen from 'react-native-splash-screen';
import Label from '../components/label';
import { TextInput, Icon } from 'react-native-paper';

export default function Index({ navigation }){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const { logado, LogIn, nome } = useContext(AuthContext);

    useEffect(() =>{
        setTimeout(()=>{
            if(logado == true){}else{SplashScreen.hide();}
        },3000)
    })

    async function handleSignIn(email, senha){
        LogIn(email, senha);
    }

    return (
        <View style={styles.container}>
               
            <View style={styles.frmLogin}>{/* --Formulário de Login-- */}
                <Image style={styles.headerLogo} source={require('../img/logo-teste.png')}/>

                <TextInput
                    left={<TextInput.Icon name='email' color="white"/>}
                    selectionColor={'white'}
                    underlineColor={"white"}
                    mode='flat'
                    label="Email"
                    value={email}
                    onChangeText={text => setEmail(text)} value={email}
                    style={styles.txtInput}
                /> 

                <TextInput
                    left={<TextInput.Icon name='lock' color="white"/>}
                    selectionColor={'white'}
                    underlineColor={"white"}
                    mode='flat'
                    label="Senha"
                    value={senha}
                    onChangeText={text => setSenha(text)} value={senha}
                    style={styles.txtInput}
                /> 
                
                <TouchableOpacity onPress={() => handleSignIn(email, senha)} style={styles.btnLogin}>{/* "Botão" de envio */}
                    <Text style={styles.btnTxt}>ENTRAR</Text>
                </TouchableOpacity>

                <Text style={styles.lblIndex}>{/* Recuperar senha */}
                    Esqueceu a senha?{"\n"}
                    Clique aqui para recupera-la.   
                </Text>

            </View>

            <View style={styles.hr}></View>

            <TouchableOpacity onPress={() => navigation.navigate('frmCadastroUsuario')} style={styles.btnCadastro}>{/* "Botão" de envio */}
                <Text style={styles.btnTxt}>CADASTRE-SE</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgb(112, 0, 152)',
        width:'100%',
        height:'100%',
        fontFamily:'Century Gothic'
    },
    frmLogin:{
        width:'85%',
        height:'70%',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:'auto',
        marginBottom:'auto',
        backgroundColor:'transparent',
        fontFamily:'Century Gothic'
    },
    txtInput:{
        backgroundColor:'transparent',
        marginBottom:'5%'
    },
    btnLogin:{
        backgroundColor: 'rgb(112,0,190)',
        marginTop:'5%',
        width: '45%',
        height: '11%',
        marginLeft:'auto',
        marginRight:'auto',
        elevation:3,
        color:'white',
        borderRadius:50,
        paddingLeft:'11%',
        paddingTop:'4%',
    },
    btnCadastro:{
        backgroundColor: 'rgb(112,0,190)',
        marginBottom:'5%',
        width: '55%',
        height: '8%',
        marginLeft:'auto',
        marginRight:'auto',
        elevation:3,
        color:'white',
        borderRadius:50,
        paddingLeft:'11%',
        paddingTop:'4%',
    },
    btnTxt:{
        color: 'white',
        fontSize:20,
    },
    lblIndex:{
        marginTop:'10%',
        textAlign:'center',
        fontSize:17,
        color:"white",
        elevation:3,
        fontFamily:'Century Gothic'
    },
    headerLogo:{
        width:100,
        height:100,
        backgroundColor:'transparent',
        alignSelf:"center",
    },
    hr:{
        borderBottomColor: "white", 
        borderBottomWidth: StyleSheet.hairlineWidth, 
        alignSelf:'stretch',
        width: "100%",
        marginBottom:'5%'
      }
});