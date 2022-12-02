import React from 'react';
import { StyleSheet, Text, View, Button, TextInput , Pressable,  useWindowDimensions, TouchableOpacity} from "react-native";
import { useState } from "react";
import {FONTS,COLORS, SHADOWS, SIZES } from '../constants'

const CustomButton = ({onPress, text, type = "PRIMARY", widthScale=0.85}) => {
    const {width} = useWindowDimensions();

    return (
    <TouchableOpacity onPress={onPress} style={[styles.container, {width: width *widthScale }, styles[`container_${type}`]]}>
        <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </TouchableOpacity>
);
};


const styles = StyleSheet.create({
    container:{
        width: 350,
        padding: "4%",
        borderRadius: SIZES.small,
        marginVertical: "1%",
        alignItems: 'center',
    },
    container_PRIMARY:{
        backgroundColor:COLORS.wingDarkBlue,
    },

    container_TERTIARY:{
        backgroundColor:COLORS.wingDarkBlue,
    },
    
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

export default CustomButton
