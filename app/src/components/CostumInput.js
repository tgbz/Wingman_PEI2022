import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, useWindowDimensions } from "react-native";
import { useState } from "react";
import {FONTS,COLORS, SHADOWS, SIZES } from '../constants'



const CostumInput = ({value, setValue, placeholder, secureTextEntry, bgColor = COLORS.white, border= COLORS.white, placeholderColor=COLORS.placeholder}) => {
    const {width} = useWindowDimensions();
    return (
    <View style={[styles.container,  {width: width *0.85 }, {backgroundColor: bgColor}, {borderColor: border}]}>
        <TextInput 
        value={value}
        onChangeText={setValue}
        placeholder={placeholder} 
        placeholderTextColor = {placeholderColor}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        />
    </View>
);
};


const styles = StyleSheet.create({
    container:{
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginVertical: 12,
        borderWidth: 1,
        borderColor: COLORS.white
    },
    input: {},
   
})

export default CostumInput
