import { Alert } from "react-native"

const confirmCancelButton = () => ({
  text: "Cancel",
  style: "cancel",
})

const confirmOkButton = onPress => ({
  text: "Ok",
  onPress,
})

export const confirm = (title, description, onPress) => {
  Alert.alert(
    title,
    description,
    [confirmCancelButton(), confirmOkButton(onPress)],
    {
      cancelable: false,
    },
  )
}
