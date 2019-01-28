import React from "react"
import { Text, View } from "react-native"

const styles = {
  loading: {
    margin: 5,
  },
}

const Loading = ({ children }) => (
  <View style={styles.loading}>
    <Text>{children}</Text>
  </View>
)

export { Loading }
