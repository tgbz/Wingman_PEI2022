import React from 'react';
import { StyleSheet, Text, View, Button, TextInput , Pressable,  useWindowDimensions} from "react-native";
import { useState } from "react";
import {FONTS,COLORS, SHADOWS, SIZES } from '../constants'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

const CostumBackButton = ({onPress}) => {
    return (
        <Ionicons name="chevron-back"
        size={30}
        color={COLORS.wingDarkBlue}
        onPress={onPress}  
        style={styles.icon} />
);
};


const styles = StyleSheet.create({
    icon:{
        alignContent: 'flex-end',
    }
})

export default CostumBackButton
