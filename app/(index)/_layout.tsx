
import Button from "@/components/ui/button";
import { ListCreationProvider } from "@/context/ListCreationContext";
import ShoppingListsStore from "@/stores/ShoppingListsStore";
import { useUser } from "@clerk/clerk-expo";
import { Redirect, Stack, useRouter } from "expo-router";
import { Provider as TinyBaseProvider } from "tinybase/ui-react";

export default function HomeRoutesLayout(){
  const router = useRouter();
  const { user } = useUser();

  if(!user){
    return <Redirect href={"/(auth)"}/>;
  }
    return (
      <TinyBaseProvider>
        <ShoppingListsStore/>
      <ListCreationProvider>
        <Stack
        screenOptions={{
            ...(process.env.EXPO_OS !== "ios"
              ? {}
              : {
                  headerLargeTitle: true,
                  headerTransparent: true,
                  headerBlurEffect: "systemChromeMaterial",
                  headerLargeTitleShadowVisible: false,
                  headerShadowVisible: true,
                  headerLargeStyle: {
                    // NEW: Make the large title transparent to match the background.
                    backgroundColor: "transparent",
                  },
                }),
          }}>
            <Stack.Screen name="index" options={{headerTitle: "Lets Plan Shopping"}}/>
            <Stack.Screen name="list/new/index" options={{presentation: 'formSheet', sheetGrabberVisible: true, headerShown: false}}/>
            <Stack.Screen name="profile" options={{presentation: 'formSheet', sheetAllowedDetents:[0.75, 1], sheetGrabberVisible: true, headerShown: false}}/>
            <Stack.Screen name="list/new/scan" options={{presentation: 'fullScreenModal',  headerLargeTitleEnabled: false, headerTitle:"Scan QR Code", headerLeft: ()=>(<Button variant="ghost" onPress={()=> router.back()}>Cancel</Button>)}}/>
            <Stack.Screen
              name="emojiPicker"
              options={{
                presentation:"formSheet",
                headerLargeTitle: false,
                headerTitle: "Select Emoji",
                sheetAllowedDetents: [0.4, 0.75, 1],
                sheetGrabberVisible: true,
              }}
              />
            <Stack.Screen
              name="colorPicker"
              options={{
                presentation:"formSheet",
                headerLargeTitle: false,
                headerTitle: "Select Color",
                sheetAllowedDetents: [0.4, 0.75, 1],
                sheetGrabberVisible: true,
              }}
              />
        </Stack>
        </ListCreationProvider>
        </TinyBaseProvider>
    )
}