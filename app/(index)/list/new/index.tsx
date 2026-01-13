import React, { useMemo, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { IconCircle } from "@/components/IconCircle";
import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";

import { backgroundColors, emojies } from "@/constants/Colors";

export default function NewListScreen() {
    const [listId, setListId] = useState("");
    const randomEmoji = useMemo(
        () => emojies[Math.floor(Math.random() * emojies.length)],
        []
      );
    
      const randomColor = useMemo(
        () => backgroundColors[Math.floor(Math.random() * backgroundColors.length)],
        []
      );
  return (
    <BodyScrollView
      contentContainerStyle={{
        padding: 16,
        marginTop:32
      }}
    >
      <View
        style={{
          alignItems: "center",
          gap: 16,
        }}
      >
        <IconCircle
          emoji={randomEmoji}
          size={60}
          backgroundColor={randomColor}
        />
        <ThemedText type="subtitle">Create Together</ThemedText>
        <ThemedText type="defaultSemiBold" style={{color:"gray", textAlign:"center"}}>
          Shopping is boring alone. Share your list with your loved ones.
        </ThemedText>
      </View>
      <View style={styles.actionSection}>
          <Button onPress={() => handleDismissTo("/list/new/create")}>
            Create new list
          </Button>

          <View style={styles.divider}>
            <View style={styles.line} />
            <ThemedText type="default" style={styles.orText}>
              or join existing
            </ThemedText>
            <View style={styles.line} />
          </View>
          <View style={{gap:16}}>
            <Button>Create new list</Button>
            <View style={{
                flexDirection:"row",
                alignItems:"center",
                gap:"16"
            }}>
                <View style={styles.line}>
                    <ThemedText style={{color: 'gray'}}>Or join existing</ThemedText>
                </View>

            </View>
          </View>
          </View>
    </BodyScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: 16,
    marginBottom: 100,
  },
  container: {
    gap: 32,
  },
  heroSection: {
    alignItems: "center",
    gap: 16,
    marginTop: 32,
  },
  iconCircle: {
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "gray",
    paddingHorizontal: 24,
    lineHeight: 24,
  },
  actionSection: {
    gap: 24,
  },
  buttonIcon: {
    marginRight: 8,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(150, 150, 150, 0.2)",
  },
  orText: {
    color: "gray",
  },
  joinSection: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  textInput: {
    flex: 1,
  },
  qrButton: {
    marginBottom: 16,
  },
  joinButton: {
    marginTop: 8,
  },
});
