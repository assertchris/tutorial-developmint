import React from "react"
import PropTypes from "prop-types"
import { Icons } from "react-native-fontawesome"

import { Actions } from "./actions"
import { IconButton } from "./icon-button"

const DropletActions = ({
  droplet,
  selectedDroplet,
  onPressDeleteDroplet,
  onPressSnapshotDroplet,
}) => {
  if (selectedDroplet != droplet) {
    return null
  }

  return (
    <Actions>
      <IconButton
        onPress={() => onPressDeleteDroplet(droplet)}
      >
        {Icons.trash}
      </IconButton>
      <IconButton
        onPress={() => onPressSnapshotDroplet(droplet)}
      >
        {Icons.camera}
      </IconButton>
    </Actions>
  )
}

DropletActions.propTypes = {
  droplet: PropTypes.object.isRequired,
  selectedDroplet: PropTypes.object,
  onPressDeleteDroplet: PropTypes.func,
  onPressSnapshotDroplet: PropTypes.func,
}

DropletActions.defaultProps = {
  selectedDroplet: undefined,
  onPressDeleteDroplet: () => null,
  onPressSnapshotDroplet: () => null,
}

export { DropletActions }
