import React from 'react';
import Index from '../pages/index';
import frmCadastroUsuario from '../pages/frmCadastroUsuario';

import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator();

export default function AuthRoutes(){
    return(
        <AuthStack.Navigator screenOptions={{headerShown: false}} >
            <AuthStack.Screen name="Index" component={Index}/>
            <AuthStack.Screen name="frmCadastroUsuario" component={frmCadastroUsuario}/>
        </AuthStack.Navigator>
    );

}