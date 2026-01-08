import { View, Text, Image } from "react-native";
import { useColors } from "@/hooks/use-colors";

interface UserAvatarProps {
  name: string;
  avatar?: string;
  size?: number;
}

export function UserAvatar({ name, avatar, size = 48 }: UserAvatarProps) {
  const colors = useColors();

  const initials = name
    .split(" ")
    .map((n) => n.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);

  if (avatar) {
    return (
      <Image
        source={{ uri: avatar }}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
        }}
      />
    );
  }

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: colors.primary + "30",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: colors.primary,
          fontSize: size * 0.4,
          fontWeight: "600",
        }}
      >
        {initials}
      </Text>
    </View>
  );
}
