import React from 'react';
import { StyleSheet, Text, View, Button } from "react-native";

function HomeScreen(props) {
    return (
    <View style={styles.container}>
      <Text>HOME SCREEN</Text>
      <Button title="Sign Out" onPress={signOut} />
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