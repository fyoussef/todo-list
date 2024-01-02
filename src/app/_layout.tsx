import { StatusBar } from "expo-status-bar";
import { Slot } from "expo-router";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export default function Layout() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styled.container}>
        <Slot />
        <StatusBar style="light" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styled = StyleSheet.create({
  container: {
    padding: 32,
    backgroundColor: "#18181b",
    flex: 1,
  },
});
