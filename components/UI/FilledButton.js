import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Colors from "../../constants/Colors";

export function FilledButton({title, style, onPress}) {
    const {colors} = useTheme();

    return (
        <TouchableOpacity
            style={[styles.container, style, {backgroundColor: Colors.red}]}
            onPress={onPress}>
            <Text style={styles.text}>{title.toUpperCase()}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 8,
    },
    text: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
    },
});