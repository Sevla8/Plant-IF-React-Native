import React, { useState } from "react";
import { StyleSheet, Text, SafeAreaView, Button, View } from "react-native";
import EmojiSelector from "react-native-emoji-selector";

export const EmojiPickerView = ({ navigation }) => {
  // In here we are soring our currently picked emoji.
  const [chosenEmoji, setEmoji] = useState(null);

  // This method will be called when our user selects an emoji
  const handleEmojiSelected = emoji => {
    setEmoji(emoji);
  };

  // This method will be called when our user wants to continue with
  // currently selected emoji - this method will do nothing if user
  // didn't pick an emoji.
  const handleContinueButton = () => {
    if (chosenEmoji !== null) {
      navigation.replace("Chat", { emoji: chosenEmoji });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.hint}>
          Pick an emoji that will represent you in the chat
        </Text>
        <View
          style={{
            ...styles.emojiContainer,
            ...(chosenEmoji === null ? styles.empty : {})
          }}
        >
          <Text style={styles.emoji}>{chosenEmoji || ""}</Text>
        </View>
        <Button
          // If user haven't chosen an emoji, we disable the continue button
          disabled={chosenEmoji === null}
          style={styles.continueButton}
          title="Continue"
          onPress={handleContinueButton}
        />
      </View>
      <View style={{ height: "50%" }}>
        <EmojiSelector onEmojiSelected={handleEmojiSelected} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  topContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "50%"
  },
  hint: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 32
  },
  continueButton: {
    marginVertical: 64,
    width: 300
  },
  emojiContainer: {
    width: 64,
    height: 64,
    marginVertical: 32
  },
  emoji: {
    width: "100%",
    height: "100%",
    fontSize: 60,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 60
  },
  empty: {
    borderWidth: 5,
    borderStyle: "dashed",
    borderColor: "rgba(0, 0, 0, 0.2)"
  }
});