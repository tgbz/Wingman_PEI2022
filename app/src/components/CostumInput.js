import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { useState } from "react";


const CostumInput = ({value, setValue, placeholder, secureTextEntry}) => {
    return (
    <View style={styles.container}>
        <TextInput 
        value={value}
        onChangeText={setValue}
        placeholder={placeholder} 
        style={styles.input}
        secureTextEntry={secureTextEntry}/>
    </View>
);
};


const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        width:'90%',
        borderColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginVertical: 12
    },
    input: {},
   
})

export default CostumInput