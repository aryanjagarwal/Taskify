import { Stack } from "expo-router";
import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo";
import tokenCache from "@/utils/cache";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ConvexReactClient, ConvexProvider } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <ClerkLoaded>
          <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen
                name="(auth)/sign-in"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="welcome" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="account" options={{ headerShown: false }} />
              <Stack.Screen name="support" options={{ headerShown: false }} />
            </Stack>
          </ConvexProviderWithClerk>
        </ClerkLoaded>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
}
