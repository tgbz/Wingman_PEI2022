import React from 'react';
import { StyleSheet, Text, View, Button, TextInput , Pressable,  useWindowDimensions} from "react-native";
import { useState } from "react";
import {FONTS,COLORS, SHADOWS, SIZES } from '../constants'
import { TouchableOpacity } from 'react-native-gesture-handler';

const CostumInput = ({onPress, text, type = "PRIMARY"}) => {
    const {width} = useWindowDimensions();
    return (
    <TouchableOpacity onPress={onPress} style={[styles.container, {width: width *0.85 }, styles[`container_${type}`]]}>
        <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </TouchableOpacity>
);
};


const styles = StyleSheet.create({
    container:{
        width: 350,
        padding: 15,
        borderRadius: SIZES.small,
        marginVertical: 10,
        alignItems: 'center',

    },
    container_PRIMARY:{
        backgroundColor:COLORS.wingDarkBlue,
    },

    container_TERTIARY:{},
    text: {
        color: 'white',
        fontFamily:'SoraBold',
        fontSize: 15
    },
    text_TERTIARY: {
        color: 'white',
        fontFamily:'SoraBold',
        fontSize: 12
    },
})

export default CostumInput
