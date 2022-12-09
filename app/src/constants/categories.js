
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
  casa: 
    {
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  CATEGORIESCOLORS.casa}]}>
                    <Ionicons name="home-outline" size={20} style={styles.item} />
           </TouchableHighlight>,
      name:'Casa'
    },
    mobilidade: 
    {
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  CATEGORIESCOLORS.mobilidade}]}>
                <Ionicons name="bus-outline" size={20} style={styles.item} />
          </TouchableHighlight>,
      name:'Mobilidade'
    },
    impostosTaxas: {
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  CATEGORIESCOLORS.impostosTaxas}]}>
              <FontAwesome5 name="percentage" size={20} style={styles.item} />
        </TouchableHighlight>,
      name:'Impostos e Taxas'
    },
    desporto: {
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  CATEGORIESCOLORS.desporto}]}>
                <MaterialIcons name="sports-tennis" size={20} style={styles.item} />
          </TouchableHighlight>,
      name:'Desporto'
    },
    culturaHobbies: {
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  CATEGORIESCOLORS.culturaHobbies}]}>
                <MaterialCommunityIcons name="theater" size={20} style={styles.item} />
          </TouchableHighlight>,
      name:'Cultura e Hobbies'
    },
    restaurantesCafes: {
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  CATEGORIESCOLORS.restaurantesCafes}]}>
                <MaterialIcons name="restaurant" size={20} style={styles.item} />
          </TouchableHighlight>,
      name:'Restaurantes e Cafés'
    },
    saude: {
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  CATEGORIESCOLORS.saude}]}>
                <MaterialIcons name="medical-services" size={20} style={styles.item} />
          </TouchableHighlight>,
      name:'Saúde'
    },
    viagens: {
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  CATEGORIESCOLORS.viagens}]}>
                  <FontAwesome name="plane" size={20} style={styles.item} />
            </TouchableHighlight>,
      name:'Viagens'
    },
    educacao: {
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  CATEGORIESCOLORS.educacao}]}>
                <SimpleLineIcons name="graduation" size={20} style={styles.item} />
          </TouchableHighlight>,
      name:'Educação'
  },
    semCategoria: {
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  CATEGORIESCOLORS.semCategoria}]}>
                <MaterialCommunityIcons name="dots-grid" size={20} style={styles.item} />
          </TouchableHighlight>,
      name:'Sem Categoria'
    },
    creditoComissoes: {
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  CATEGORIESCOLORS.creditoComissoes}]}>
                  <Entypo name="credit-card" size={20} style={styles.item} />
            </TouchableHighlight>,
      name:'Crédito e Comissões'
    },
    supermercadoLojas: {
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  CATEGORIESCOLORS.supermercadoLojas}]}>
                <Feather name="shopping-cart" size={20} style={styles.item} />
          </TouchableHighlight>,
      name:'Supermercado e Lojas'
    },
    seguros: {
      icon: <TouchableHighlight style={[styles.roundshape, {backgroundColor:  CATEGORIESCOLORS.seguros}]}>
                  <Ionicons name="shield-checkmark" size={20} style={styles.item} />
            </TouchableHighlight>,
      name:'Seguros'
    },
    entretenimento: {
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  CATEGORIESCOLORS.entretenimento}]}>
                  <MaterialCommunityIcons name="party-popper" size={20} style={styles.item} />
          </TouchableHighlight>,
      name:'Entretenimento'
    },
    investimentos: {
      icon:<TouchableHighlight style={[styles.roundshape, {backgroundColor:  CATEGORIESCOLORS.investimentos}]}>
      <FontAwesome5 name="hand-holding-usd" size={20} style={styles.item} />
</TouchableHighlight>,
      name:'Investimentos'
    },

}



