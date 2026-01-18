import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { isClerkAPIResponseError, useSignUp } from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
import { useRouter } from "expo-router";
import * as React from "react";

export default function SignUpScreen() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [errors, setErrors] = React.useState<ClerkAPIError[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSignUpPress = async() => {
    if (!isLoaded) return;
    setIsLoading(true);

    setErrors([]);

    try {
        await signUp.create({
            emailAddress,
            password
        })
        //Confirmation
        await signUp.prepareEmailAddressVerification({
            strategy: "email_code"
        })
        setPendingVerification(true);
    } catch (error) {
        if (isClerkAPIResponseError(error)) {
            setErrors(error.errors);
        }
        console.error("Sign up error:", JSON.stringify(error, null, 2));
    } finally{
        setIsLoading(false)
    }
  };
  const onVerifyPress = async() => {
    if(!isLoaded) return;
    setIsLoading(true);
    setErrors([]);

    try {
        const signUpAttempt = await signUp.attemptEmailAddressVerification({
            code,
        })
        if (signUpAttempt.status ==='complete'){
            await setActive({session: signUpAttempt.createdSessionId})
            router.replace("/")
        }else{
            console.log(signUpAttempt)
        }
    } catch (error) {
        if (isClerkAPIResponseError(error)) {
            setErrors(error.errors);
        }
        console.error("Verification error:", JSON.stringify(error, null, 2));
    }finally{
        setIsLoading(false)
    }
  };

  if (pendingVerification) {
    return (
      <BodyScrollView contentContainerStyle={{ padding: 16 }}>
        <ThemedText style={{ marginBottom: 16 }}>
          Enter the verification code sent to {emailAddress}
        </ThemedText>
        <TextInput 
          value={code} 
          placeholder="Enter verification code"
          keyboardType="number-pad"
          onChangeText={setCode}
        />
        <Button
          onPress={onVerifyPress}
          disabled={!code || isLoading}
          loading={isLoading}
        >
          Verify
        </Button>
        {errors.map((error) => (
          <ThemedText key={error.longMessage} style={{ color: "red" }}>
            {error.longMessage}
          </ThemedText>
        ))}
      </BodyScrollView>
    );
  }

  return (
    <BodyScrollView contentContainerStyle={{ padding: 16 }}>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        keyboardType="email-address"
        onChangeText={(email) => setEmailAddress(email)}
      />
      <TextInput
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button
        onPress={onSignUpPress}
        disabled={!emailAddress || !password || isLoading}
        loading={isLoading}
      >
        Continue
      </Button>
      {errors.map((error) => (
        <ThemedText key={error.longMessage} style={{ color: "red" }}>
          {error.longMessage}
        </ThemedText>
      ))}
    </BodyScrollView>
  );
}
