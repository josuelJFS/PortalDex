import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Character, fetchCharacters } from "../api/rickAndMorty";
import CharacterItem from "../components/CharacterItem";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "List">;

export default function ListScreen({ navigation }: Props) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(true);

  const load = useCallback(
    async (reset = false) => {
      if (loading) return;
      setLoading(true);
      try {
        const nextPage = reset ? 1 : page;
        const res = await fetchCharacters(nextPage, query.trim() || undefined);
        setHasNext(Boolean(res.info.next));
        setPage(nextPage + 1);
        setData((prev) => (reset ? res.results : [...prev, ...res.results]));
        setError(null);
      } catch (e: any) {
        setError(e?.message ?? "Erro ao carregar");
      } finally {
        setLoading(false);
        if (reset) setRefreshing(false);
      }
    },
    [loading, page, query]
  );

  useEffect(() => {
    load(true);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setRefreshing(true);
      load(true);
    }, 400);
    return () => clearTimeout(t);
  }, [query, load]);

  const renderItem = useCallback(
    ({ item }: { item: Character }) => (
      <CharacterItem
        item={item}
        onPress={() => navigation.navigate("Detail", { characterId: item.id })}
      />
    ),
    [navigation]
  );

  const keyExtractor = useCallback((item: Character) => String(item.id), []);

  const ListFooter = useMemo(
    () => <View style={styles.footer}>{loading && <ActivityIndicator />}</View>,
    [loading]
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Buscar por nome"
          value={query}
          onChangeText={setQuery}
          style={styles.input}
          accessibilityLabel="Campo de busca"
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode="while-editing"
        />
      </View>

      {error ? (
        <View style={styles.center}>
          <Text style={styles.error}>{error}</Text>
          <Text style={styles.retry} onPress={() => load(true)}>
            Tentar novamente
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onEndReached={() => hasNext && load(false)}
          onEndReachedThreshold={0.4}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                load(true);
              }}
            />
          }
          ListFooterComponent={ListFooter}
          contentContainerStyle={
            data.length === 0 && !loading ? styles.emptyContainer : undefined
          }
          ListEmptyComponent={
            !loading ? <Text style={styles.empty}>Nenhum resultado</Text> : null
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fafafa" },
  searchBox: {
    padding: 12,
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#eee",
  },
  input: {
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  footer: { paddingVertical: 16 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  error: { color: "#b00020", fontSize: 16, textAlign: "center", marginBottom: 8 },
  retry: { color: "#0066cc", textDecorationLine: "underline" },
  emptyContainer: { flexGrow: 1, alignItems: "center", justifyContent: "center" },
  empty: { color: "#666" },
});
