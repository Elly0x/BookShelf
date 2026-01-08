import { ScrollView, View, Text, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { BookCard, Book } from "@/components/book-card";
import { ReviewCard, Review } from "@/components/review-card";
import { useColors } from "@/hooks/use-colors";

// Mock data para livros em alta
const TOP_BOOKS: Book[] = [
  {
    id: "top-1",
    title: "O Código da Vinci",
    author: "Dan Brown",
    cover: "https://images-na.ssl-images-amazon.com/images/P/8532530788.01.L.jpg",
    rating: 4.2,
    status: "read",
  },
  {
    id: "top-2",
    title: "A Revolução dos Bichos",
    author: "George Orwell",
    cover: "https://images-na.ssl-images-amazon.com/images/P/8535902635.01.L.jpg",
    rating: 4.3,
    status: "read",
  },
  {
    id: "top-3",
    title: "O Príncipe",
    author: "Nicolau Maquiavel",
    cover: "https://images-na.ssl-images-amazon.com/images/P/8532524680.01.L.jpg",
    rating: 3.9,
    status: "want",
  },
];

// Mock data para resenhas recentes
const RECENT_REVIEWS: Review[] = [
  {
    id: "review-1",
    authorName: "Maria Silva",
    rating: 5,
    text: "Simplesmente perfeito! Uma obra-prima que merecia ser lida por todos. A narrativa é envolvente do início ao fim.",
    hasSpoiler: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "review-2",
    authorName: "João Santos",
    rating: 4,
    text: "Muito bom! Recomendo especialmente para quem gosta de ficção científica. Alguns trechos são um pouco densos, mas vale a pena.",
    hasSpoiler: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "review-3",
    authorName: "Ana Costa",
    rating: 4,
    text: "Adorei! Muito criativo e bem escrito. Recomendo para leitores que gostam de histórias com reviravoltas.",
    hasSpoiler: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export default function ExploreScreen() {
  const colors = useColors();

  return (
    <ScreenContainer className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header */}
        <View className="px-4 pt-4 pb-2">
          <Text className="text-2xl font-bold text-foreground">Explorar</Text>
          <Text className="text-sm text-muted mt-1">Descubra novos livros e resenhas</Text>
        </View>

        {/* Seção: Livros em Alta */}
        <View className="mt-6 gap-3">
          <View className="px-4">
            <Text className="text-lg font-semibold text-foreground">Em Alta</Text>
          </View>

          <FlatList
            horizontal
            data={TOP_BOOKS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="px-2">
                <BookCard book={item} size="medium" />
              </View>
            )}
            contentContainerStyle={{ paddingHorizontal: 12 }}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
          />
        </View>

        {/* Seção: Recomendações */}
        <View className="mt-6 gap-3">
          <View className="px-4">
            <Text className="text-lg font-semibold text-foreground">Recomendações para Você</Text>
            <Text className="text-xs text-muted mt-1">Baseado no seu histórico de leitura</Text>
          </View>

          <FlatList
            horizontal
            data={TOP_BOOKS.slice(0, 2)}
            keyExtractor={(item) => `rec-${item.id}`}
            renderItem={({ item }) => (
              <View className="px-2">
                <BookCard book={item} size="medium" />
              </View>
            )}
            contentContainerStyle={{ paddingHorizontal: 12 }}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
          />
        </View>

        {/* Seção: Resenhas Recentes */}
        <View className="mt-6 gap-3 px-4 pb-6">
          <Text className="text-lg font-semibold text-foreground">Resenhas da Comunidade</Text>

          {RECENT_REVIEWS.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
