import React, { Component } from "react"

import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"

import { Icons } from "react-native-fontawesome"

import { Context } from "../context"

import {
  Block,
  Blocks,
  Header,
  Loading,
  IconButton,
} from "../components"

const styles = {
  containerOuter: {
    backgroundColor: "#fff",
    flex: 1,
  },
  containerInner: {
    padding: 75,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  blockLine: {
    width: "100%",
  },
  blockLineText: {
    textAlign: "center",
    lineHeight: 30,
    fontSize: 20,
  },
  nameInput: {
    width: 400,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    borderRadius: 4,
    backgroundColor: "#f5f5f5",
    fontSize: 20,
    padding: 10,
  },
  button: {
    marginTop: 20,
    marginLeft: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 4,
    backgroundColor: "#f0f0f0",
  },
}

class CreateDroplet extends Component {
  static contextType = Context

  state = {
    selectedSnapshot: undefined,
    selectedSize: undefined,
    selectedRegion: undefined,
    name: "",
  }

  async componentDidMount() {
    const {
      getSnapshots,
      getSizes,
      getRegions,
    } = this.context

    await Promise.all([
      getSnapshots(),
      getSizes(),
      getRegions(),
    ])
  }

  onPressBack = () => {
    const { setScreen } = this.context
    setScreen("Overview")
  }

  onPressCreateDroplet = () => {
    const { createDroplet } = this.context

    const {
      name,
      selectedSnapshot,
      selectedSize,
      selectedRegion,
    } = this.state

    createDroplet(
      name,
      selectedSnapshot,
      selectedSize,
      selectedRegion,
    )
  }

  onPressSnapshot = snapshot => {
    this.setState({
      selectedSnapshot: snapshot,
      selectedSize: undefined,
      selectedRegion: undefined,
    })
  }

  onPressSize = size => {
    this.setState({
      selectedSize: size,
      selectedRegion: undefined,
    })
  }

  onPressRegion = region => {
    this.setState({
      selectedRegion: region,
    })
  }

  render() {
    const {
      isLoadingSnapshots,
      snapshots,
      isLoadingSizes,
      sizes,
      isLoadingRegions,
      regions,
    } = this.context

    const { name } = this.state

    const {
      onPressBack,
      onPressCreateDroplet,
      renderSnapshot,
      renderSize,
      renderRegion,
    } = this

    return (
      <ScrollView
        style={styles.containerOuter}
        contentContainerStyle={styles.containerInner}
      >
        <IconButton onPress={onPressBack}>
          {Icons.longArrowAltLeft}
        </IconButton>
        <Header>Name</Header>
        <TextInput
          value={name}
          onChangeText={name => this.setState({ name })}
          style={styles.nameInput}
        />
        <Header>Snapshots</Header>
        <Blocks>
          {isLoadingSnapshots ? (
            <Loading>Loading snapshots...</Loading>
          ) : (
            snapshots.map(renderSnapshot)
          )}
        </Blocks>
        <Header>Sizes</Header>
        <Blocks>
          {isLoadingSizes ? (
            <Loading>Loading sizes...</Loading>
          ) : (
            sizes.map(renderSize)
          )}
        </Blocks>
        <Header>Regions</Header>
        <Blocks>
          {isLoadingRegions ? (
            <Loading>Loading regions...</Loading>
          ) : (
            regions.map(renderRegion)
          )}
        </Blocks>
        <TouchableOpacity onPress={onPressCreateDroplet}>
          <View style={styles.button}>
            <Text>Create droplet</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    )
  }

  renderSnapshot = snapshot => {
    const { selectedSnapshot } = this.state
    const { onPressSnapshot } = this

    return (
      <Block
        key={snapshot.id}
        onPress={() => onPressSnapshot(snapshot)}
        isHighlighted={
          selectedSnapshot &&
          selectedSnapshot.id === snapshot.id
        }
        label={snapshot.name}
      >
        <View style={styles.blockLine}>
          <Text style={styles.blockLineText}>
            requires {snapshot.min_disk_size}GB storage
          </Text>
        </View>
      </Block>
    )
  }

  renderSize = size => {
    const { selectedSnapshot, selectedSize } = this.state
    const { onPressSize } = this

    return (
      <Block
        key={size.slug}
        onPress={() => onPressSize(size)}
        isHighlighted={
          selectedSize && selectedSize.slug === size.slug
        }
        isDisabled={
          selectedSnapshot &&
          selectedSnapshot.min_disk_size > size.disk
        }
      >
        <View style={styles.blockLine}>
          <Text style={styles.blockLineText}>
            {size.vcpus}{" "}
            {size.vcpus == 1 ? "processor" : "processors"}
          </Text>
        </View>
        <View style={styles.blockLine}>
          <Text style={styles.blockLineText}>
            {size.memory >= 1024
              ? size.memory / 1024 + "GB "
              : size.memory + "MB "}
            memory
          </Text>
        </View>
        <View style={styles.blockLine}>
          <Text style={styles.blockLineText}>
            {size.disk}GB storage
          </Text>
        </View>
        <View style={styles.blockLine}>
          <Text style={styles.blockLineText}>
            ${size.price_monthly.toFixed(0)} per month
          </Text>
        </View>
      </Block>
    )
  }

  renderRegion = region => {
    const { selectedSize, selectedRegion } = this.state
    const { onPressRegion } = this

    return (
      <Block
        key={region.slug}
        label={region.name}
        onPress={() => onPressRegion(region)}
        isHighlighted={
          selectedRegion &&
          selectedRegion.slug === region.slug
        }
        isDisabled={
          selectedSize &&
          !selectedSize.regions.includes(region.slug)
        }
      />
    )
  }
}

export { CreateDroplet }
