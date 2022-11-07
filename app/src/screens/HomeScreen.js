import React from 'react';
import { StyleSheet, Text, View, Button } from "react-native";
import AuthContext from "../context/AuthProvider";

function HomeScreen({navigation}) {
  const { signOut } = React.useContext(AuthContext);
    return (
    <View style={styles.container}>
      <Text>This is profile</Text>
      <Button title="Log out" onPress={() => signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;