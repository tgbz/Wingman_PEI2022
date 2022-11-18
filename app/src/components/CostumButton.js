import React from 'react';
import { StyleSheet, Text, View, Button, TextInput , Pressable} from "react-native";
import { useState } from "react";
import {FONTS,COLORS, SHADOWS, SIZES } from '../constants'

const CostumInput = ({onPress, text, type = "PRIMARY"}) => {
    return (
    <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
        <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </Pressable>
);
};


const styles = StyleSheet.create({
    container:{
        width: "90%",
        padding: 15,
        borderRadius: 5,
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