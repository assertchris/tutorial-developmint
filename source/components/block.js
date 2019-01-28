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
  blockHighlight: {
    borderColor: "blue",
  },
  blockDisabled: {
    opacity: 0.5,
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

const Block = ({
  children,
  label,
  onPress,
  isHighlighted,
  isDisabled,
}) => {
  let blockStyles = {
    ...styles.block,
  }

  if (isHighlighted) {
    blockStyles = {
      ...blockStyles,
      ...styles.blockHighlight,
    }
  }

  if (isDisabled) {
    blockStyles = {
      ...blockStyles,
      ...styles.blockDisabled,
    }
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (!isDisabled) {
          if (onPress) {
            onPress()
          }
        }
      }}
    >
      <View style={blockStyles}>
        {label ? (
          <View style={styles.blockLabelText}>
            <Text style={styles.blockLabelText}>
              {label}
            </Text>
          </View>
        ) : null}
        {children}
      </View>
    </TouchableWithoutFeedback>
  )
}

Block.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
  isHighlighted: PropTypes.bool,
  isDisabled: PropTypes.bool,
}

Block.defaultProps = {
  label: undefined,
  onPress: undefined,
  isHighlighted: false,
  isDisabled: false,
}

export { Block }
