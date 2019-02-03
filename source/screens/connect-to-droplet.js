import React, { Component } from "react"

import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"

import { Icons } from "react-native-fontawesome"
import SSHClient from "react-native-ssh-sftp"

import { Context } from "../context"
import { IconButton } from "../components"

const styles = {
  container: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerOuter: {
    backgroundColor: "#fff",
    flex: 1,
  },
  containerInner: {
    padding: 125,
    alignItems: "flex-start",
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
  input: {
    width: 400,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    borderRadius: 4,
    backgroundColor: "#f5f5f5",
    fontSize: 20,
    padding: 10,
  },
}

class ConnectToDroplet extends Component {
  static contextType = Context

  state = {
    isConnected: false,
    error: undefined,
    username: undefined,
    password: undefined,
    lines: [],
    command: undefined,
  }

  onPressBack = () => {
    const { setScreen } = this.context
    setScreen("Overview")
  }

  onPressConnect = () => {
    const { username, password } = this.state
    const { dropletAddress } = this.context

    const client = new SSHClient(
      dropletAddress,
      22,
      username,
      password,
      error => {
        if (error) {
          this.setState({ error })
        } else {
          this.client = client
          this.setState({ isConnected: true })
        }
      },
    )
  }

  onPressRun = () => {
    const { command } = this.state

    this.client.execute(command, (error, output) => {
      if (error) {
        this.setState(({ lines }) => ({
          lines: [
            ...lines,
            ...error.message.split("\n"),
          ].slice(-100),
        }))
      } else {
        this.setState(({ lines }) => ({
          lines: [...lines, ...output.split("\n")].slice(
            -100,
          ),
        }))
      }
    })
  }

  render() {
    const { isConnected } = this.state
    const { onPressBack } = this

    return (
      <View style={styles.container}>
        <IconButton onPress={onPressBack}>
          {Icons.longArrowAltLeft}
        </IconButton>
        {isConnected
          ? this.renderTerminal()
          : this.renderLogin()}
      </View>
    )
  }

  renderTerminal = () => {
    const { dropletAddress } = this.context
    const { lines } = this.state
    const { onPressRun } = this

    return (
      <ScrollView
        style={styles.containerOuter}
        contentContainerStyle={styles.containerInner}
        ref={scrollView => (this.scrollView = scrollView)}
        onContentSizeChange={() => {
          this.scrollView.scrollToEnd({ animated: true })
        }}
      >
        <Text>Connected to: {dropletAddress}</Text>
        {lines.map(this.renderLine)}
        <TextInput
          onChangeText={command =>
            this.setState({ command })
          }
          style={styles.input}
          autoCapitalize={"none"}
          autoCorrect={false}
          onSubmitEditing={onPressRun}
        />
      </ScrollView>
    )
  }

  renderLine = (line, i) => {
    return (
      <View key={i + line}>
        <Text>{line}</Text>
      </View>
    )
  }

  renderLogin = () => {
    const { error } = this.state
    const { onPressConnect } = this

    return (
      <View>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}
        <TextInput
          onChangeText={username =>
            this.setState({ username })
          }
          style={styles.input}
          autoCapitalize={"none"}
          autoCorrect={false}
        />
        <TextInput
          onChangeText={password =>
            this.setState({ password })
          }
          style={styles.input}
          autoCapitalize={"none"}
          autoCorrect={false}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={onPressConnect}>
          <View style={styles.button}>
            <Text>Connect to droplet</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export { ConnectToDroplet }
