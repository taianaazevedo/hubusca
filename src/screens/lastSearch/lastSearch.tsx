import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StyledText, StyledView, StyledUser } from "./lastSearchStyled";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../routes/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function LastSearch({ route }: any) {
  const { lastSearch } = route.params;
  const navigation = useNavigation<StackTypes>();
  return (
    <LinearGradient
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      locations={[0.2, 0.9]}
      colors={["#070606", "#631766"]}
      style={{height: "100%"}}
    >
      <StyledView>
      <Ionicons
            name="chevron-back"
            style={{ marginRight: 330, color: "white" }}
            size={30}
            onPress={() => navigation.pop()}
          />
        <StyledText>Pesquisas recentes</StyledText>
      </StyledView>
      <FlatList
        data={lastSearch}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile", { login: item })}
            >
              <StyledUser>@{item}</StyledUser>
            </TouchableOpacity>
          );
        }}
      />
    </LinearGradient>
  );
}
