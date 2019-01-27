import React, { Component } from "react"
import { Text, View } from "react-native"

import { Context } from "../context"

const styles = {
  container: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
}

class Overview extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Overview</Text>
        <Context.Consumer>
          {({ token }) => <Text>{token}</Text>}
        </Context.Consumer>
      </View>
    )
  }
}

export { Overview }
