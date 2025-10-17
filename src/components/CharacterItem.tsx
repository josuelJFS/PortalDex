import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Character } from "../api/rickAndMorty";

type Props = {
  item: Character;
  onPress: () => void;
};

export default function CharacterItem({ item, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      accessibilityRole="button"
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.species} • {item.status} • {item.gender}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    gap: 12,
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  image: { width: 64, height: 64, borderRadius: 8, backgroundColor: "#f0f0f0" },
  content: { flex: 1 },
  title: { fontSize: 16, fontWeight: "600", color: "#111" },
  description: { fontSize: 13, color: "#555", marginTop: 4 },
});
