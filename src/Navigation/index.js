import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Login/Login';
import SplashScreen from '../SplashScreen/SplashScreen';
import Registration from '../Registration/Registration';
import DonorHome from '../Donors/Dashboard/Dashboard';
import DonorProfile from '../Donors/Profile/Profile';
import DonorNavigation from './DonorNavigation';

const Stack = createStackNavigator();



const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Donor" component={DonorNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;