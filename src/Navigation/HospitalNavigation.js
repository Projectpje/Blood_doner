import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../Hospitals/Dashboard/Dashboard';
import Profile from '../Donors/Profile/Profile';
import AllDonorsList from '../Hospitals/AllDonorsList/AllDonorsList';
import R from '../Utils/R';

const Tabs = createBottomTabNavigator();

const HospitalNavigation = () => {
    return (
        <Tabs.Navigator headerMode={'none'}>
            <Tabs.Screen
                name="HospitalDashboard"
                component={Dashboard}
                options={{
                    title: "Dashboard",
                    tabBarIcon: () => {
                        return <Image source={R.Images.UserType.Donor}
                            style={{ width: 16, height: 16, resizeMode: 'contain' }}
                        />
                    }
                }}
            />

            <Tabs.Screen
                name="AllDonorsList"
                component={AllDonorsList}
                options={{
                    title: "All Donors",
                    tabBarIcon: () => {
                        return <Image source={R.Images.UserType.Donor}
                            style={{ width: 16, height: 16, resizeMode: 'contain' }}
                        />
                    }
                }}
            />

            <Tabs.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: () => {
                        return <Image source={R.Images.UserType.Donor}
                            style={{ width: 16, height: 16, resizeMode: 'contain' }}
                        />
                    }
                }}
            />

        </Tabs.Navigator>
    );
}

export default HospitalNavigation;