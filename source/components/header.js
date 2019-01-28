import React from "react"
import { Text, View } from "react-native"

const styles = {
  header: {
    width: "100%",
    marginHorizontal: 5,
    marginVertical: 15,
    flexShrink: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerText: {
    lineHeight: 30,
    fontSize: 20,
  },
}

const Header = ({ children }) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>{children}</Text>
  </View>
)

export { Header }
