import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../Login/Login';
import SplashScreen from '../SplashScreen/SplashScreen';
import Registration from '../Registration/Registration';
import DonorHome from '../Donors/Dashboard/Dashboard';
import DonorProfile from '../Donors/Profile/Profile';

const Tabs = createBottomTabNavigator();

const DonorNavigation = () => {
    return (
        <Tabs.Navigator headerMode={'none'}>
            <Tabs.Screen name="SplashScreen" component={SplashScreen} />
            <Tabs.Screen name="Login" component={Login} />
            <Tabs.Screen name="Registration" component={Registration} />
            <Tabs.Screen name="DonorHome" component={DonorHome} />
            <Tabs.Screen name="DonorProfile" component={DonorProfile} />
        </Tabs.Navigator>
    );
}

export default DonorNavigation;