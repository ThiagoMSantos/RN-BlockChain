import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FloatingAction } from 'react-native-floating-action';
import AuthContext from '../contexts/auth'

export default function dashboard() {

  const { LogOut } = useContext(AuthContext);

  const [optMenu, setOpt] = useState(
    [
      {
        text: "Sair",
        name: "btnSair",
        position: 4,
        color: '#383838'
      }
    ]
  );

  function handleLogOut() {
    LogOut();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>$124,202.00</Text>
      <FloatingAction
        style={styles.floatMenu}
        actions={optMenu}
        color='rgb(100, 0, 112)'
        onPressItem={nome => {
          if (nome == "btnSair") {
            handleLogOut();
          }
        }
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(112, 0, 152)',
    width: '100%',
    height: '100%',
  },
  textHeader: {
    color: 'white',
    textTransform: "uppercase",
    marginLeft:'5%',
    marginTop:'8%',
    fontSize:30,
  },
  floatMenu: {
    zIndex: 3,
  }
})
