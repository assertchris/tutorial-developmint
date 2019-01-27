import React, { Component } from "react"
import { Text, View } from "react-native"

import { Context } from "../context"

const styles = {
  container: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "row",
    flexWrap: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  droplet: {
    width: 200,
    height: 200,
    flexShrink: 1,
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 4,
    backgroundColor: "#f0f0f0",
  },
  dropletName: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dropletNameText: {
    textAlign: "center",
    lineHeight: 27,
    fontSize: 18,
  },
}

class Overview extends Component {
  static contextType = Context

  async componentDidMount() {
    const { getDroplets } = this.context

    await getDroplets()
  }

  render() {
    const { droplets, isLoadingDroplets } = this.context

    return (
      <View style={styles.container}>
        {isLoadingDroplets ? (
          <Text>Loading droplets...</Text>
        ) : (
          droplets.map(this.renderDroplet)
        )}
      </View>
    )
  }

  renderDroplet = droplet => {
    return (
      <View key={droplet.id} style={styles.droplet}>
        <View style={styles.dropletNameText}>
          <Text style={styles.dropletNameText}>
            {droplet.name}
          </Text>
        </View>
      </View>
    )
  }
}

export { Overview }
