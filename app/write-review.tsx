import { ScrollView, View, Text, Pressable, TextInput, Switch } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { StarRating } from "@/components/star-rating";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

export default function WriteReviewScreen() {
  const colors = useColors();
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [hasSpoiler, setHasSpoiler] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0 || reviewText.trim().length === 0) {
      alert("Por favor, preencha a avaliação e o texto da resenha");
      return;
    }

    setIsSubmitting(true);
    // Simular envio
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Resenha publicada com sucesso!");
      router.back();
    }, 1000);
  };

  return (
    <ScreenContainer className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pt-4 pb-4 border-b" style={{ borderBottomColor: colors.border }}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <IconSymbol name="xmark" size={24} color={colors.foreground} />
          </Pressable>
          <Text className="text-lg font-semibold text-foreground">Escrever Resenha</Text>
          <View style={{ width: 24 }} />
        </View>

        <View className="px-4 py-6 gap-6">
          {/* Livro Info */}
          <View className="gap-2">
            <Text className="text-sm text-muted">Livro</Text>
            <Text className="text-base font-semibold text-foreground">O Senhor dos Anéis</Text>
            <Text className="text-sm text-muted">J.R.R. Tolkien</Text>
          </View>

          {/* Rating */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">Sua Avaliação</Text>
            <View className="flex-row gap-4 items-center">
              <StarRating rating={rating} onRatingChange={setRating} size={32} />
              {rating > 0 && (
                <Text className="text-sm text-muted">
                  {rating === 1 && "Não gostei"}
                  {rating === 2 && "Poderia ser melhor"}
                  {rating === 3 && "Bom"}
                  {rating === 4 && "Muito bom"}
                  {rating === 5 && "Excelente"}
                </Text>
              )}
            </View>
          </View>

          {/* Review Text */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">Sua Resenha</Text>
            <TextInput
              placeholder="Compartilhe sua opinião sobre o livro..."
              placeholderTextColor={colors.muted}
              value={reviewText}
              onChangeText={setReviewText}
              multiline
              numberOfLines={6}
              className="rounded-lg p-3 text-foreground"
              style={{
                backgroundColor: colors.surface,
                color: colors.foreground,
                borderColor: colors.border,
                borderWidth: 1,
                textAlignVertical: "top",
              }}
            />
            <Text className="text-xs text-muted text-right">
              {reviewText.length}/500
            </Text>
          </View>

          {/* Spoiler Toggle */}
          <View className="flex-row items-center justify-between py-3 px-3 rounded-lg" style={{ backgroundColor: colors.surface }}>
            <View className="gap-1">
              <Text className="text-sm font-semibold text-foreground">Contém Spoiler</Text>
              <Text className="text-xs text-muted">Avise outros leitores</Text>
            </View>
            <Switch
              value={hasSpoiler}
              onValueChange={setHasSpoiler}
              trackColor={{ false: colors.border, true: colors.primary + "50" }}
              thumbColor={hasSpoiler ? colors.primary : colors.muted}
            />
          </View>

          {/* Botões de Ação */}
          <View className="gap-3 pt-4">
            <Pressable
              onPress={handleSubmit}
              disabled={isSubmitting}
              style={({ pressed }) => [
                {
                  opacity: pressed || isSubmitting ? 0.8 : 1,
                },
              ]}
            >
              <View
                className="py-3 px-4 rounded-lg items-center"
                style={{ backgroundColor: colors.primary }}
              >
                <Text className="text-background font-semibold">
                  {isSubmitting ? "Publicando..." : "Publicar Resenha"}
                </Text>
              </View>
            </Pressable>

            <Pressable
              onPress={() => router.back()}
              disabled={isSubmitting}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            >
              <View
                className="py-3 px-4 rounded-lg items-center border"
                style={{ borderColor: colors.border }}
              >
                <Text className="text-foreground font-semibold">Cancelar</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
