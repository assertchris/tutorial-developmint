import { AppRegistry } from "react-native"
import { name as appName } from "./app.json"
import { App } from "./source/app"

AppRegistry.registerComponent(appName, () => App)
