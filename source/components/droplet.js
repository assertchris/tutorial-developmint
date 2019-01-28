import React from "react"
import PropTypes from "prop-types"

import { Block } from "./block"
import { DropletActions } from "./droplet-actions"

const Droplet = ({
  droplet,
  selectedDroplet,
  onPressDroplet,
  onPressDeleteDroplet,
  onPressSnapshotDroplet,
}) => {
  return (
    <Block
      key={droplet.id}
      onPress={() =>
        selectedDroplet != droplet
          ? onPressDroplet(droplet)
          : onPressDroplet(undefined)
      }
      label={droplet.name}
    >
      <DropletActions
        droplet={droplet}
        selectedDroplet={selectedDroplet}
        onPressDeleteDroplet={onPressDeleteDroplet}
        onPressSnapshotDroplet={onPressSnapshotDroplet}
      />
    </Block>
  )
}

Droplet.propTypes = {
  droplet: PropTypes.object.isRequired,
  selectedDroplet: PropTypes.object,
  onPressDroplet: PropTypes.func,
  onPressDeleteDroplet: PropTypes.func,
  onPressSnapshotDroplet: PropTypes.func,
}

Droplet.defaultProps = {
  selectedDroplet: undefined,
  onPressDroplet: () => null,
  onPressDeleteDroplet: () => null,
  onPressSnapshotDroplet: () => null,
}

export { Droplet }
