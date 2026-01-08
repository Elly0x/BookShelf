import { ScrollView, View, Text, Pressable, TextInput, FlatList } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { BookCard, Book } from "@/components/book-card";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

// Mock data de livros disponíveis
const AVAILABLE_BOOKS: Book[] = [
  {
    id: "search-1",
    title: "O Código da Vinci",
    author: "Dan Brown",
    cover: "https://images-na.ssl-images-amazon.com/images/P/8532530788.01.L.jpg",
    rating: 4.2,
    status: "want",
  },
  {
    id: "search-2",
    title: "A Revolução dos Bichos",
    author: "George Orwell",
    cover: "https://images-na.ssl-images-amazon.com/images/P/8535902635.01.L.jpg",
    rating: 4.3,
    status: "want",
  },
  {
    id: "search-3",
    title: "O Príncipe",
    author: "Nicolau Maquiavel",
    cover: "https://images-na.ssl-images-amazon.com/images/P/8532524680.01.L.jpg",
    rating: 3.9,
    status: "want",
  },
  {
    id: "search-4",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    cover: "https://images-na.ssl-images-amazon.com/images/P/8532530788.01.L.jpg",
    rating: 4.6,
    status: "want",
  },
];

export default function AddBookScreen() {
  const colors = useColors();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim().length === 0) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    const results = AVAILABLE_BOOKS.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(results);
    setHasSearched(true);
  };

  const handleAddBook = (book: Book) => {
    alert(`"${book.title}" adicionado à sua estante!`);
    router.back();
  };

  return (
    <ScreenContainer className="flex-1 bg-background">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pt-4 pb-4 border-b" style={{ borderBottomColor: colors.border }}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <IconSymbol name="arrow.left" size={24} color={colors.foreground} />
          </Pressable>
          <Text className="text-lg font-semibold text-foreground">Adicionar Livro</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <View className="px-4 py-6 gap-4">
            {/* Abas */}
            <View className="flex-row gap-2">
              <Pressable
                style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1, flex: 1 }]}
              >
                <View
                  className="py-2 px-4 rounded-lg items-center"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Text className="text-background font-semibold text-sm">Buscar</Text>
                </View>
              </Pressable>
              <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1, flex: 1 }]}>
                <View
                  className="py-2 px-4 rounded-lg items-center border"
                  style={{ borderColor: colors.border }}
                >
                  <Text className="text-foreground font-semibold text-sm">Escanear</Text>
                </View>
              </Pressable>
            </View>

            {/* Search Bar */}
            <View className="gap-2">
              <View
                className="flex-row items-center px-3 py-2 rounded-lg gap-2"
                style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }}
              >
                <IconSymbol name="magnifyingglass" size={18} color={colors.muted} />
                <TextInput
                  placeholder="Título ou autor..."
                  placeholderTextColor={colors.muted}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  className="flex-1 text-foreground"
                  style={{ color: colors.foreground }}
                  onSubmitEditing={handleSearch}
                  returnKeyType="search"
                />
                {searchQuery.length > 0 && (
                  <Pressable onPress={() => setSearchQuery("")}>
                    <IconSymbol name="xmark" size={18} color={colors.muted} />
                  </Pressable>
                )}
              </View>

              <Pressable
                onPress={handleSearch}
                style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
              >
                <View
                  className="py-2 px-4 rounded-lg items-center"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Text className="text-background font-semibold">Buscar</Text>
                </View>
              </Pressable>
            </View>

            {/* Resultados */}
            {hasSearched && searchResults.length === 0 && (
              <View className="items-center gap-2 py-8">
                <IconSymbol name="magnifyingglass" size={32} color={colors.muted} />
                <Text className="text-foreground font-semibold">Nenhum livro encontrado</Text>
                <Text className="text-sm text-muted text-center">
                  Tente buscar por outro título ou autor
                </Text>
              </View>
            )}

            {searchResults.length > 0 && (
              <View className="gap-4">
                <Text className="text-sm text-muted">
                  {searchResults.length} resultado{searchResults.length !== 1 ? "s" : ""} encontrado
                  {searchResults.length !== 1 ? "s" : ""}
                </Text>

                {searchResults.map((book) => (
                  <View
                    key={book.id}
                    className="flex-row gap-3 p-3 rounded-lg"
                    style={{ backgroundColor: colors.surface }}
                  >
                    <View style={{ width: 80, height: 120 }}>
                      <BookCard book={book} size="small" />
                    </View>

                    <View className="flex-1 gap-2 justify-between">
                      <View>
                        <Text className="text-sm font-semibold text-foreground" numberOfLines={2}>
                          {book.title}
                        </Text>
                        <Text className="text-xs text-muted">{book.author}</Text>
                        {book.rating && (
                          <View className="flex-row items-center gap-1 mt-1">
                            <IconSymbol name="star.fill" size={12} color={colors.primary} />
                            <Text className="text-xs text-muted">{book.rating.toFixed(1)}</Text>
                          </View>
                        )}
                      </View>

                      <Pressable
                        onPress={() => handleAddBook(book)}
                        style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
                      >
                        <View
                          className="py-2 px-3 rounded items-center"
                          style={{ backgroundColor: colors.primary }}
                        >
                          <Text className="text-background font-semibold text-xs">
                            Adicionar
                          </Text>
                        </View>
                      </Pressable>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {!hasSearched && searchQuery.length === 0 && (
              <View className="items-center gap-4 py-12">
                <IconSymbol name="book.fill" size={48} color={colors.muted} />
                <View className="gap-2 items-center">
                  <Text className="text-foreground font-semibold">Busque por um livro</Text>
                  <Text className="text-sm text-muted text-center">
                    Digite o título ou nome do autor para encontrar livros
                  </Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}
