import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.background}>
      <View>
        <Text>Add logo here</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{

  }
});