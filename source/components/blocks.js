import React from "react"
import { View } from "react-native"

const styles = {
  blocks: {
    flexShrink: 1,
    flexDirection: "row",
    flexWrap: 1,
  },
}

const Blocks = ({ children }) => (
  <View style={styles.blocks}>{children}</View>
)

export { Blocks }
