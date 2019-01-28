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

const request = async (token, method, url, data = {}) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }

  const formattedUrl = url
  const formattedBody = new FormData()

  const parameters = {
    method,
    headers,
  }

  if (method === "GET") {
    Object.keys(data).forEach(key => {
      const encoded = encodeURIComponent(data[key])
      formattedUrl += `${key}=${encoded}`
    })
  }

  if (method === "POST") {
    Object.keys(data).forEach(key => {
      formData.append(key, data[key])
    })

    parameters.body = formattedBody
  }

  return fetch(formattedUrl, parameters)
}

class App extends Component {
  state = {
    screen: "Connect",
    setScreen: screen => {
      this.setState({ screen })
    },
    token: undefined,
    setToken: token => {
      this.setState({ token })
    },
    droplets: [],
    isLoadingDroplets: false,
    getDroplets: async () => {
      const { token } = this.state

      this.setState({ isLoadingDroplets: true })

      const response = await request(
        token,
        "GET",
        "https://api.digitalocean.com/v2/droplets",
      )

      const result = await response.json()

      this.setState({
        droplets: result.droplets,
        isLoadingDroplets: false,
      })
    },
    selectedDroplet: undefined,
    setSelectedDroplet: selectedDroplet => {
      this.setState({ selectedDroplet })
    },
    snapshots: [],
    isLoadingSnapshots: false,
    getSnapshots: async () => {
      const { token } = this.state

      this.setState({ isLoadingSnapshots: true })

      const response = await request(
        token,
        "GET",
        "https://api.digitalocean.com/v2/snapshots",
      )

      const result = await response.json()

      this.setState({
        snapshots: result.snapshots,
        isLoadingSnapshots: false,
      })
    },
    selectedSnapshot: undefined,
    setSelectedSnapshot: selectedSnapshot => {
      this.setState({ selectedSnapshot })
    },
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
