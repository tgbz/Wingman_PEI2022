import { useWindowDimensions,
    StyleSheet, Image, Alert, Text, TouchableOpacity, View,  ActivityIndicator,
  } from 'react-native'
  import React from 'react'
  import AsyncStorage from '@react-native-async-storage/async-storage'
  import { COLORS, FONTS, SHADOWS, SIZES, CATEGORIES } from '../constants'
  import { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { SafeAreaView } from 'react-native'
import { color, ScreenWidth } from 'react-native-elements/dist/helpers'
import { Ionicons,  MaterialCommunityIcons,Entypo, MaterialIcons, FontAwesome, FontAwesome5, SimpleLineIcons, Feather } from '@expo/vector-icons'
import OCRExpense from '../components/OCRExpense'


export default function OCRScreen({ navigation }) {
  const { height, width } = useWindowDimensions()
    const [products, setProducts] = useState([])
    const [token, setToken] = useState('')
    const [hasPermission, setPermission] = React.useState(false)
    const [photo, setPhoto] = React.useState(null)
    const [pickedImage, setPickedImage] = React.useState('')
    const [pickId, setPickId] = useState(0) 
    const [disabled, setDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [generalInfo, setGeneralInfo] = useState(null)

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
        aspect: [3,5] ,
        quality: 1})
      if (!data.cancelled) {
        setPhoto(data.uri)
        setPickedImage(data)
        setDisabled(false)

      }
    }else{
      askPermission();
    }
  }
  
  const pickFromCamera = async () =>{
    if (hasPermission){
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes:ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true, aspect: [5,3] ,
        quality: 0.7})
      if (!data.cancelled) {
        setPhoto(data.uri)
        data.name = "Cam".concat(String(pickId))
        data.fileName = "Cam".concat(String(pickId))
        setPickId(pickId+1)
        setPickedImage(data)
        setDisabled(false)
      }
    }else{
      Alert.alert("Permita o acesso à galeria!")
    }
  }



  const createFormData = () => {
    //console.log('Create form data: ' + JSON.stringify(pickedImage) + ' ' + JSON.stringify(user))
    const data = new FormData()
    //for each image, do this 
    pickedImage.path = Platform.OS === 'ios' ? pickedImage.uri.replace('file://', '') : pickedImage.uri
    pickedImage.name = pickedImage.fileName
    data.append(pickedImage.fileName, pickedImage);
    return data
  }

  //send Post request with all imagens inside 
  const sendPost = async () => {
    setLoading(true)
    //console.log('handleUploadPhoto ' + JSON.stringify(pickedImage))
    const resp = await fetch(`http://94.60.175.136:8000/ocr/upload`, {
      method: 'POST',
      body: createFormData(),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
    const transData = await resp.json()
    //console.log(transData)
    let productsResult = transformData(transData)
    setLoading(false)
    setLoaded(true)
    navigation.navigate('EditExpense', {originOCR: true, products: productsResult[0], genInfo: productsResult[1]})

  }

  const transformData = (transData) => {      
      var purchase = JSON.parse(transData);
      console.log(purchase)
      let products = []
      Object.keys(purchase.items).forEach((key, index) => {
        console.log(`${key}: ${purchase.items[key]}`);
        products.push({
          idcategory: 22,
          value:purchase.items[key],
          quantity: 1,
          description: key         
        })
        });
      let gen = {
        date: purchase.date,
        market: purchase.market,
        total : purchase.total
      }
      // Retorno isto assim pq se usar o setVar(), como é assíncrono, geralmente chega vazio à pag de Edit expense
      //  e assim tenho a certeza que não 
      return [products, gen]
  }

  function getCategoryIcon(selectedCategory) {
    //console.log('get icon: ' + selectedCategory)
    // loop through the CATEGORIES object
    // get icon by key
    for (const [key, value] of Object.entries(CATEGORIES)) {
      if (key == selectedCategory) {
        return value.icon
      }
    }
    // if no match is found, return null
    return null
  }


    return ( askPermission(),
      <SafeAreaView style={styles.root}>
             {!loaded && <Text style={styles.textInicial}>Carrega a fotografia da tua fatura:</Text>}

      {pickedImage== '' &&
      <View style={{
          backgroundColor: COLORS.eggshell,
          width: width*0.7,
          height: height*0.45,
          borderColor: COLORS.wingblue,
          borderWidth: 3,
          justifyContent: 'center',
          borderStyle: 'dashed',
          alignSelf: 'center',  
          alignItems: 'center',
          marginVertical: 30,   
        }}>
          <View style={{ flexDirection:"row", flexWrap:'wrap', justifyContent:'space-around', width: width*0.60}}>
            <View style={styles.bt}>
                <TouchableOpacity onPress={()  => pickFromCamera()} style={[styles.roundshape, {backgroundColor:  COLORS.wingblue}]}>
                <FontAwesome5 name="camera" size={25} style={styles.item} />
                </TouchableOpacity>
                <Text style={{fontFamily:FONTS.light}}>Câmara</Text>
            </View>
            <View style={styles.bt}>
            <TouchableOpacity  onPress={()  => pickFromGallery()} style={[styles.roundshape, {backgroundColor:  COLORS.wingblue}]}>
                  <Entypo name="images" size={25} style={styles.item} />
            </TouchableOpacity>
            <Text style={{fontFamily:FONTS.light}}>Galeria</Text>
              
            </View>
          </View>
      </View>
    }
    {pickedImage!= '' &&
      <View style={{
          backgroundColor: COLORS.eggshell,
          width: (pickedImage.width > width*0.7?width*0.7:pickedImage.width)+5,
          height: pickedImage.height*0.40+5,
          borderColor: COLORS.wingblue,
          borderWidth: 3,
          justifyContent: 'center',
          borderStyle: 'dashed',
          alignSelf: 'center',  
          alignItems: 'center',
          marginVertical: 30,   
        }}>
         <Image
              source={{ uri: pickedImage.uri}}
              style={[styles.image, { width: (pickedImage.width > width*0.7?width*0.7:pickedImage.width),
        height: pickedImage.height*0.40}]}
              
            />
      </View>
    }
      <View style={[{
          alignContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          marginVertical: 20,
        }]}>

      {!loaded &&
          <TouchableOpacity onPress={()  => sendPost()} style={[styles.button, { width: width*0.50, backgroundColor: disabled? '#E8E8E8': COLORS.wingblue}]} disabled={disabled}>
              <Text style={[styles.text , {color: disabled? '#C0C0C0': COLORS.white}]}>Continuar   <Entypo name="arrow-right" size={25} style={styles.item} color={COLORS.wingDarkBlue}/>
              </Text>
          </TouchableOpacity>
      }
      {loading && <ActivityIndicator size="large" color={COLORS.wingDarkBlue}/>}
      {/*loaded &&
          <TouchableOpacity onPress={()  => navigation.navigate('OCR', {refresh: true})} style={[styles.button, { width: width*0.50, backgroundColor: disabled? '#E8E8E8': COLORS.wingblue}]} disabled={disabled}>
              <Text style={[styles.text , {color: disabled? '#C0C0C0': COLORS.white}]}>Recomeçar   <Entypo name="reload" size={25} style={styles.item} color={COLORS.wingDarkBlue}/>
              </Text>
          </TouchableOpacity>
    */}
      
      </View>
    </SafeAreaView>
      )
      //)
  }
  
  const styles = StyleSheet.create({
    root: {
      backgroundColor: COLORS.white,
      padding: 50,
      flex: 1

    },
    button:{
      backgroundColor:COLORS.wingblue,
      justifyContent:'center',
      height: 45,
      borderRadius:15,
      marginBottom: 10,
      alignContent: 'center',
      alignItems: 'center',
      alignSelf: 'center'
    },
    bt: {
      paddingVertical: 10,
    },
    textInicial: {
      padding: 20,
      fontFamily: FONTS.medium,
      fontSize: SIZES.medium,
      justifyContent: 'center'
    },
    text: {
      fontFamily: FONTS.medium,
      fontSize: SIZES.medium,
      justifyContent: 'center'
    },
    roundshape:  {
      height: 50, //any of height
      width: 50, //any of width
      justifyContent:"center",
      borderRadius: 22   // it will be height/2
      },
    item: {
      alignSelf: "center",
      color:'white',
      },
      imageContainer: {
        padding: 30
      },
      image: {
       
        resizeMode: 'cover'
      }

  })
  