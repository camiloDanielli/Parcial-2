import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Test() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        title="Go to Test"
        onPress={() => router.push("/(tabs)")}
      >
        ir home
      </TouchableOpacity>
    </View>
  );
}
