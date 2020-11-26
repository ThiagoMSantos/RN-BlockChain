import React from 'react';
import Dashboard from '../pages/frmDashboard';

import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

export default function AppRoutes(){
    return(
        <AppStack.Navigator screenOptions={{headerShown: false}} >
            <AppStack.Screen name="Dashboard" component={Dashboard}/>
        </AppStack.Navigator>
    );
    
}