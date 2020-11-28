import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './contexts/auth';
console.disableYellowBox = true;

import Routes from './routes/index';

export default function App() {

    const theme = {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: 'white',
          placeholder: 'white',
          text: 'white',
        },
      };

    return (

        <NavigationContainer>
            <AuthProvider>
                <PaperProvider theme={theme}>
                    <Routes />
                </PaperProvider>
            </AuthProvider>
        </NavigationContainer>
    );
}