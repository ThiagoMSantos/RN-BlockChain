import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, ToastAndroid } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import TextInputMask from 'react-native-text-input-mask';
import validarCpf from 'validar-cpf';

import axios from 'axios';

export default function frmCadastroUsuario({ navigation }) {

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confSenha, setConfSenha] = useState('');

    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const emailVerify = (text) => {
        if (regexEmail.test(text)) {
            return true;
        }
        else {
            return false;
        }
    }

    const cadastrar = (nome, cpf, email, senha, confSenha) => {
        if (nome.trim() != '') {
            if (validarCpf(cpf.replace(/\D+/g, ""))){
                if (emailVerify(email) && email.trim() != '') {
                    if (senha == confSenha && senha.trim() != '' && confSenha.trim() != '') {
                        axios.post('https://backend-blockchain-chico.herokuapp.com/auth/register', {
                            nome: nome,
                            cpf: cpf,
                            email: email,
                            password: senha,
                        }).then((response) => {
                            if (response.data.ic_sucesso == true) {
                                if (response.data.ds_mensagem == "Obrigado por utilizar nossa plataforma!") {
                                    ToastAndroid.show(response.data.ds_mensagem, ToastAndroid.SHORT);
                                    navigation.navigate('Index');
                                } else {
                                    ToastAndroid.show(response.data.ds_mensagem, ToastAndroid.SHORT);
                                }

                            }
                            else if (response.data.ic_sucesso == false) {
                                ToastAndroid.show(response.data.ds_mensagem, ToastAndroid.SHORT);
                            }
                        }).catch((response) => {
                            console.log(response);
                        })

                    }
                    else {
                        ToastAndroid.show("Por favor preencher o campo \"Senha\" corretamente! As senhas não coincidem.", ToastAndroid.SHORT);
                    }
                }
                else {
                    ToastAndroid.show("Por favor preencher o campo \"E-mail\" corretamente!", ToastAndroid.SHORT);
                }
            }
            else {
                ToastAndroid.show("Por favor preencher o campo \"CPF\" corretamente!", ToastAndroid.SHORT);
            }
        }
        else {
            ToastAndroid.show("Por favor preencher o campo \"Nome\" corretamente!", ToastAndroid.SHORT);
        }

    }

    return (
        <View style={styles.container}>
            <View style={styles.frmCadastro}>
            
                <Image style={styles.headerLogo} source={require('../img/logo-teste.png')}/>

                <TextInput
                    left={<TextInput.Icon name='account' color="white"/>}
                    selectionColor={'white'}
                    underlineColor={"white"}
                    mode='flat'
                    label="Nome"
                    onChangeText={text => setNome(text.replace(/[^A-zÀ-ú\s]/g, ''))}
                    value={nome}
                    style={styles.txtInput}
                    autoCompleteType="name"
                />

                <TextInput
                    left={<TextInput.Icon name='card-account-details' color="white"/>}
                    selectionColor={'white'}
                    underlineColor={"white"}
                    mode='flat'
                    label="CPF"
                    onChangeText={text => setCpf(text)} 
                    value={cpf}
                    style={styles.txtInput}
                    render={props =>
                        <TextInputMask
                          {...props}
                          mask="[000].[000].[000]-[00]"
                        />
                    }
                />

                <TextInput
                    left={<TextInput.Icon name='email' color="white"/>}
                    selectionColor={'white'}
                    underlineColor={"white"}
                    mode='flat'
                    label="Email"
                    onChangeText={text => setEmail(text)} 
                    value={email}
                    style={styles.txtInput}
                    autoCompleteType="email"
                    textContentType="emailAddress"
                />

                <TextInput
                    left={<TextInput.Icon name='lock' color="white"/>}
                    selectionColor={'white'}
                    underlineColor={"white"}
                    mode='flat'
                    label="Senha"
                    onChangeText={text => setSenha(text)} 
                    value={senha}
                    style={styles.txtInput}
                    autoCompleteType="password"
                    secureTextEntry
                />

                <TextInput
                    left={<TextInput.Icon name='lock' color="white"/>}
                    selectionColor={'white'}
                    underlineColor={"white"}
                    mode='flat'
                    label="Confirmar Senha"
                    onChangeText={text => setConfSenha(text)} 
                    value={confSenha}
                    style={styles.txtInput}
                    autoCompleteType="password"
                    secureTextEntry
                />

                <View style={{ flexDirection: "row", marginLeft:'auto', marginRight:'auto' }}>
                <IconButton
                    icon="arrow-left"
                    color={'white'}
                    size={40}
                    onPress={() => navigation.navigate('Index')}
                    style={styles.btnVoltar}
                />
                    <TouchableOpacity onPress={() => cadastrar(nome, cpf, email, senha, confSenha)} style={styles.btnCadastro}>{/* "Botão" de envio */}
                        <Text style={styles.btnTxt}>CADASTRAR</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#297045',
        width:'100%',
        height:'100%',
        fontFamily:'Century Gothic'
    },
    frmCadastro:{
        width:'85%',
        height:'100%',
        marginLeft:'auto',
        marginRight:'auto',
        marginBottom:'auto',
        backgroundColor:'transparent',
        fontFamily:'Century Gothic'
    },
    txtInput: {
        marginBottom: '5%',
        backgroundColor: 'white',
        borderRadius: 6,
        height: '8.5%',
        fontSize: 17,
        textAlign: "justify",
        textAlignVertical: "auto",
        elevation: 10,
        paddingHorizontal: 15,
    },
    btnCadastro:{
        backgroundColor: '#2E933C',
        width: '55%',
        height: 50,
        elevation:3,
        color:'white',
        borderRadius:50,
        paddingLeft:'13%',
        alignSelf:'center',
    },
    btnVoltar: {
        backgroundColor: '#2E933C',
        elevation:3,
        borderRadius:50,
    },
    btnTxt: {
        marginBottom: "auto",
        marginTop: "auto",
        color: "white",
        fontSize: 17,
        elevation: 3,
        fontFamily: 'Century Gothic'
    },
    txtInput:{
        backgroundColor:'transparent',
        marginBottom:'5%'
    },
    headerLogo:{
        width:200,
        height:200,
        backgroundColor:'transparent',
        alignSelf:"center",
    },

});