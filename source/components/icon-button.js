import React from "react"
import PropTypes from "prop-types"
import { TouchableWithoutFeedback } from "react-native"
import FontAwesome from "react-native-fontawesome"

const styles = {
  icon: {
    fontSize: 40,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
}

const IconButton = ({ children, onPress }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <FontAwesome style={styles.icon}>
      {children}
    </FontAwesome>
  </TouchableWithoutFeedback>
)

IconButton.propTypes = {
  onPress: PropTypes.func,
}

IconButton.defaultProps = {
  onPress: undefined,
}

export { IconButton }
