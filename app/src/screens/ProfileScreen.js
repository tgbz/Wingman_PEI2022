import {
  View,
  Text,
  Image,
  useWindowDimensions,
  SafeAreaView,
  Button,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import AuthContext from '../context/AuthProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLORS, SHADOWS, SIZES } from '../constants'
import { useState, useEffect } from 'react'
import { serverURL } from '../config/hosts'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { CustomBackButton, CustomButton } from '../components'
import * as ImagePicker from 'expo-image-picker'
import { useRoute } from '@react-navigation/native'

const createFormData = (pickedImage, user) => {
  console.log('Create form data: ' + JSON.stringify(pickedImage) + ' ' + JSON.stringify(user))
  const data = new FormData()
  console.log('plataforma: ' + Platform.OS)
  pickedImage.path =
    Platform.OS === 'ios' ? pickedImage.uri.replace('file://', '') : pickedImage.uri
  pickedImage.name = pickedImage.fileName
  data.append('avatarFile', pickedImage)
  data.append('user', user)
  console.log('\nDATA FORM: ' + JSON.stringify(data))


  return data
}

export default function ProfileScreen({ navigation }) {
  const { signOut } = React.useContext(AuthContext)
  const { width } = useWindowDimensions()
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
    // console log time at the moment of the fetch

    const img = await fetch(`${serverURL}/files/avatar/${token.id}`)
    //console.log('Time: ' + new Date().toLocaleTimeString())
    console.log('User fetch img: ' + JSON.stringify(img.url))
    setPhoto(img.url)
  }
  // request data from server
  useEffect(() => {
    console.log('Entered useEffect: ' + JSON.stringify(token) + '\n')
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
  const [pickedImage, setPickedImage] = React.useState(null)
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
    console.log('Picked Image: ' + JSON.stringify(result))
    if (!result.cancelled) {
      //handleUploadPhoto()
      //setToUpload(true)
      setPhoto(result.uri)
      setPickedImage(result)
    }
  }

  if (hasGalleryPermission === false) {
    return <Text> Sem acesso à galeria </Text>
  }

  const handleUploadPhoto = () => {
    console.log('handleUploadPhoto ' + JSON.stringify(pickedImage))
    fetch(`${serverURL}/files/avatar/`, {
      method: 'POST',
      body: createFormData(pickedImage, token.id),
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

  //  every time there is a picked image, upload it to the server
  React.useEffect(() => {
    console.log('useEffect image picked')
    if (pickedImage) {
      handleUploadPhoto()
    }
  }, [pickedImage])

  // every time route.params is true when user edits profile, refresh data
  const route = useRoute()
  useEffect(() => {
    // dont do shit if route.params is undefined
    if (route.params) {
      // se nao for undefined
      if (route.params.refresh) {
        // se for true
        console.log('Entered useEffect route.params')
        fetchData(token)
        console.log(typeof route.params.refresh)
        // set route.params.refresh to false
        route.params.refresh = false
      }
    }
  }, [route.params])

  return (
    // console log params from edit screen
    console.log('Params: ' + JSON.stringify(route.params)),
    (
      //console.log("--------------\nToken data: "+ JSON.stringify(token) + "\n--------------"),
      // if dataInit is false, show loading
      // !initData ? (
      //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      //     <Text>Loading...</Text>
      //   </View>
      //) : (
      <SafeAreaView style={styles.root}>
        {/* Header 
        <View style={styles.navigationBar}>
          <CustomBackButton onPress={() => navigation.goBack()} />
          <Text style={styles.pageTitle}>Meu Perfil</Text>
        </View>
        */}
        <View style={{ alignSelf: 'center', marginTop: 30 }}>
          <View style={styles.profileImage}>
            {photo ? (
              (console.log('I have photo!! ' + JSON.stringify(photo)),
              (<Image source={{ uri: photo }} style={styles.profileImage} />))
            ) : data.gender == 0 ? ( // man
              <Image
                source={require('../../assets/images/male-avatar.png')}
                style={styles.image}
                resizeMode="center"
              ></Image>
            ) : data.gender == 1 ? (
              <Image
                source={require('../../assets/images/female-avatar.png')}
                style={styles.image}
                resizeMode="center"
              ></Image>
            ) : (
              <Image
                source={require('../../assets/images/other-avatar.png')}
                style={styles.image}
                resizeMode="center"
              ></Image>
            )}
          </View>
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
                {data
                  ? data.gender == 0
                    ? 'Masculino'
                    : data.gender == 1
                    ? 'Feminino'
                    : 'Outro'
                  : 'Loading...'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.containerBTN}>
          <CustomButton
            onPress={() => navigation.navigate('ProfileEdit')}
            text="Editar Perfil"
            type="TERTIARY"
            widthScale={0.8}
          ></CustomButton>
          <CustomButton
            onPress={() => navigation.navigate('PassEdit')}
            text="Alterar Password"
            type="TERTIARY"
            widthScale={0.8}
          ></CustomButton>
          <CustomButton
            onPress={() => navigation.navigate('Accounts')}
            text="Minhas Contas"
            type="TERTIARY"
            widthScale={0.8}
          ></CustomButton>
          {/*Make a button with an icon for log out  */}
          <TouchableOpacity onPress={() => signOut()}>
            <View style={[styles.buttonContainer, { width: width * 0.8 }]}>
              <MaterialCommunityIcons name="logout" size={16} color={COLORS.wingDarkBlue} />
              <Text style={styles.logOutText}>Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  )
  //)
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.eggshell,
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
    marginTop: '7%',
    marginBottom: '7%',
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
    // Put the buttons if there is space 2mm after infoContainer

    // center the buttons
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: SIZES.small,
    fontFamily: 'SoraBold',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.wingDarkBlue,
    padding: '3.6%',
    borderRadius: SIZES.small,
    marginVertical: '1%',
  },
  logOutText: {
    marginLeft: 8,
    color: COLORS.wingDarkBlue,
    fontSize: SIZES.small,
    fontFamily: 'SoraMedium',
  },
})
