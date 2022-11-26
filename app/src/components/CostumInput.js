import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, useWindowDimensions } from "react-native";
import { useState } from "react";
import {FONTS,COLORS, SHADOWS, SIZES } from '../constants'
import { Ionicons, MaterialCommunityIcons, MaterialIcons, Entypo } from '@expo/vector-icons'



const CostumInput = ({value, setValue, placeholder, secureTextEntry, iconNameEntry='', widthScale=0.85}) => {
    const {width} = useWindowDimensions();
    const [passwordVisible, setPasswordVisible] = useState(secureTextEntry);
    return (
    <View style={[styles.container,  {width: width * widthScale }]}>
    {secureTextEntry ? <MaterialCommunityIcons name={iconNameEntry} style={styles.icon} size={18}></MaterialCommunityIcons>: 
        iconNameEntry!='' ?  <MaterialIcons name={iconNameEntry} style={styles.icon} size={18}></MaterialIcons>: 
        console.log("") }
       

        <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder} 
        style={styles.input}
        secureTextEntry={passwordVisible}
        />
        {placeholder=='*******'?(<MaterialIcons name={passwordVisible? 'visibility':'visibility-off'} onPress={
            () => {setPasswordVisible(!passwordVisible)}} size={24} style={styles.iconPwd}/>): <MaterialIcons style={styles.icon} name=''/>}
    </View>
);
};


const styles = StyleSheet.create({
    container:{
        backgroundColor: COLORS.eggshell,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginVertical: 12,
        borderWidth: 1,
        borderColor: COLORS.wingblue,
        flexDirection: 'row',
        alignSelf: 'center'
        
    },
    input: {
        flex: 0.95
        
    },

    iconPwd:{
        alignContent: 'flex-end',
        color: COLORS.wingDarkBlue,
    },
    icon:{
        color: COLORS.wingDarkBlue,
        flex: 0.1,
        alignContent:'space-around',
        padding: 3
    }
   
})

export default CostumInput
