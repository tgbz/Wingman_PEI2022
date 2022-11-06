import { StatusBar } from 'expo-status-bar';



/* 
View é um componente que serve para renderizar elementos no ecrâ, invocando outros componentes React Native.
Text é um componente que serve para renderizar texto no ecrâ.
TouchableOpacity é um componente que serve para renderizar um botão no ecrâ.
TextInput é um componente que serve para renderizar um input de texto no ecrâ.
Image é um componente que serve para renderizar uma imagem no ecrâ.
Stylesheet é um componente que serve para definir estilos para os componentes React Native.
  

*/
import { StyleSheet, Text, View } from 'react-native';




//Function Component, também podemos usar Class componentes
/* 
Se está View for para IOS, esta vai estar mapeada para UIView (NATIVO IOS),
se for para Android, esta vai estar mapeada para View.

*/

export default function App() {
  return (
    <View style={styles.container}>
      <Text>TESTE</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
