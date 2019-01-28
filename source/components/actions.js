import React from "react"
import { View } from "react-native"

const styles = {
  actions: {
    flexShrink: 1,
    flexDirection: "row",
  },
}

const Actions = ({ children }) => (
  <View style={styles.actions}>{children}</View>
)

export { Actions }
