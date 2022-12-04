import { Ionicons, Fontisto, MaterialCommunityIcons,Entypo, MaterialIcons, AntDesign,FontAwesome, FontAwesome5, SimpleLineIcons, Feather } from '@expo/vector-icons'
import { StyleSheet, View , Text, TouchableHighlight} from 'react-native';

export const COLORS = {
  primary: "#001F2D",
  secondary: "#4D626C",
  wingblue : "#7A97C2",
  wingDarkBlue: "#151940",

  white: "#FFF",
  gray: "#74858C",
  eggshell: "#FEFEFA"
};

export const SIZES = {
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 20,
  extraLarge: 30,
};

export const FONTS = {
  bold: "SoraBold",
  medium: "SoraMedium",
  light: "SoraLight",
};

export const SHADOWS = {
  light: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  medium: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  dark: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
};

const styles = StyleSheet.create({
  roundshape:  {
  height: 32, //any of height
  width: 32, //any of width
  justifyContent:"center",
  borderRadius: 22   // it will be height/2
  },
  item: {
    alignSelf: "center",
    color:'white',
    },

});

export const CATEGORIES = {
  casa: 
    {
      color: "#e72a31",
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  "#e72a31"}]}>
                    <Ionicons name="home-outline" size={20} style={styles.item} />
           </TouchableHighlight>,
      name:'Casa'
    },
    mobilidade: 
    {
      color: "#f26c3d",
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  "#f26c3d"}]}>
                <Ionicons name="bus-outline" size={20} style={styles.item} />
          </TouchableHighlight>,
      name:'Mobilidade'
    },
    impostosTaxas: {
      color: "#f9f037",
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  "#f9f037"}]}>
              <FontAwesome5 name="percentage" size={20} style={styles.item} />
        </TouchableHighlight>,
      name:'Impostos e Taxas'
    },
    desporto: {
      color: "#96c950",
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  "#96c950"}]}>
                <MaterialIcons name="sports-tennis" size={20} style={styles.item} />
          </TouchableHighlight>,
      name:'Desporto'
    },
    culturaHobbies: {
      color: "#139751",
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  "#139751"}]}>
                <MaterialCommunityIcons name="theater" size={20} style={styles.item} />
          </TouchableHighlight>,
      name:'Cultura e Hobbies'
    },
    restaurantesCafes: {
      color: "#177449",
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  "#177449"}]}>
                <MaterialIcons name="restaurant" size={20} style={styles.item} />
          </TouchableHighlight>,
      name:'Restaurantes e Cafés'
    },
    saude: {
      color: "#11a9a4",
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  "#11a9a4"}]}>
                <MaterialIcons name="medical-services" size={20} style={styles.item} />
          </TouchableHighlight>,
      name:'Saúde'
    },
    viagens: {
      color: "#5fc0eb",
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  "#5fc0eb"}]}>
                  <FontAwesome name="plane" size={20} style={styles.item} />
            </TouchableHighlight>,
      name:'Viagens'
    },
    educacao: {
      color: "#0b77bf",
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  "#0b77bf"}]}>
                <SimpleLineIcons name="graduation" size={20} style={styles.item} />
          </TouchableHighlight>,
      name:'Educação'
  },
    semCategoria: {
      color: "#C0bdbd",
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  "#C0bdbd"}]}>
                <MaterialCommunityIcons name="dots-grid" size={20} style={styles.item} />
          </TouchableHighlight>,
      name:'Sem Categoria'
    },
    creditoComissoes: {
      color: "#5253a5",
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  "#5253a5"}]}>
                  <Entypo name="credit-card" size={20} style={styles.item} />
            </TouchableHighlight>,
      name:'Crédito e Comissões'
    },
    supermercadoLojas: {
      color: "#743c9b",
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  "#743c9b"}]}>
                <Feather name="shopping-cart" size={20} style={styles.item} />
          </TouchableHighlight>,
      name:'Supermercado e Lojas'
    },
    seguros: {
      color: "#9c3496",
      icon: <TouchableHighlight style={[styles.roundshape, {backgroundColor:  "#9c3496"}]}>
                  <Ionicons name="shield-checkmark" size={20} style={styles.item} />
            </TouchableHighlight>,
      name:'Seguros'
    },
    entretenimento: {
      color: "#a71c70",
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  "#a71c70"}]}>
                  <MaterialCommunityIcons name="party-popper" size={20} style={styles.item} />
          </TouchableHighlight>,
      name:'Entretenimento'
    },
    investimentos: {
      color: '#db427a',
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  '#db427a'}]}>
      <FontAwesome5 name="hand-holding-usd" size={20} style={styles.item} />
</TouchableHighlight>,
      name:'Investimentos'
    },

}



