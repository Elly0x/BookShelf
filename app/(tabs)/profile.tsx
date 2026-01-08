import { ScrollView, View, Text, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { UserAvatar } from "@/components/user-avatar";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useUser } from "@/hooks/use-user";
import { useState } from "react";

type TabType = "reviews" | "lists" | "following";

export default function ProfileScreen() {
  const colors = useColors();
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<TabType>("reviews");

  if (!user) {
    return (
      <ScreenContainer className="flex-1 items-center justify-center">
        <Text className="text-foreground">Carregando perfil...</Text>
      </ScreenContainer>
    );
  }

  const stats = [
    { label: "Livros Lidos", value: user.booksRead },
    { label: "Páginas", value: user.pagesRead },
    { label: "Meta Anual", value: user.readingGoal || 0 },
    { label: "Seguidores", value: user.followers },
  ];

  return (
    <ScreenContainer className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header com Avatar e Info */}
        <View className="px-4 pt-4 pb-6 gap-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 gap-3">
              <UserAvatar name={user.name} size={64} />
              <View>
                <Text className="text-2xl font-bold text-foreground">{user.name}</Text>
                <Text className="text-sm text-muted mt-1">{user.bio}</Text>
              </View>
            </View>
            <Pressable
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            >
              <IconSymbol name="ellipsis" size={24} color={colors.foreground} />
            </Pressable>
          </View>

          {/* Botão Editar Perfil */}
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <View
              className="py-2 px-4 rounded-lg items-center border"
              style={{ borderColor: colors.primary }}
            >
              <Text className="font-semibold" style={{ color: colors.primary }}>
                Editar Perfil
              </Text>
            </View>
          </Pressable>
        </View>

        {/* Estatísticas */}
        <View className="px-4 pb-6">
          <View className="grid gap-3" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
            {stats.map((stat, index) => (
              <View
                key={index}
                className="flex-1 rounded-lg p-3 items-center gap-2"
                style={{ backgroundColor: colors.surface, minWidth: "48%" }}
              >
                <Text className="text-xl font-bold text-primary">{stat.value}</Text>
                <Text className="text-xs text-muted text-center">{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Abas */}
        <View className="px-4 pb-4 flex-row gap-2 border-b" style={{ borderBottomColor: colors.border, borderBottomWidth: 1 }}>
          {[
            { id: "reviews" as const, label: "Resenhas" },
            { id: "lists" as const, label: "Listas" },
            { id: "following" as const, label: "Seguindo" },
          ].map((tab) => (
            <Pressable
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            >
              <View
                className="pb-3 border-b-2"
                style={{
                  borderBottomColor:
                    activeTab === tab.id ? colors.primary : "transparent",
                }}
              >
                <Text
                  style={{
                    color: activeTab === tab.id ? colors.primary : colors.muted,
                    fontWeight: activeTab === tab.id ? "600" : "400",
                  }}
                >
                  {tab.label}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Conteúdo das Abas */}
        <View className="px-4 py-6 pb-12">
          {activeTab === "reviews" && (
            <View className="items-center gap-2">
              <IconSymbol name="star.fill" size={32} color={colors.muted} />
              <Text className="text-foreground font-semibold">Nenhuma resenha ainda</Text>
              <Text className="text-sm text-muted text-center">
                Comece a avaliar livros que você leu
              </Text>
            </View>
          )}

          {activeTab === "lists" && (
            <View className="items-center gap-2">
              <IconSymbol name="book.fill" size={32} color={colors.muted} />
              <Text className="text-foreground font-semibold">Nenhuma lista criada</Text>
              <Text className="text-sm text-muted text-center">
                Crie listas personalizadas de livros
              </Text>
            </View>
          )}

          {activeTab === "following" && (
            <View className="items-center gap-2">
              <IconSymbol name="person.fill" size={32} color={colors.muted} />
              <Text className="text-foreground font-semibold">Não está seguindo ninguém</Text>
              <Text className="text-sm text-muted text-center">
                Siga outros leitores para ver suas resenhas
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
