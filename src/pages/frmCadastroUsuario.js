import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput, ToastAndroid } from 'react-native';
import Label from '../components/label';

import axios from 'axios';

export default function frmCadastroUsuario({ navigation }) {

    const [nome, setNome] = useState('');
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

    const cadastrar = (nome, email, senha, confSenha) => {

        if (nome.trim() != '') {
            if (emailVerify(email) && email.trim() != '') {
                if (senha == confSenha && senha.trim() != '' && confSenha.trim() != '') {
                    axios.post('http://bway.anytech.com.br/usuario', {
                        nomeUsuario: nome,
                        emailUsuario: email,
                        senhaUsuario: senha,
                    }).then(response => {
                        if (response.data.ic_sucesso = true) {
                            if (response.data.ds_mensagem == "Usuário criado com sucesso!\\nObrigado por escolher o b-Way!") {
                                console.log(response.data)
                                ToastAndroid.show("Usuário criado com sucesso! Obrigado por escolher o b-Way!", ToastAndroid.SHORT);
                                navigation.navigate('Index');
                            } else {
                                ToastAndroid.show("O e-mail desejado já está sendo utilizado por outo usuário. Insira outro e tente novamente.", ToastAndroid.SHORT);
                            }

                        }
                        else if (response.data.ic_sucesso = false) {
                            ToastAndroid.show(response.data.ds_mensagem, ToastAndroid.SHORT);
                        }
                    }).catch(error => {
                        ToastAndroid.show("Erro ao cadastrar usuário, por favor tente novamente.", ToastAndroid.SHORT);
                    });
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
            ToastAndroid.show("Por favor preencher o campo \"Nome\" corretamente!", ToastAndroid.SHORT);
        }

    }

    return (
        <View style={styles.container}>
            <View style={styles.frmCadastro}>
                <TextInput placeholderTextColor="#737373" textContentType='name' placeholder="Nicollas Frazão" name="txtNome" style={styles.txtInput} onChangeText={text => setNome(text.replace(/[^A-zÀ-ú\s]/g, ''))} value={nome} />

                <TextInput placeholderTextColor="#737373" textContentType='emailAddress' placeholder="usuario@bway.com.br" name="txtEmail" style={styles.txtInput} onChangeText={text => setEmail(text)} value={email} />

                <TextInput placeholderTextColor="#737373" textContentType='password' secureTextEntry={true} placeholder="**************" name="txtSenha" style={styles.txtInput} onChangeText={text => setSenha(text)} value={senha} />

                <TextInput placeholderTextColor="#737373" textContentType='password' secureTextEntry={true} placeholder="**************" name="txtConfSenha" style={styles.txtInput} onChangeText={text => setConfSenha(text)} value={confSenha} />

                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Index') }} style={styles.btnVoltar}>{/* "Botão" de envio */}
                        <Text style={styles.btnTxt}>VOLTAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => cadastrar(nome, email, senha, confSenha)} style={styles.btnCadastro}>{/* "Botão" de envio */}
                        <Text style={styles.btnTxt}>CADASTRAR</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff6404',
        width: '100%',
        height: '100%',
    },
    frmCadastro: {
        width: '80%',
        height: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        backgroundColor: 'transparent',

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
    btnCadastro: {
        backgroundColor: '#383838',
        width: '45%',
        height: '30%',
        marginLeft: 'auto',
        alignItems: 'center',
        elevation: 24,
        borderRadius: 4
    },
    btnVoltar: {
        backgroundColor: '#383838',
        width: '45%',
        height: '30%',
        alignItems: 'center',
        elevation: 24,
        borderRadius: 4,
    },
    btnTxt: {
        marginBottom: "auto",
        marginTop: "auto",
        color: "white",
        fontSize: 17,
        elevation: 3,
        fontFamily: 'Century Gothic'
    },

});