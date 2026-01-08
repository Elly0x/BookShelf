import { View, Text, Image } from "react-native";
import { StarRating } from "@/components/star-rating";
import { useColors } from "@/hooks/use-colors";

export interface Review {
  id: string;
  authorName: string;
  authorAvatar?: string;
  rating: number;
  text: string;
  hasSpoiler?: boolean;
  createdAt?: string;
}

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const colors = useColors();

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <View
      className="bg-surface rounded-lg p-4 gap-3 border border-border"
      style={{ borderColor: colors.border }}
    >
      {/* Header com avatar e nome */}
      <View className="flex-row items-center gap-3">
        {review.authorAvatar ? (
          <Image
            source={{ uri: review.authorAvatar }}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <View
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: colors.primary + "30" }}
          >
            <Text className="font-bold text-primary">
              {review.authorName.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}

        <View className="flex-1">
          <Text className="font-semibold text-foreground">
            {review.authorName}
          </Text>
          <Text className="text-xs text-muted">
            {formatDate(review.createdAt)}
          </Text>
        </View>

        {review.hasSpoiler && (
          <View
            className="px-2 py-1 rounded"
            style={{ backgroundColor: colors.warning + "20" }}
          >
            <Text
              className="text-xs font-semibold"
              style={{ color: colors.warning }}
            >
              Spoiler
            </Text>
          </View>
        )}
      </View>

      {/* Rating */}
      <StarRating rating={review.rating} readonly />

      {/* Texto da resenha */}
      <Text className="text-sm text-foreground leading-relaxed">
        {review.text}
      </Text>
    </View>
  );
}
