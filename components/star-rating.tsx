import { View, Pressable } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  size?: number;
  readonly?: boolean;
}

export function StarRating({
  rating,
  onRatingChange,
  size = 24,
  readonly = false,
}: StarRatingProps) {
  const colors = useColors();

  return (
    <View className="flex-row gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <Pressable
          key={star}
          onPress={() => !readonly && onRatingChange?.(star)}
          disabled={readonly}
          style={({ pressed }) => [
            {
              opacity: pressed && !readonly ? 0.7 : 1,
            },
          ]}
        >
          <IconSymbol
            name={star <= rating ? "star.fill" : "star"}
            size={size}
            color={star <= rating ? colors.primary : colors.border}
          />
        </Pressable>
      ))}
    </View>
  );
}
