import * as React from "react";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { ThemedText } from "@/components/ThemedText";
import { View } from "react-native";
import { useRouter, Link } from "expo-router";
import Button from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import {ClerkAPIError} from "@clerk/types"

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [errors, setErrors] = React.useState<ClerkAPIError[]>([]);
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSignIn, setIsSignIn] = React.useState(false);

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return;
    setIsSignIn(true);

    // Start sign-in steps
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign in is complete and we have session id
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(index)");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      if(isClerkAPIResponseError(error)) setErrors(error.errors);
    } finally {
      setIsSignIn(false);
    }
  }, [isLoaded, emailAddress, password]);
  return (
    <BodyScrollView
      contentContainerStyle={{
        padding: 16,
      }}
    >
      <TextInput
        label="Email Address"
        value={emailAddress}
        placeholder="Enter your email address"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmailAddress}
      />
      <TextInput
        value={password}
        label="Password"
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button
        onPress={onSignInPress}
        loading={isSignIn}
        disabled={!emailAddress || !password || isSignIn}
      >
        {" "}
        Sign In
      </Button>
      {errors.map((error) => (
          <ThemedText key={error.longMessage} style={{ color: "red" }}>
            {error.longMessage}
          </ThemedText>
        ))}
      <View style={{ marginTop: 16, alignItems: "center" }}>
        <ThemedText>Don't have an account?</ThemedText>
        <Button onPress={() => router.push("/signUp")} variant="ghost">
          Sign Up
        </Button>
      </View>
      <View style={{ marginTop: 16, alignItems: "center" }}>
        <ThemedText>Forgot password?</ThemedText>
        <Button onPress={() => router.push("/resetPassword")} variant="ghost">
          Reset password
        </Button>
      </View>
    </BodyScrollView>
  );
}
