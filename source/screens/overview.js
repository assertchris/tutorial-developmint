import React, { Component } from "react"
import { Alert, ScrollView } from "react-native"

import { Context } from "../context"

import {
  Blocks,
  Droplet,
  Header,
  Loading,
  Snapshot,
} from "../components"

const styles = {
  containerOuter: {
    backgroundColor: "#fff",
    flex: 1,
  },
  containerInner: {
    padding: 125,
    alignItems: "flex-start",
    justifyContent: "center",
  },
}

const cancelButton = () => ({
  text: "Cancel",
  style: "cancel",
})

const okButton = onPress => ({
  text: "Ok",
  onPress,
})

const confirm = (title, description, buttons) => {
  Alert.alert(title, description, buttons, {
    cancelable: false,
  })
}

class Overview extends Component {
  static contextType = Context

  async componentDidMount() {
    const { getDroplets, getSnapshots } = this.context
    await Promise.all([getDroplets(), getSnapshots()])
  }

  onPressDeleteDroplet = droplet => {
    const name = droplet.name

    confirm(
      `Delete ${name}`,
      `Are you sure you want to delete ${name}?`,
      [cancelButton(), okButton(() => alert("<delete>"))],
    )
  }

  onPressSnapshotDroplet = droplet => {
    const name = droplet.name

    confirm(
      `Delete ${name}`,
      `Are you sure you want to create a snapshot of ${name}?`,
      [cancelButton(), okButton(() => alert("<snapshot>"))],
    )
  }

  onPressDeleteSnapshot = snapshot => {
    const name = snapshot.name

    confirm(
      `Delete ${name}`,
      `Are you sure you want to delete ${name}?`,
      [cancelButton(), okButton(() => alert("<delete>"))],
    )
  }

  render() {
    const {
      droplets,
      isLoadingDroplets,
      snapshots,
      isLoadingSnapshots,
    } = this.context

    return (
      <ScrollView
        style={styles.containerOuter}
        contentContainerStyle={styles.containerInner}
      >
        <Header>Droplets</Header>
        <Blocks>
          {isLoadingDroplets ? (
            <Loading>Loading droplets...</Loading>
          ) : (
            droplets.map(this.renderDroplet)
          )}
        </Blocks>
        <Header>Snapshots</Header>
        <Blocks>
          {isLoadingSnapshots ? (
            <Loading>Loading snapshots...</Loading>
          ) : (
            snapshots.map(this.renderSnapshot)
          )}
        </Blocks>
      </ScrollView>
    )
  }

  renderDroplet = droplet => {
    const {
      selectedDroplet,
      setSelectedDroplet,
    } = this.context

    const {
      onPressDeleteDroplet,
      onPressSnapshotDroplet,
    } = this

    return (
      <Droplet
        key={droplet.id}
        droplet={droplet}
        selectedDroplet={selectedDroplet}
        onPressDroplet={setSelectedDroplet}
        onPressDeleteDroplet={onPressDeleteDroplet}
        onPressSnapshotDroplet={onPressSnapshotDroplet}
      />
    )
  }

  renderSnapshot = snapshot => {
    const {
      selectedSnapshot,
      setSelectedSnapshot,
    } = this.context

    const { onPressDeleteSnapshot } = this

    return (
      <Snapshot
        key={snapshot.id}
        snapshot={snapshot}
        selectedSnapshot={selectedSnapshot}
        onPressSnapshot={setSelectedSnapshot}
        onPressDeleteSnapshot={onPressDeleteSnapshot}
      />
    )
  }
}

export { Overview }
