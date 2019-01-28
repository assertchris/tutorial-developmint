import React from "react"
import PropTypes from "prop-types"
import Dialog from "react-native-dialog"

const DropletSnapshotPrompt = ({
  title,
  description,
  defaultValue,
  cancelButtonText,
  submitButtonText,
  isVisible,
  onChangeText,
  onCancel,
  onSubmit,
}) => {
  if (onChangeText) {
    onChangeText(defaultValue)
  }

  return (
    <Dialog.Container visible={isVisible}>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Description>{description}</Dialog.Description>
      <Dialog.Input
        defaultValue={defaultValue}
        onChangeText={onChangeText}
      />
      <Dialog.Button
        label={cancelButtonText}
        onPress={onCancel}
      />
      <Dialog.Button
        label={submitButtonText}
        onPress={onSubmit}
      />
    </Dialog.Container>
  )
}

DropletSnapshotPrompt.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  defaultValue: PropTypes.string,
  cancelButtonText: PropTypes.string,
  submitButtonText: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  onChangeText: PropTypes.func,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
}

DropletSnapshotPrompt.defaultProps = {
  title: "Create a snapshot",
  description: "What should the snapshot be called?",
  defaultValue: "my-snapshot",
  cancelButtonText: "Cancel",
  submitButtonText: "Ok",
  onChangeText: () => null,
  onCancel: () => null,
  onSubmit: () => null,
}

export { DropletSnapshotPrompt }
