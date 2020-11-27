import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native'
import { FloatingAction } from 'react-native-floating-action';
import AuthContext from '../contexts/auth';
import Keychain from 'react-native-keychain';
import Axios from 'axios';
import Modal from 'react-native-modal';


export default function dashboard() {

  const { LogOut } = useContext(AuthContext);
  const [idUsuario, setId] = useState(0);
  const [token, setToken] = useState('');
  const [expandedId, setExpandedId] = useState(undefined);
  const [Render, setRender] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [dado, setDado] = useState('');

  const [blockChainData, setData] = useState([]);

  const [optMenu, setOpt] = useState(
    [
      {
        text: 'Adicionar Bloco',
        name: 'btnAddBloco',
        position: 2,
        icon:require('../img/addBloco.png'),
        color: '#383838'
      },
      {
        text: "Sair",
        name: "btnSair",
        position: 1,
        icon:require('../img/logout.png'),
        color: '#383838'
      }
    ]
  );

  function handleLogOut() {
    LogOut();
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const _onAccordionPress = (newExpandedId: string | number) => {
    expandedId === newExpandedId
      ? setExpandedId(undefined)
      : setExpandedId(newExpandedId);
  }

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  async function fetchBlockchain(){
    try {
      const blockChain = await Axios.get('https://backend-blockchain-chico.herokuapp.com/blockchain', config);
      setData(blockChain.data);
      console.log(blockChain.data);
    } catch (response) {
      console.log(response.error)
    }
  }

  async function addBloco(dado){
    Axios.post('https://backend-blockchain-chico.herokuapp.com/blockchain', {
      informacao: dado,
    }).then((response) => {
      console.log(response.ds_mensagem);
    }).catch((response) => {
      console.log(response.ds_mensagem);
    })
  }

  useEffect(() => {
    async function loadStorageData() {
      try {
        const credenciais = await Keychain.getGenericPassword();
        if (credenciais) {
          setId(credenciais.password);
          setToken(credenciais.username);
        } else {
          console.log('No credentials stored')
        }
      } catch (error) {
        console.log('Keychain couldn\'t be accessed!', error);
      }
    }

    loadStorageData();
    fetchBlockchain();
    fetchBlockchain();
  }, [Render]);

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Blockhain:</Text>

      <Modal onBackdropPress={toggleModal} isVisible={isModalVisible} style={styles.modal}>
          <View style={styles.container}>

            <TextInput placeholderTextColor="#737373" placeholder="Dados" name="txtDados" style={styles.txtInput} onChangeText={text => setDado(text)} value={dado}/>

            <TouchableOpacity onPress={() => addBloco(dado)} style={styles.btnConfirmAdd}>{/* "Botão" de envio */}
              <Text style={styles.btnTxt}>Adicionar</Text>
            </TouchableOpacity>
          </View>
      </Modal>
      
      

      <FloatingAction
        style={styles.floatMenu}
        actions={optMenu}
        color='#2E933C'
        onPressItem={nome => {
          if (nome == "btnSair") {
            handleLogOut();
          } else if (nome == "btnAddBloco"){
            toggleModal();
          }
        }
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#297045',
    width: '100%',
    height: '100%',
    padding:40,
  },
  textHeader: {
    color: 'white',
    fontSize: 30,
  },
  floatMenu: {
    zIndex: 3,
  },
  modal:{
    flexDirection:'column',
    width:'80%',
    maxHeight:200,
    backgroundColor:'white',
    marginLeft:'auto',
    marginRight:'auto',
    marginTop:'auto',
    marginBottom:'auto'
  },
    txtInput:{
      backgroundColor:'white',
      borderRadius:6,
      height:50,
      fontSize:17,
      textAlign:"justify",
      textAlignVertical:"auto",
      elevation:10,
      fontFamily:'Century Gothic',
      paddingHorizontal:15,
    },
    btnConfirmAdd:{
      backgroundColor: '#2E933C',
      width: '80%',
      height: 50,
      elevation:3,
      color:'white',
      borderRadius:50,
      paddingLeft:'24%',
      paddingTop:'4%',
      alignSelf:'center',
      marginTop:'15%',
  },  
  btnTxt:{
    color: 'white',
    fontSize:20,
},
})
