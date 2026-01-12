import { Stack } from "expo-router"

export default function HomeRoutesLayout(){
    return (
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
        </Stack>
    )
}