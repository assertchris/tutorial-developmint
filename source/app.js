import React, { Component } from "react"
import { AsyncStorage, View } from "react-native"

import Screens from "./screens"
import { Context } from "./context"

const styles = {
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
}

class App extends Component {
  state = {
    screen: "Connect",
    setScreen: screen => this.setState({ screen }),
    token: undefined,
    setToken: token => this.setState({ token }),
  }

  async componentDidMount() {
    const { setToken, setScreen } = this.state
    const token = await AsyncStorage.getItem("token")

    if (token) {
      setToken(token)
      setScreen("Overview")
    }
  }

  render() {
    const { state } = this
    const { screen } = state

    const Screen = Screens[screen]

    return (
      <View style={styles.container}>
        <Context.Provider value={state}>
          <Screen />
        </Context.Provider>
      </View>
    )
  }
}

export { App }
