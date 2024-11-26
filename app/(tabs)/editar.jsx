import { useState } from "react";
import { View, Text } from "react-native";

export default function Extras(route) {
  const { id } = route.params;
  const [destino, setDestino] = useState([]);
  const [nombre, setNombre] = useState();
  const [description, setDescription] = useState();
  const [difficulty, setDifficulty] = useState();
  const [isFavorite, setIsFavorite] = useState();

  const handleEdit = async (Ident) => {
    try {
      await fetch(`${API_BASE_URL}/${Ident}`, {
        //cambiar segun ip de tu red
        method: "PUT",
        body: `{
    "name": ${nombre},
    "description": ${description},
    "difficulty": ${difficulty},
    "isFavorite": ${isFavorite}
  }`,
      });
      const data = await response.json();
      setDestino(data);
    } catch (error) {
      console.error("Error fetching destino:", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.title}>Editar propiedades</Text>

      {/* Campos editables*/}
      <TextInput
        style={[styles.input]}
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={[styles.input]}
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={[styles.input]}
        value={Difficulty}
        onChangeText={setDifficulty}
      />
      <Checkbox
        style={[styles.input]}
        value={isFavorite}
        onChangeText={setIsFavorite}
      />

      {/* guardamos los cambios */}
      <Button title="Guardar Cambios" onPress={() => handleEdit(id)} />
    </View>
  );
}
