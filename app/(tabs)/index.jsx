import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  Text,
  Dimensions,
} from "react-native";
import { API_BASE_URL } from "@/constants/config";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function Destinos() {
  const [destinos, setDestinos] = useState([]);
  const [destinosFavoritos, setDestinosFavoritos] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const ordenarAlfabetico = () => {
    const sortedDestinos = destinos.sort(function (a, b) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    setDestinos(sortedDestinos);
  };

  const fetchDestinos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}`);
      const data = await response.json();
      const favoritos = [];
      data.forEach((des) => {
        if (des?.isFavorite) {
          favoritos.push(des);
        }
      });
      setDestinos(data);
      setDestinosFavoritos(favoritos);
      console.log(data);
      console.log(destinosFavoritos);
    } catch (error) {
      console.error("Error fetching destinos:", error);
    }
    setLoading(false);
    //ordenarAlfabetico();
  };

  useEffect(() => {
    fetchDestinos();
  }, []);

  const eliminarDestino = async (Ident) => {
    try {
      await fetch(`${API_BASE_URL}/${Ident}`, { method: "DELETE" });
      fetchDestinos();
    } catch (error) {
      console.error("Error eliminando destino:", error);
    }
  };

  const ToggleFavorite = async (Ident, state) => {
    await fetch(`${API_BASE_URL}/${Ident}`, {
      //cambiar segun ip de tu red
      method: "PATCH",
      body: `"isFavorite": ${state}`,
    });
    fetchDestinos();
  };

  const handleEditar = (id) => {
    router.push({
      pathname: "/(tabs)/editar",
      params: { id: JSON.stringify(id) }, // Pasar datos como string
    });
  };

  return (
    <View style={styles.container}>
      <Text>Favoritos</Text>
      <FlatList
        data={destinos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>Dificultad: {item.difficulty}</Text>
            <TouchableOpacity
              onPress={() => ToggleFavorite(item.id, !item.isFavorite)}
            >
              <Text style={styles.delete}>⭐</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => eliminarDestino(item.id)}>
              <Text style={styles.delete}>Eliminar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEditar(item.id)}>
              Editar 🖊
            </TouchableOpacity>
          </View>
        )}
        refreshing={loading}
        onRefresh={fetchDestinos}
      />
      <Text>Destinos</Text>
      <FlatList
        data={destinos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>Dificultad: {item.difficulty}</Text>
            <TouchableOpacity
              onPress={() => ToggleFavorite(item.id, !item.isFavorite)}
            >
              <Text style={styles.delete}>⭐</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => eliminarDestino(item.id)}>
              <Text style={styles.delete}>Eliminar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEditar(item.id)}>
              Editar 🖊
            </TouchableOpacity>
          </View>
        )}
        refreshing={loading}
        onRefresh={fetchDestinos}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
  },
  name: { fontSize: 18, fontWeight: "bold" },
  delete: { color: "red", marginTop: 10 },
  container: { maxHeight: height * 0.8 },
});
