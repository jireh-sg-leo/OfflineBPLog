import React from 'react';
import {View, StyleSheet} from 'react-native';
import Colors from "../../constants/Colors";

export function SplashScreen() {
    return <View style={[styles.container, {backgroundColor: Colors.primary}]} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});