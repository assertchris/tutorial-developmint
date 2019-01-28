import React, { Component } from "react"
import { AsyncStorage, View } from "react-native"

import Screens from "./screens"
import { Context } from "./context"
import { DropletSnapshotPrompt } from "./components"
import { DO_PREFIX } from "../config"

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
      formattedBody.append(key, data[key])
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
        `${DO_PREFIX}/droplets`,
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
    isCreatingSnapshot: false,
    getSnapshots: async () => {
      const { token, snapshots } = this.state

      this.setState({ isLoadingSnapshots: true })

      const response = await request(
        token,
        "GET",
        `${DO_PREFIX}/snapshots`,
      )

      const result = await response.json()

      const newState = {
        snapshots: result.snapshots,
        isLoadingSnapshots: false,
      }

      if (result.snapshots.length !== snapshots.length) {
        newState.isCreatingSnapshot = false
      }

      this.setState(newState)
    },
    selectedSnapshot: undefined,
    setSelectedSnapshot: selectedSnapshot => {
      this.setState({ selectedSnapshot })
    },
    isCreatingSnapshotOf: undefined,
    setIsCreatingSnapshotOf: isCreatingSnapshotOf => {
      this.setState({ isCreatingSnapshotOf })
    },
    createSnapshot: async (droplet, snapshotName) => {
      const { token } = this.state

      this.setState({ isCreatingSnapshot: true })

      const response = await request(
        token,
        "POST",
        `${DO_PREFIX}/droplets/${droplet.id}/actions`,
        {
          type: "snapshot",
          name: snapshotName,
        },
      )

      const result = await response.json()

      console.log("(mint)", JSON.stringify(result))
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

    const {
      screen,
      isCreatingSnapshotOf,
      setIsCreatingSnapshotOf,
      createSnapshot,
    } = state

    const Screen = Screens[screen]

    return (
      <View style={styles.container}>
        <Context.Provider value={state}>
          <Screen />
          <DropletSnapshotPrompt
            isVisible={isCreatingSnapshotOf !== undefined}
            onChangeText={name => {
              this.snapshotName = name
            }}
            onCancel={() => {
              setIsCreatingSnapshotOf(undefined)
            }}
            onSubmit={() => {
              createSnapshot(
                isCreatingSnapshotOf,
                this.snapshotName,
              )
              setIsCreatingSnapshotOf(undefined)
            }}
          />
        </Context.Provider>
      </View>
    )
  }
}

export { App }
