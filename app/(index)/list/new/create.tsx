import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { appleBlue, backgroundColors, emojies } from "@/constants/Colors";
import { useListCreation } from "@/context/ListCreationContext";
//import { useAddShoppingListCallback } from "@/stores/ShoppingListsStore";
import { Link, Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function NewListScreen (){
    const [ listName, setListName] = useState("");
    const [ listDescription, setListDescription] = useState("");
    const { selectedEmoji, setSelectedEmoji, selectedColor, setSelectedColor } =
    useListCreation();

    const router = useRouter();
    //const useAddShoppingList = useAddShoppingListCallback();


    const handleCreateList = () => {
    if (!listName) {
      return;
    }

    useEffect(() => {
    setSelectedEmoji(emojies[Math.floor(Math.random() * emojies.length)]);
    setSelectedColor(
      backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
    );

    // Cleanup function to reset context when unmounting
    return () => {
      setSelectedEmoji("");
      setSelectedColor("");
    };
  }, []);
    /*
    const listId = useAddShoppingList(
      listName,
      listDescription,
      selectedEmoji,
      selectedColor
    );
    */

    router.replace({
      pathname: "/(index)/colorPicker",
      //params: { listId },
    });
  };
    return(
        <>
        <Stack.Screen 
        options={{
            headerTitle:"New list",
            headerLargeTitle: false
        }}
        />
        <BodyScrollView contentContainerStyle={styles.scrollViewContent}>
           <View style={styles.inputContainer}>
            <TextInput
            placeholder="Common Grocery"
            size="lg"
            variant="ghost"
            value={listName}
            onChangeText={setListName}
            returnKeyType="done"
            autoFocus
            inputStyle={styles.titleInput}
            containerStyle={styles.inputContainer}
            />
            <Link href={{pathname:"/"}} style={[styles.emojiButton, {borderColor: selectedColor}]}>
            <View style={styles.emojiContainer}>
                <Text>{selectedEmoji}</Text>
            </View>

            </Link>  
            <Link href={{pathname:"/"}} style={[styles.emojiButton, {borderColor: selectedColor}]}>
            <View style={styles.colorContainer}>
                <View
                style={{
                    width:24,
                    height: 24,
                    borderRadius: 100,
                    backgroundColor: selectedColor,
                }}/>
            </View>

            </Link>  
           </View>
            <TextInput
            placeholder="Description (optional)"
          value={listDescription}
          onChangeText={setListDescription}
          onSubmitEditing={handleCreateList}
          returnKeyType="done"
          variant="ghost"
          inputStyle={styles.descriptionInput}
            />
            <Button
            onPress={handleCreateList}
            disabled={!listName}
            variant="ghost"
            textStyle={styles.createButtonText}
            >
              Create List
            </Button>
        </BodyScrollView>
        </>
    )
}

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  titleInput: {
    fontWeight: "600",
    fontSize: 28,
    padding: 0,
  },
  titleInputContainer: {
    flexGrow: 1,
    flexShrink: 1,
    maxWidth: "auto",
    marginBottom: 0,
  },
  emojiButton: {
    padding: 1,
    borderWidth: 3,
    borderRadius: 100,
  },
  emojiContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  descriptionInput: {
    padding: 0,
  },
  createButtonText: {
    color: appleBlue,
    fontWeight: "normal",
  },
  colorButton: {
    padding: 1,
    borderWidth: 3,
    borderRadius: 100,
  },
  colorContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
});