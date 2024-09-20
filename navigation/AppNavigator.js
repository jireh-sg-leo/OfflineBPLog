import React, { useEffect, useCallback, useState, useContext } from 'react';
import { Alert, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer} from '@react-navigation/native';

import { BottomTabNavigator, navigationRef} from './BottomTabNavigator';
import { LocalizationContext } from '../constants/Localisation';
import { createStackNavigator } from '@react-navigation/stack';
import {AuthContext} from '../contexts/AuthContext';
import {AuthStackNavigator} from './AuthStackNavigator';
import {useAuth} from "../hooks/useAuth";
import {UserContext} from '../contexts/UserContext';

const Stack = createStackNavigator();

const AppNavigator = props => {
    const {auth, state} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const { t, locale, setLocale } = useContext(LocalizationContext);

    useEffect(() => {
        if (error) {
            Alert.alert(t('error_occur'), error, [{ text: t('okay'), onPress: () => setError(null) }]);
        }
    }, [error]);

    StatusBar.setBarStyle('dark-content');

    function renderScreens() {
        return state.user ? (
            <Stack.Screen name={'Home'}>
                {() => (
                    <UserContext.Provider value={state.user}>
                        <BottomTabNavigator />
                    </UserContext.Provider>
                )}
            </Stack.Screen>
        ) : (
            <Stack.Screen name={'AuthStack'} component={AuthStackNavigator} />
        );
    }

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    animationEnabled: false,
                }}>
                {renderScreens()}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;