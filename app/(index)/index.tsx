import React from "react";
import * as Haptics from "expo-haptics";
import { Stack, useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText"
import Button from "@/components/ui/button"
import { Pressable, View } from "react-native"
import { useClerk } from "@clerk/clerk-expo"
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { appleBlue } from "@/constants/Colors";

export default function HomeScreen() {
  const router = useRouter();
  const { signOut } = useClerk();

  const renderHeaderRight = () => {
    return(
      <Pressable onPress={()=> router.push("/list/new")}>
        <IconSymbol name="plus" color={appleBlue}/>
      </Pressable>
    )
  }
  const renderHeaderLeft = () => {
    return(
      <Pressable onPress={() => router.push("/profile")}>
        <IconSymbol name="gear" color={appleBlue}/>
      </Pressable>
    )
  }
  return (
    <>
    <Stack.Screen
      options={{
        title: "Lets Shop",
        headerRight: renderHeaderRight,
        headerLeft: renderHeaderLeft
      }}
    >
    <BodyScrollView contentContainerStyle={{padding:16}}>
      <ThemedText type="title">Home</ThemedText>
      <Button onPress={signOut}>Log out</Button>
    </BodyScrollView>
    </Stack.Screen>
    </>
  )
}