import { ScrollView, View, Text, Pressable, Image } from "react-native";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { StarRating } from "@/components/star-rating";
import { ReviewCard, Review } from "@/components/review-card";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

// Mock data para demonstração
const BOOK_DETAILS = {
  id: "1",
  title: "O Senhor dos Anéis",
  author: "J.R.R. Tolkien",
  cover: "https://images-na.ssl-images-amazon.com/images/P/8595086702.01.L.jpg",
  description:
    "Uma épica jornada pela Terra Média. Frodo Bolseiro herda um anel misterioso de seu tio Bilbo. Gandalf, um mago cinzento, revela que é o Um Anel, um artefato de poder imenso criado pelo Senhor do Escuro. Para salvar a Terra Média, Frodo deve destruir o anel nas chamas do Monte da Perdição.",
  isbn: "978-8595086702",
  publisher: "Intrínseca",
  publishedYear: 1954,
  pages: 1178,
  genres: ["Fantasia", "Aventura", "Clássico"],
  rating: 4.8,
  status: "read" as const,
};

const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    authorName: "Maria Silva",
    rating: 5,
    text: "Simplesmente perfeito! Uma obra-prima que merecia ser lida por todos. A narrativa é envolvente do início ao fim.",
    hasSpoiler: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    authorName: "João Santos",
    rating: 4,
    text: "Muito bom! Recomendo especialmente para quem gosta de fantasia épica. Alguns trechos são um pouco densos.",
    hasSpoiler: false,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export default function BookDetailScreen() {
  const colors = useColors();
  const router = useRouter();
  const params = useLocalSearchParams();
  const [userRating, setUserRating] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <ScreenContainer className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header com botão voltar */}
        <View className="flex-row items-center px-4 pt-4 pb-2 gap-3">
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <IconSymbol name="arrow.left" size={24} color={colors.foreground} />
          </Pressable>
          <Text className="text-lg font-semibold text-foreground flex-1">Detalhes do Livro</Text>
          <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}>
            <IconSymbol name="ellipsis" size={24} color={colors.foreground} />
          </Pressable>
        </View>

        {/* Capa do Livro */}
        <View className="px-4 py-6 items-center">
          <Image
            source={{ uri: BOOK_DETAILS.cover }}
            style={{
              width: 180,
              height: 260,
              borderRadius: 12,
            }}
            resizeMode="cover"
          />
        </View>

        {/* Informações Básicas */}
        <View className="px-4 gap-2">
          <Text className="text-2xl font-bold text-foreground">{BOOK_DETAILS.title}</Text>
          <Text className="text-base text-muted">{BOOK_DETAILS.author}</Text>

          {/* Rating */}
          <View className="flex-row items-center gap-2 mt-2">
            <StarRating rating={Math.round(BOOK_DETAILS.rating)} readonly size={20} />
            <Text className="text-sm text-muted">
              {BOOK_DETAILS.rating.toFixed(1)} ({MOCK_REVIEWS.length} resenhas)
            </Text>
          </View>
        </View>

        {/* Botões de Ação */}
        <View className="px-4 py-4 flex-row gap-3">
          <Pressable
            onPress={() => setIsLiked(!isLiked)}
            style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1, flex: 1 }]}
          >
            <View
              className="py-3 px-4 rounded-lg items-center flex-row justify-center gap-2"
              style={{
                backgroundColor: isLiked ? colors.primary + "20" : colors.surface,
              }}
            >
              <IconSymbol
                name={isLiked ? "heart.fill" : "heart"}
                size={20}
                color={isLiked ? colors.primary : colors.foreground}
              />
              <Text
                style={{
                  color: isLiked ? colors.primary : colors.foreground,
                  fontWeight: "600",
                }}
              >
                {isLiked ? "Salvo" : "Salvar"}
              </Text>
            </View>
          </Pressable>

          <Pressable
            style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1, flex: 1 }]}
          >
            <View
              className="py-3 px-4 rounded-lg items-center flex-row justify-center gap-2"
              style={{ backgroundColor: colors.primary }}
            >
              <IconSymbol name="star.fill" size={20} color={colors.background} />
              <Text className="text-background font-semibold">Avaliar</Text>
            </View>
          </Pressable>
        </View>

        {/* Sinopse */}
        <View className="px-4 py-4 gap-2">
          <Text className="text-lg font-semibold text-foreground">Sinopse</Text>
          <Text className="text-sm text-foreground leading-relaxed">
            {BOOK_DETAILS.description}
          </Text>
        </View>

        {/* Informações do Livro */}
        <View className="px-4 py-4 gap-3">
          <Text className="text-lg font-semibold text-foreground">Informações</Text>

          <View className="gap-2">
            {[
              { label: "Editora", value: BOOK_DETAILS.publisher },
              { label: "Ano", value: BOOK_DETAILS.publishedYear.toString() },
              { label: "Páginas", value: BOOK_DETAILS.pages.toString() },
              { label: "ISBN", value: BOOK_DETAILS.isbn },
            ].map((info, index) => (
              <View key={index} className="flex-row justify-between py-2 border-b" style={{ borderBottomColor: colors.border }}>
                <Text className="text-sm text-muted">{info.label}</Text>
                <Text className="text-sm font-medium text-foreground">{info.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Gêneros */}
        <View className="px-4 py-4 gap-2">
          <Text className="text-lg font-semibold text-foreground">Gêneros</Text>
          <View className="flex-row flex-wrap gap-2">
            {BOOK_DETAILS.genres.map((genre, index) => (
              <View
                key={index}
                className="px-3 py-1 rounded-full"
                style={{ backgroundColor: colors.primary + "20" }}
              >
                <Text style={{ color: colors.primary, fontSize: 12, fontWeight: "500" }}>
                  {genre}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Resenhas */}
        <View className="px-4 py-6 gap-3">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-foreground">Resenhas</Text>
            <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}>
              <Text style={{ color: colors.primary, fontWeight: "600", fontSize: 14 }}>
                Ver todas
              </Text>
            </Pressable>
          </View>

          {MOCK_REVIEWS.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </View>

        {/* Botão para escrever resenha */}
        <View className="px-4 pb-8">
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <View
              className="py-3 px-4 rounded-lg items-center border-2"
              style={{ borderColor: colors.primary }}
            >
              <Text style={{ color: colors.primary, fontWeight: "600" }}>
                Escrever Resenha
              </Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
