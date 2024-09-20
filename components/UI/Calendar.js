import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ColorPropType, Platform } from 'react-native';

import Colors from '../../constants/Colors';
import FontSize from '../../constants/FontSize';
import moment from "moment";
import Card from "./CardOpacity";

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';
const INPUT_FOCUS = 'INPUT_FOCUS';

const Calendar = ({date}) => {
    return (
        <View style={{flexDirection: 'column'}}>
            <View
            style={{
                marginLeft: 10,
                borderWidth: 2,
                borderColor: Colors.grey,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                width: 56,
                height: 59,
                marginTop: 4,
                shadowRadius: 5,
                shadowColor: 'black',
                shadowOffset: {width: 3, height: -3},
                shadowOpacity: 0.1,
                elevation: 3,
            }}>
            <Text
                style={{
                    fontSize: FontSize.tinyContent,
                    opacity: 1,
                    backgroundColor: Colors.red,
                    textTransform: 'capitalize',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    color: 'white',
                }}>
                {moment(date).format('MMM')}
            </Text>
            <Text
                style={{
                    fontSize: FontSize.smallContent,
                    fontWeight: '700',
                    textAlign: 'center',
                    backgroundColor: 'white',
                }}>
                {moment(date).format('D')}
            </Text>
            <Text
                style={{
                    fontSize: FontSize.tinyContent,
                    fontWeight: '500',
                    textAlign: 'center',
                    backgroundColor: 'white',
                }}>
                {moment(date).format('ddd')}
            </Text>
        </View>
        <Text style={{
            marginLeft: 10,
            fontSize: FontSize.tinyContent,
            fontWeight: '500',
            textAlign: 'center'
        }}>{moment(date).format('hh:mm a')}</Text>
        </View>
    );
};

export default Calendar;