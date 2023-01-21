import { useWindowDimensions,
    StyleSheet, Image, Alert, Text, TouchableOpacity, View, 
  } from 'react-native'
  import React from 'react'
  import AsyncStorage from '@react-native-async-storage/async-storage'
  import { COLORS, FONTS, SHADOWS, SIZES } from '../constants'
  import { useState, useEffect } from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { Button } from 'react-native-elements'
import { SafeAreaView } from 'react-native'
import { ScreenWidth } from 'react-native-elements/dist/helpers'
import CompressImage from 'react-native-compress-image';
import * as MediaLibrary from 'expo-media-library';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
 
 } from "react-native-popup-menu";
 import { Entypo } from "@expo/vector-icons";

export default function PoliticsSuggestionScreen({ navigation }) {
  const { height, width } = useWindowDimensions()

    const [token, setToken] = useState('')
    const [hasPermission, setPermission] = React.useState(false)
    const [photo, setPhoto] = React.useState(null)
    const [pickedImage, setPickedImage] = React.useState(null)
    const [pickId, setPickId] = useState(0) 

    const pick1 = {fileName:"IMG_4776.JPG","width":946,"fileSize":87414,"height":946,"cancelled":false,"uri":"file:///var/mobile/Containers/Data/Application/4B8C5572-7AA0-40AC-B017-0CD6F65DDFAC/Library/Caches/ExponentExperienceData/%2540anonymous%252Fapp-493be2c9-8eb4-4f3a-bb9e-e4de4faaee4e/ImagePicker/9CD31169-6A3F-490D-8920-742D146B1382.jpg","assetId":"8CD89C92-2B1F-4EA5-A2ED-437CFF30CC54/L0/001","type":"image"}
    const pick2 = {"fileSize":1918411,"width":3024,"fileName":"cam0","cancelled":false,"height":3025,"type":"image","uri":"file:///var/mobile/Containers/Data/Application/4B8C5572-7AA0-40AC-B017-0CD6F65DDFAC/Library/Caches/ExponentExperienceData/%2540anonymous%252Fapp-493be2c9-8eb4-4f3a-bb9e-e4de4faaee4e/ImagePicker/89D07D6C-072F-4C7B-99C7-D62BA6C3143A.jpg","assetId":null}
    useEffect(() => {
      AsyncStorage.getItem('userToken')
        .then((userToken) => {setToken(JSON.parse(userToken))})
        .catch((err) => console.log(err))
    }, [])

    const askPermission = async() =>{
      const granted = await ImagePicker.requestMediaLibraryPermissionsAsync()
      setPermission(granted)
    }

  const pickFromGallery = async () =>{
    if (hasPermission){
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1,1],
        quality: 0.7})
      if (!data.cancelled) {
        setPhoto(data.uri)
        setPickedImage(data)
      }
    }else{
      askPermission();
    }
  }
  
  const pickFromCamera = async () =>{
    if (hasPermission){
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes:ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1,1],
        quality: 0.7})
      if (!data.cancelled) {
        setPhoto(data.uri)
        data.name = "Cam".concat(String(pickId))
        setPickId(pickId+1)
        setPickedImage(data)
      }
    }else{
      Alert.alert("Permita o acesso à galeria!")
    }
  }

  
  


  //send Post request with all imagens inside 
  const sendPost = () => {
    //console.log('handleUploadPhoto ' + JSON.stringify(pickedImage))
    fetch(`http://94.60.175.136:8000/ocr/upload`, {
      method: 'POST',
      body: createFormData(),
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      /*.then((response) => {
        response.json()
      })
      .then((response) => {
        console.log('response', response)
      })*/
      .catch((error) => {
        console.log('error', error)
      })

  }

  

  const createFormData = () => {
    //console.log('Create form data: ' + JSON.stringify(pickedImage) + ' ' + JSON.stringify(user))
    const data = new FormData()
    //for each image, do this 
    pick1.path = Platform.OS === 'ios' ? pick1.uri.replace('file://', '') : pick1.uri
    pick1.name = pick1.fileName
    data.append(pick1.fileName, pick1);
    pick2.path = Platform.OS === 'ios' ? pick2.uri.replace('file://', '') : pick2.uri
    pick2.name = pick2.fileName
    data.append(pick2.fileName, pick2);

    console.log('\nDATA FORM: ' + JSON.stringify(data))
   
    return data
  }

    return ( askPermission(),
      <SafeAreaView style={styles.root}>
     <Text style={styles.text}>Carrega a(s) fotografia(s) da tua(s) fatura(s):</Text>
        
    <View style={{
        backgroundColor: COLORS.white,
        width: width*0.7,
        height: height*0.45,
        borderColor: COLORS.wingDarkBlue,
        borderWidth: 3,
        justifyContent: 'center',
        borderStyle: 'dotted',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',  
        marginVertical: 30,

             
      }}>
        <View style={styles.bt}>
            <TouchableOpacity onPress={()  => pickFromCamera()} style={styles.button}>
            <Text >Camera</Text>
             </TouchableOpacity>
        </View>
        <View style={styles.bt}>
    <TouchableOpacity onPress={()  => pickFromGallery()} style={styles.button}>
        <Text>Galeria</Text>
    </TouchableOpacity>
    </View>
    </View>
    <View style={[{borderStyle: 'dotted',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 20,
      }]}>
    <TouchableOpacity onPress={()  => sendPost()} style={styles.button}>
        <Text>Continuar</Text>
    </TouchableOpacity>
    </View>
    <MenuProvider style={styles.container}>
        <View>
          <Menu>
            <MenuTrigger text="Open menu" />

            <MenuOptions>
              <MenuOption onSelect={() => alert(`Save`)} text="Save" />
              <MenuOption onSelect={() => alert(`Delete`)}>
              <TouchableOpacity onPress={()  => pickFromGallery()} style={styles.button}>
            <Text >Camera</Text>
             </TouchableOpacity>
              </MenuOption>
              <MenuOption
                onSelect={() => alert(`Not called`)}
                disabled={true}
                text="Disabled"
              />
            </MenuOptions>
          </Menu>
        </View>
      </MenuProvider>
      </SafeAreaView>
    )
    //)
  }
  
  const styles = StyleSheet.create({
    root: {
      backgroundColor: COLORS.eggshell,
      padding: 50,
      flex: 1

    },
    button:{
      height: 60,
      backgroundColor:COLORS.wingblue,
      width: ScreenWidth/3,
      padding: 20,
    },
    bt: {
      paddingVertical: 10
    },
    text: {
      padding: 20,
      fontFamily: FONTS.medium,
      fontSize: SIZES.medium
    }

  })
  