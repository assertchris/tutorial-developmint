import React from "react"
import PropTypes from "prop-types"
import { Icons } from "react-native-fontawesome"

import { Actions } from "./actions"
import { IconButton } from "./icon-button"

const SnapshotActions = ({
  snapshot,
  selectedSnapshot,
  onPressDeleteSnapshot,
}) => {
  if (selectedSnapshot != snapshot) {
    return null
  }

  return (
    <Actions>
      <IconButton
        onPress={() => onPressDeleteSnapshot(snapshot)}
      >
        {Icons.trash}
      </IconButton>
    </Actions>
  )
}

SnapshotActions.propTypes = {
  snapshot: PropTypes.object.isRequired,
  selectedSnapshot: PropTypes.object,
  onPressDeleteSnapshot: PropTypes.func,
}

SnapshotActions.defaultProps = {
  selectedSnapshot: undefined,
  onPressDeleteSnapshot: () => null,
}

export { SnapshotActions }
