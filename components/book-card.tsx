import { View, Text, Pressable, Image } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  rating?: number;
  status: "reading" | "read" | "want" | "abandoned";
}

interface BookCardProps {
  book: Book;
  onPress?: () => void;
  size?: "small" | "medium" | "large";
}

export function BookCard({ book, onPress, size = "medium" }: BookCardProps) {
  const colors = useColors();

  const sizeStyles = {
    small: "w-24 h-32",
    medium: "w-28 h-40",
    large: "w-32 h-48",
  };

  const statusColors = {
    reading: colors.info,
    read: colors.success,
    want: colors.primary,
    abandoned: colors.muted,
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      className="gap-2"
    >
      <View className={cn("rounded-lg overflow-hidden bg-surface", sizeStyles[size])}>
        <Image
          source={{ uri: book.cover }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      <View className="gap-1">
        <Text
          className="text-xs font-semibold text-foreground"
          numberOfLines={2}
        >
          {book.title}
        </Text>
        <Text className="text-xs text-muted" numberOfLines={1}>
          {book.author}
        </Text>

        {book.rating && (
          <View className="flex-row items-center gap-1">
            <IconSymbol
              name="star.fill"
              size={12}
              color={colors.primary}
            />
            <Text className="text-xs text-muted">{book.rating.toFixed(1)}</Text>
          </View>
        )}

        {book.status && (
          <View
            className="px-2 py-1 rounded-full self-start"
            style={{ backgroundColor: statusColors[book.status] + "20" }}
          >
            <Text
              className="text-xs font-medium"
              style={{ color: statusColors[book.status] }}
            >
              {book.status === "reading"
                ? "Lendo"
                : book.status === "read"
                  ? "Lido"
                  : book.status === "want"
                    ? "Desejo"
                    : "Abandonado"}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}
