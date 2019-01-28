import React from "react"
import PropTypes from "prop-types"

import {
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native"

const styles = {
  block: {
    width: 200,
    height: 200,
    flexShrink: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 4,
    backgroundColor: "#f0f0f0",
  },
  blockLabel: {
    width: "100%",
    flexShrink: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  blockLabelText: {
    textAlign: "center",
    lineHeight: 30,
    fontSize: 20,
  },
}

const Block = ({ children, label, onPress }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.block}>
      {label ? (
        <View style={styles.blockLabelText}>
          <Text style={styles.blockLabelText}>{label}</Text>
        </View>
      ) : null}
      {children}
    </View>
  </TouchableWithoutFeedback>
)

Block.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
}

Block.defaultProps = {
  label: undefined,
  onPress: undefined,
}

export { Block }
