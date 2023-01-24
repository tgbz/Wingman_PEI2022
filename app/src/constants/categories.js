
import { Ionicons,  MaterialCommunityIcons,Entypo, MaterialIcons, FontAwesome, FontAwesome5, SimpleLineIcons, Feather } from '@expo/vector-icons'
import { StyleSheet,  TouchableHighlight} from 'react-native';
import { CATEGORIESCOLORS } from './theme';
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
  11: 
    {
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  CATEGORIESCOLORS[11]}]}>
                    <Ionicons name="home-outline" size={20} style={styles.item} />
           </TouchableHighlight>,
      name:'Casa'
    },
    12: 
    {
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  CATEGORIESCOLORS[12]}]}>
                <Ionicons name="bus-outline" size={20} style={styles.item} />
          </TouchableHighlight>,
      name:'Mobilidade'
    },
    16: {
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  CATEGORIESCOLORS[16]}]}>
              <FontAwesome5 name="percentage" size={20} style={styles.item} />
        </TouchableHighlight>,
      name:'Impostos e Taxas'
    },
    15: {
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  CATEGORIESCOLORS[15]}]}>
                <MaterialIcons name="sports-tennis" size={20} style={styles.item} />
          </TouchableHighlight>,
      name:'Desporto'
    },
    18: {
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  CATEGORIESCOLORS[18]}]}>
                <MaterialCommunityIcons name="theater" size={20} style={styles.item} />
          </TouchableHighlight>,
      name:'Cultura e Hobbies'
    },
    19: {
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  CATEGORIESCOLORS[19]}]}>
                <MaterialIcons name="restaurant" size={20} style={styles.item} />
          </TouchableHighlight>,
      name:'Restaurantes e Cafés'
    },
    14: {
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  CATEGORIESCOLORS[14]}]}>
                <MaterialIcons name="medical-services" size={20} style={styles.item} />
          </TouchableHighlight>,
      name:'Saúde'
    },
    21: {
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  CATEGORIESCOLORS[21]}]}>
                  <FontAwesome name="plane" size={20} style={styles.item} />
            </TouchableHighlight>,
      name:'Viagens'
    },
    20: {
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  CATEGORIESCOLORS[20]}]}>
                <SimpleLineIcons name="graduation" size={20} style={styles.item} />
          </TouchableHighlight>,
      name:'Educação'
  },
    22: {
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  CATEGORIESCOLORS[22]}]}>
                <MaterialCommunityIcons name="dots-grid" size={20} style={styles.item} />
          </TouchableHighlight>,
      name:'Sem Categoria'
    },
    24: {
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  CATEGORIESCOLORS[24]}]}>
                  <Entypo name="credit-card" size={20} style={styles.item} />
            </TouchableHighlight>,
      name:'Crédito e Comissões'
    },
    23: {
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  CATEGORIESCOLORS[23]}]}>
                <Feather name="shopping-cart" size={20} style={styles.item} />
          </TouchableHighlight>,
      name:'Supermercado e Lojas'
    },
    25: {
      icon: <TouchableHighlight style={[styles.roundshape, {backgroundColor:  CATEGORIESCOLORS[25]}]}>
                  <Ionicons name="shield-checkmark" size={20} style={styles.item} />
            </TouchableHighlight>,
      name:'Seguros'
    },
    26: {
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  CATEGORIESCOLORS[26]}]}>
                  <MaterialCommunityIcons name="party-popper" size={20} style={styles.item} />
          </TouchableHighlight>,
      name:'Entretenimento'
    },
    27: {
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  CATEGORIESCOLORS[27]}]}>
      <FontAwesome5 name="hand-holding-usd" size={20} style={styles.item} />
</TouchableHighlight>,
      name:'Investimentos'
    },
    13: {
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  CATEGORIESCOLORS[13]}]}>
      <MaterialIcons name="family-restroom" size={20} style={styles.item} />
</TouchableHighlight>,
      name:'Família'
    },

}


export const SIGNS = {
  Credito: {
    icon: <Entypo name="plus" size={18} color={'green'} />
  },
  Debito: {
    icon:<Entypo name="minus" size={18} color={'red'} />,
  },
}
