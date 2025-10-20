import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Character, fetchCharacter } from "../../src/api/rickAndMorty";

export default function Detail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetchCharacter(Number(id));
        if (mounted) setData(res);
        setError(null);
      } catch (e: any) {
        setError(e?.message ?? "Erro ao carregar");
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  if (error || !data)
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error ?? "Não encontrado"}</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: data.image }} style={styles.image} />
        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.subtitle}>
          {data.species} • {data.status} • {data.gender}
        </Text>
        <View style={styles.card}>
          <Text style={styles.label}>Origem</Text>
          <Text style={styles.value}>{data.origin?.name}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Localização</Text>
          <Text style={styles.value}>{data.location?.name}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { padding: 16, alignItems: "center" },
  image: { width: 240, height: 240, borderRadius: 16, marginBottom: 16 },
  title: { fontSize: 22, fontWeight: "700", color: "#111" },
  subtitle: { fontSize: 14, color: "#666", marginTop: 4, marginBottom: 16 },
  card: {
    width: "100%",
    backgroundColor: "#f7f7f7",
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  label: { fontSize: 12, color: "#888" },
  value: { fontSize: 16, color: "#222", fontWeight: "500" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  error: { color: "#b00020" },
});
