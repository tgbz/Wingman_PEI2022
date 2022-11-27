import {
  View,
  Text,
  Image,
  useWindowDimensions,
  SafeAreaView,
  Button,
  StyleSheet,
  Platform,
} from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLORS, SHADOWS, SIZES } from '../constants'
import { useState, useEffect } from 'react'
import { serverURL } from '../config/hosts'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { CostumBackButton, CostumButton } from '../components'
import * as ImagePicker from 'expo-image-picker'

const createFormData = (photo, user) => {
  console.log("Create form data: "+JSON.stringify(photo) + " " + JSON.stringify(user))
  const data = new FormData()
  photo.path = Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri
  photo.name = photo.fileName
  data.append('avatarFile', photo)
  data.append('user', user)
   console.log("\nDATA: "+JSON.stringify(data))
  /*
  Object.keys(body).forEach((key) => {
    console.log("Create form data: "+key + " " + body[key])
    data.append(key, body[key]);
  });*/

  return data
}

export default function ProfileScreen({ navigation }) {
  const { height } = useWindowDimensions()
  const [token, setToken] = useState('')
  const [initData, setInitData] = useState(false)
  useEffect(() => {
    AsyncStorage.getItem('userToken')
      .then((userToken) => setToken(JSON.parse(userToken)))
      .catch((err) => console.log(err))
  }, [])

  const [data, setData] = useState([])
  const fetchData = async (token) => {
    //console.log(serverURL + '/users/userProfile/' + token.id)
    const resp = await fetch(`${serverURL}/users/userProfile/${token.id}`)
    const data = await resp.json()
    console.log('User fetch data: ' + JSON.stringify(data))
    setData(data)

    const resp_img = await fetch(`${serverURL}/files/avatar/${token.id}`)
    const img = resp_img.url
    console.log('User fetch img: ' + JSON.stringify(img))
    setPhoto(img)
  }
  // request data from server
  useEffect(() => {
    console.log('Entered useEffect' + token.id)
    if (token.id) {
      fetchData(token)
    }
  }, [token])


  function getMonthName(month) {
    const d = new Date()
    d.setMonth(month - 1)
    const monthName = d.toLocaleString('pt-PT', { month: 'long' })
    return monthName
  }
  // handleData that converts 1990-10-12T00:00:00.000Z to 12 de Outubro de 1990
  function handleData(data) {
    const date = new Date(data)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const newDate = day + ' de ' + getMonthName(month) + ' de ' + year
    return newDate
  }

  const [photo, setPhoto] = React.useState(null)
  const [hasGalleryPermission, setHasGalleryPermission] = React.useState(null)
  const [toupload,setToUpload]  = React.useState(false)
  // use effect to get permission to access gallery
  React.useEffect(() => {
    ;(async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
      setHasGalleryPermission(galleryStatus.status === 'granted')
    })()
  }, [])

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    console.log("result handleChoosePhoto: "+JSON.stringify(result))
    if (!result.cancelled) {
      //handleUploadPhoto()
      //setToUpload(true)
      setPhoto(result)
    }
  }

  if (hasGalleryPermission === false) {
    return <Text> Sem acesso à galeria </Text>
  }

  const handleUploadPhoto = () => {
    console.log("handleUploadPhoto "+ JSON.stringify(photo))
    fetch(`${serverURL}/files/avatar/`, {
      method: 'POST',
      body: createFormData(photo, token.id),
    })
      .then((response) => {
        response.json()
      })
      .then((response) => {
        console.log('response', response)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  /* useEffect photo
  useEffect(() => {
    if (photo!=null){
      console.log('Entered useEffect photo')
      setInitData(true)
    }
  }, [photo])

  useEffect(() => {
    if (toupload) {
      //handleUploadPhoto()
      setToUpload(false)
    }
  }, [toupload])

  // init data
  useEffect(() => {
    console.log('Init data: ' + initData)
  }, [initData])*/

  return (
    //console.log("--------------\nToken data: "+ JSON.stringify(token) + "\n--------------"),
    // if dataInit is false, show loading
   // !initData ? (
   //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
   //     <Text>Loading...</Text>
   //   </View>
    //) : (
      <SafeAreaView style={styles.root}>
        {/*<Image source={{uri: 'https://reactjs.org/logo-og.png'}}
       style={{width: 400, height: 400}} />*/}
        <View style={styles.navigationBar}>
          <CostumBackButton onPress={() => navigation.goBack()} />
          <Text style={styles.pageTitle}>Meu Perfil</Text>
        </View>
        {photo && (
            <>
              <Button title="Upload Photo" onPress={() => handleUploadPhoto()} /> 
            </>
          )}

        {/*
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          
          <Button title="Choose Photo" onPress={() => handleChoosePhoto()} />
          {photo && (
            <>
              {console.log(JSON.stringify(photo))}
              
             
              <Image source={{ uri: photo.uri }} style={styles.profileImage} />
               <Image source={{ uri: photo.uri }} style={{ width: 300, height: 300 }} /> 
              <Button title="Upload Photo" onPress={() => handleUploadPhoto()} /> 
            </>
          )}
        </View>
 */}

        <View style={{ alignSelf: 'center' }}>
          <View style={styles.profileImage}>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.profileImage} />
            ) : data.gender == 0 ? ( // man
              <Image
                source={require('../../assets/images/male-avatar.png')}
                style={styles.image}
                resizeMode="center"
              ></Image>
            ) : (
              <Image
                source={require('../../assets/images/female-avatar.png')}
                style={styles.image}
                resizeMode="center"
              ></Image>
            )}
          </View>
          {/* TO DO EDIT PICTURE*/}
          <View style={styles.addAvatar}>
            <MaterialCommunityIcons
              name="pencil-circle"
              size={48}
              color={COLORS.wingDarkBlue}
              onPress={() => handleChoosePhoto()}
            />
          </View>
        </View>

        <View style={styles.nameContainer}>
          <Text style={{ fontFamily: 'SoraLight', fontSize: SIZES.extraLarge }}>
            {data ? data.name : 'Loading...'}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoLine}>
            <View style={styles.col1}>
              <Text style={styles.textTag}>Email</Text>
            </View>
            <View style={styles.col2}>
              <Text style={styles.textInfo}>{data ? data.email : 'Loading...'}</Text>
            </View>

            <View style={styles.col1}>
              <Text style={styles.textTag}>Password</Text>
            </View>
            <View style={styles.col2}>
              <Text style={styles.textInfo}>{data ? '.........' : 'Loading...'}</Text>
            </View>

            <View style={styles.col1}>
              <Text style={styles.textTag}>Aniversário</Text>
            </View>
            <View style={styles.col2}>
              <Text style={styles.textInfo}>
                {data ? handleData(data.birthdate) : 'Loading...'}
              </Text>
            </View>

            <View style={styles.col1}>
              <Text style={styles.textTag}>Género</Text>
            </View>
            <View style={styles.col2}>
              <Text style={styles.textInfo}>
                {data ? (data.gender == 0 ? 'Masculino' : 'Feminino') : 'Loading...'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.containerBTN}>
          {/*
            <TouchableOpacity onPress={() => navigation.navigate("ProfileEdit")} style={[styles.button,{height: height*0.05}]}>
                <Text style={styles.buttonText}>Editar Perfil</Text>
            </TouchableOpacity> 
            */}
          <CostumButton
            onPress={() => navigation.navigate('ProfileEdit')}
            text="Editar Perfil"
            type="TERTIARY"
            widthScale={0.8}
          ></CostumButton>
          <CostumButton
            onPress={() => navigation.navigate('PassEdit')}
            text="Alterar Password"
            type="TERTIARY"
            widthScale={0.8}
          ></CostumButton>
        </View>
      </SafeAreaView>
    )
  //)
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  navigationBar: {
    // in case i wanto to add a button in the right side
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  pageTitle: {
    fontFamily: 'SoraMedium',
    fontSize: SIZES.medium,
    color: COLORS.wingDarkBlue,
    // center the text
    alignSelf: 'center',
    // center the text horizontally
    flex: 1,
    textAlign: 'center',
    right: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
  },
  addAvatar: {
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 5,
    right: 1,
    height: 50,
    width: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  infoContainer: {
    marginHorizontal: 40,
    marginTop: 40,
    marginBottom: 40,
  },
  textTag: {
    fontFamily: 'SoraBold',
    fontSize: SIZES.medium,
    color: COLORS.wingDarkBlue,
  },
  textInfo: {
    //marginLeft: 30,
    fontFamily: 'SoraLight',
    fontSize: SIZES.medium,
  },
  infoLine: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
  },
  col1: {
    width: '40%',
    marginBottom: 20,
  },
  col2: {
    width: '60%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.wingDarkBlue,
    borderRadius: SIZES.small,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.base,
    width: '40%',
    height: '80%',
  },
  containerBTN: {
    // Put the buttons at the bottom of the screen
    //position: 'absolute',
    //alignItems: "center",
    //justifyContent: "center",
    //bottom: "10%",
    //width: "100%",
    //  on the vertical center
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: SIZES.small,
    fontFamily: 'SoraBold',
  },
})
