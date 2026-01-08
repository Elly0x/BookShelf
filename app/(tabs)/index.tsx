import { ScrollView, View, Text, Pressable, FlatList, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { BookCard, Book } from "@/components/book-card";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useShelf } from "@/hooks/use-shelf";
import { BookStatus } from "@/lib/types";
import { useRouter } from "expo-router";

const STATUS_FILTERS: { label: string; value: BookStatus | "all" }[] = [
  { label: "Todos", value: "all" },
  { label: "Lendo", value: "reading" },
  { label: "Lidos", value: "read" },
  { label: "Desejo", value: "want" },
  { label: "Abandonados", value: "abandoned" },
];

// Mock data para demonstração
const MOCK_BOOKS: Book[] = [
  {
    id: "1",
    title: "O Senhor dos Anéis",
    author: "J.R.R. Tolkien",
    cover: "https://images-na.ssl-images-amazon.com/images/P/8595086702.01.L.jpg",
    rating: 4.8,
    status: "read" as const,
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    cover: "https://images-na.ssl-images-amazon.com/images/P/8535914840.01.L.jpg",
    rating: 4.5,
    status: "reading" as const,
  },
  {
    id: "3",
    title: "Fundação",
    author: "Isaac Asimov",
    cover: "https://images-na.ssl-images-amazon.com/images/P/8595086699.01.L.jpg",
    rating: 4.6,
    status: "want" as const,
  },
  {
    id: "4",
    title: "O Hobbit",
    author: "J.R.R. Tolkien",
    cover: "https://images-na.ssl-images-amazon.com/images/P/8595086710.01.L.jpg",
    rating: 4.7,
    status: "read" as const,
  },
  {
    id: "5",
    title: "Duna",
    author: "Frank Herbert",
    cover: "https://images-na.ssl-images-amazon.com/images/P/8595086753.01.L.jpg",
    rating: 4.4,
    status: "reading" as const,
  },
  {
    id: "6",
    title: "Neuromancer",
    author: "William Gibson",
    cover: "https://images-na.ssl-images-amazon.com/images/P/8595086761.01.L.jpg",
    rating: 4.3,
    status: "want" as const,
  },
];

export default function HomeScreen() {
  const colors = useColors();
  const router = useRouter();
  const { books, addBook, isLoading } = useShelf();
  const [activeFilter, setActiveFilter] = useState<BookStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayBooks, setDisplayBooks] = useState<Book[]>(MOCK_BOOKS);

  // Inicializar com mock data se não houver livros
  useEffect(() => {
    if (books.length === 0 && !isLoading) {
      MOCK_BOOKS.forEach((book) => {
        addBook({
          title: book.title,
          author: book.author,
          cover: book.cover,
          rating: book.rating,
          status: book.status,
        });
      });
    }
  }, [isLoading]);

  // Filtrar e buscar livros
  useEffect(() => {
    let filtered = books.length > 0 ? books : MOCK_BOOKS;

    if (activeFilter !== "all") {
      filtered = filtered.filter((book) => book.status === activeFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setDisplayBooks(filtered);
  }, [activeFilter, searchQuery, books]);

  return (
    <ScreenContainer className="flex-1 bg-background">
      <View className="flex-1">
        {/* Header */}
        <View className="px-4 pt-4 pb-2 gap-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-bold text-foreground">Minha Estante</Text>
            <Pressable
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            >
              <IconSymbol name="gear" size={24} color={colors.foreground} />
            </Pressable>
          </View>

          {/* Search Bar */}
          <View
            className="flex-row items-center px-3 py-2 rounded-lg gap-2"
            style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }}
          >
            <IconSymbol name="magnifyingglass" size={18} color={colors.muted} />
            <TextInput
              placeholder="Buscar livro..."
              placeholderTextColor={colors.muted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 text-foreground"
              style={{ color: colors.foreground }}
            />
          </View>
        </View>

        {/* Filtros */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4 py-2 gap-2"
          contentContainerStyle={{ gap: 8 }}
        >
          {STATUS_FILTERS.map((filter) => (
            <Pressable
              key={filter.value}
              onPress={() => setActiveFilter(filter.value)}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <View
                className="px-4 py-2 rounded-full"
                style={{
                  backgroundColor:
                    activeFilter === filter.value ? colors.primary : colors.surface,
                  borderColor: colors.border,
                  borderWidth: activeFilter === filter.value ? 0 : 1,
                }}
              >
                <Text
                  style={{
                    color:
                      activeFilter === filter.value ? colors.background : colors.foreground,
                    fontWeight: "600",
                  }}
                >
                  {filter.label}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        {/* Grid de Livros */}
        <View className="flex-1 px-4 py-4">
          {displayBooks.length > 0 ? (
            <FlatList
              data={displayBooks}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={{ gap: 16, justifyContent: "space-between" }}
              contentContainerStyle={{ gap: 16, paddingBottom: 20 }}
              renderItem={({ item }) => (
                <View className="flex-1">
                  <BookCard
                    book={item}
                    onPress={() => {}}
                    size="medium"
                  />
                </View>
              )}
              scrollEnabled={true}
            />
          ) : (
            <View className="flex-1 items-center justify-center gap-4">
              <IconSymbol name="book.fill" size={48} color={colors.muted} />
              <Text className="text-lg font-semibold text-foreground">
                Nenhum livro encontrado
              </Text>
              <Text className="text-sm text-muted text-center">
                Comece adicionando livros à sua estante
              </Text>
            </View>
          )}
        </View>

        {/* Botão Flutuante para Adicionar */}
        <Pressable
          onPress={() => {}}
          style={({ pressed }) => [
            {
              position: "absolute",
              bottom: 80,
              right: 16,
              opacity: pressed ? 0.8 : 1,
              transform: [{ scale: pressed ? 0.95 : 1 }],
            },
          ]}
        >
          <View
            className="w-14 h-14 rounded-full items-center justify-center shadow-lg"
            style={{ backgroundColor: colors.primary }}
          >
            <IconSymbol name="plus.circle.fill" size={32} color={colors.background} />
          </View>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}
