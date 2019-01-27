import React, { Component } from "react"

import {
  AsyncStorage,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

import { Context } from "../context"

import {
  DO_AUTH_URI,
  DO_CLIENT_ID,
  DO_CLIENT_SECRET,
  DO_REDIRECT_URI,
} from "../../config"

const styles = {
  container: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 4,
    backgroundColor: "#f0f0f0",
  },
  errorText: {
    color: "red",
  },
}

class Connect extends Component {
  static contextType = Context

  state = {
    error: undefined,
  }

  componentDidMount() {
    Linking.addEventListener("url", this.onOpenUrl)
  }

  componentWillUnmount() {
    Linking.removeEventListener("url", this.onOpenUrl)
  }

  onOpenUrl = async ({ url }) => {
    const { setToken, setScreen } = this.context
    const { setState } = this

    const matchedCode = url.match(/code=(.*)$/)

    if (matchedCode) {
      const code = matchedCode[1]

      const formattedUrl = `https://cloud.digitalocean.com/v1/oauth/token?grant_type=authorization_code&code=${code}&client_id=${DO_CLIENT_ID}&client_secret=${DO_CLIENT_SECRET}&redirect_uri=${DO_REDIRECT_URI}`

      console.log("(mint)", formattedUrl)

      const response = await fetch(formattedUrl, {
        method: "POST",
      })

      const result = await response.json()

      if (result.access_token) {
        const token = result.access_token

        await AsyncStorage.setItem("token", token)

        setToken(token)
        setScreen("Overview")
        return
      }
    }

    setState.call(this, {
      error: "Could not connect, please try again",
    })
  }

  onPressConnect = () => {
    const uri = `${DO_AUTH_URI}?client_id=${DO_CLIENT_ID}&redirect_uri=${DO_REDIRECT_URI}&response_type=code&scope=read+write`

    Linking.openURL(uri).catch(error => {
      console.error(error)
    })
  }

  render() {
    const { error } = this.state
    const { onPressConnect } = this

    return (
      <View style={styles.container}>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}
        <TouchableOpacity onPress={onPressConnect}>
          <View style={styles.button}>
            <Text>Connect to Digital Ocean</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export { Connect }
