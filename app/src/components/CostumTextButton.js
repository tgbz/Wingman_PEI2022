import React from 'react';
import { StyleSheet, Text, View, Button, TextInput , Pressable,  useWindowDimensions} from "react-native";
import { useState } from "react";
import {FONTS,COLORS, SHADOWS, SIZES } from '../constants'
import { TouchableOpacity } from 'react-native-gesture-handler';

const CostumTextButton = ({onPress, textNormal, textButton, textSize}) => {
    const {width} = useWindowDimensions();
    return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
        <Text style={[styles.textNormal, {fontSize:textSize}]}>{textNormal}</Text>
        <Text style={[styles.textButton, {fontSize:textSize}]}>{textButton}</Text>
    </TouchableOpacity>
);
};


const styles = StyleSheet.create({
    container:{
        padding: 15,
        borderRadius: 0,
        alignItems: 'center',
        flexDirection:'row',
        position:'relative'
        
    },
    textNormal: {
        fontFamily:'SoraBold',
        color: COLORS.wingblue,
        fontSize: 12,
    },
    textButton: {
        fontFamily:'SoraBold',
        color: COLORS.wingDarkBlue,
        fontSize: 12,

    },
})

export default CostumTextButton
