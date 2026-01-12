import { useAuth } from "@clerk/clerk-expo";
import { Stack, Redirect } from "expo-router"

export default function AuthRoutesLayout(){

    const { isLoaded, isSignedIn } = useAuth();
    if(!isLoaded) return null;
    if(isSignedIn) return <Redirect href="/(index)" />;
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
          }}
        >
            <Stack.Screen name="index" options={{ headerTitle: "Sign in" }} />
            <Stack.Screen name="signUp" options={{ headerTitle: "Sign up" }} />
            <Stack.Screen name="resetPassword" options={{ headerTitle: "Reset password" }} />

        </Stack>
    )
}