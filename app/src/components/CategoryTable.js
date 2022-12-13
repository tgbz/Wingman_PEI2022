import React from 'react';
import { StyleSheet, View,Modal,Text,Button, processColor } from 'react-native';
import { Table, Rows , TableWrapper} from 'react-native-table-component';
import {FONTS,COLORS, SIZES , CATEGORIES} from '../constants'
import {Entypo,AntDesign } from '@expo/vector-icons'

const CategoryTable = ({data}) => {
    const tableData = [];
    const plusIcon =(key) => <AntDesign name="pluscircle" size={20} color={COLORS.wingDarkBlue}
     onPress={() =>{// change percentage in data object 
        if (data[key].percentage < 100) {
        data[key].percentage = data[key].percentage + 1
        // refresh the table
        setUpdate(update => !update)
        }
     }
    }/>
    const minusIcon =(key) => <AntDesign name="minuscircle" size={20} color={COLORS.wingDarkBlue}
    onPress={() =>{// change percentage in data object 
        if (data[key].percentage > 0){
        data[key].percentage = data[key].percentage - 1
        // refresh the table
        setUpdate(update => !update)
        }
     }
    }/>
   /* const editIcon = (key) =>  <Entypo name="edit"
                        size={20}
                        color={COLORS.wingDarkBlue} onPress={()=> showModal(key)} />

    //  showModal that shows a modal to change the category percentage
    const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

    const showModal = (key) => {
        // showModal that shows a modal to change the category percentage
        setIsModalVisible(true);
        console.log(key);
    }
    */
   // use state to change the percentage

    const [update, setUpdate] = React.useState(false);

    // refresh the table when the percentage changes
    React.useEffect(() => {
        getTable()
    }, [update]);

    // create the table
    const getTable = () => {
    Object.keys(CATEGORIES).forEach(key => {
        const rowData = [];
        //rowData.push(CATEGORIES[key].icon, CATEGORIES[key].name, '5%', editIcon(key));
        Object.keys(data).forEach(dataKey => {
            if (data[dataKey].category === CATEGORIES[key].name) {
                rowData.push(CATEGORIES[key].icon, CATEGORIES[key].name,minusIcon(dataKey), data[dataKey].percentage, '€', plusIcon(dataKey));
            }});
       // rowData.push(CATEGORIES[key].icon, CATEGORIES[key].name,minusIcon, percentagem, '%', plusIcon);
        tableData.push(rowData);
      });  
    }  

    return (
        getTable(),
        <View style={styles.container}>
            {/*
            <View style={styles.centeredView}>
            <Modal transparent={true} visible={isModalVisible}>
                <View style={styles.modalView}>
                <Text>Hello!</Text>
                <Button title="Hide modal" onPress={handleModal} />
               </View>
             </Modal>
             </View>
                 */}
            {/* Button to confirm the changes , when cliked update pie chart data of parent*/}
            <Button title="Confirm" onPress={() => {console.log("confirm")}}/>
          <Table borderStyle={{borderWidth: 0}}>
            <TableWrapper style={styles.wrapper}>
              <Rows data={tableData} flexArr={[0.7, 4, 0.5, 0.5, 0.6]} style={styles.row} textStyle={styles.text}/>
            </TableWrapper>
          </Table>
          <View style={styles.container}>
          
      </View>
       </View>
      );
};

const styles = StyleSheet.create({
        container: { 
            flex: 1, 
            padding: 16, 
            paddingTop: 10, 
             },
        wrapper: { 
            flexDirection: 'row' },
        row: {  
            height: 45 , 
            paddingLeft: 20,
            marginBottom: 15,
            borderRadius: 10,
            backgroundColor: COLORS.white },
        text: { 
            padding: 5,
            fontFamily: FONTS.medium,
            fontSize: SIZES.medium,
            color: COLORS.wingDarkBlue },
        roundshape:  {
            backgroundColor: 'lightgreen',
            height: 44, //any of height
            width: 44, //any of width
            justifyContent:"center",
            borderRadius: 22   // it will be height/2
            },
        item: {
            alignSelf: "center",
            color:"white"
            },
            centeredView: {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              },
              modalView: {
                border: 1,
                borderColor: COLORS.wingDarkBlue,
                marginTop: 400,
                margin: 20,
                backgroundColor:COLORS.white,
                borderRadius: 20,
                padding: 35,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2
                },
            }
   
});
  
export default CategoryTable;