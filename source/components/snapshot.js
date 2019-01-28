import React from "react"
import PropTypes from "prop-types"

import { Block } from "./block"
import { SnapshotActions } from "./snapshot-actions"

const Snapshot = ({
  snapshot,
  selectedSnapshot,
  onPressSnapshot,
  onPressDeleteSnapshot,
}) => {
  return (
    <Block
      key={snapshot.id}
      onPress={() =>
        selectedSnapshot != snapshot
          ? onPressSnapshot(snapshot)
          : onPressSnapshot(undefined)
      }
      label={snapshot.name}
    >
      <SnapshotActions
        snapshot={snapshot}
        selectedSnapshot={selectedSnapshot}
        onPressDeleteSnapshot={onPressDeleteSnapshot}
      />
    </Block>
  )
}

Snapshot.propTypes = {
  snapshot: PropTypes.object.isRequired,
  selectedSnapshot: PropTypes.object,
  onPressSnapshot: PropTypes.func,
  onPressDeleteSnapshot: PropTypes.func,
}

Snapshot.defaultProps = {
  selectedSnapshot: undefined,
  onPressSnapshot: () => null,
  onPressDeleteSnapshot: () => null,
}

export { Snapshot }
