import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, useWindowDimensions } from "react-native";
import { useState } from "react";
import {FONTS,COLORS, SHADOWS, SIZES } from '../constants'
import { Icon } from '@rneui/themed';



const CostumInput = ({value, setValue, placeholder, secureTextEntry , isPassword}) => {
    const {width} = useWindowDimensions();
    const [passwordVisible, setPasswordVisible] = useState(secureTextEntry);
    return (
    <View style={[styles.container,  {width: width *0.85 }]}>
        <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder} 
        style={styles.input}
        secureTextEntry={passwordVisible}
        />
        {placeholder=='*******'?(<Icon name={passwordVisible? 'visibility':'visibility-off'} onPress={
            () => {setPasswordVisible(!passwordVisible)}} style={styles.icon}/>): <Icon style={styles.icon} name=''/>}
    </View>
);
};


const styles = StyleSheet.create({
    container:{
        backgroundColor: COLORS.white,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginVertical: 12,
        borderWidth: 1,
        borderColor: COLORS.white,
        flexDirection: 'row'
        
    },
    input: {
        flex: 0.95
    },

    icon:{
        alignContent: 'flex-end'
    }
   
})

export default CostumInput
