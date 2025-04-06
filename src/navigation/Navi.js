import React from 'react';
import {Home,Details} from '../screens/';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();


export default function Navi(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Movie list" component={Home}  options={{ title: 'Listado de Peliculas' }} />
        <Stack.Screen name="Detalle" component={Details}  options={{ title: 'Detalle de la Película' }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
