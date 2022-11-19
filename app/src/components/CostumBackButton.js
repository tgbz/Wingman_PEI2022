import React from 'react';
import { StyleSheet, Text, View, Button, TextInput , Pressable,  useWindowDimensions} from "react-native";
import { useState } from "react";
import {FONTS,COLORS, SHADOWS, SIZES } from '../constants'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from '@rneui/themed';
const CostumBackButton = ({onPress}) => {
    return (
        <Icon name={'arrow-back-ios'} onPress={onPress}  color={COLORS.wingDarkBlue} style={styles.icon} />
);
};


const styles = StyleSheet.create({
    icon:{
        alignContent: 'flex-end',
        
    }
})

export default CostumBackButton
