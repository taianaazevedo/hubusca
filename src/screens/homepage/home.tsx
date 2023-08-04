import {
  StyledView,
  StyledError,
  StyledRecentSearchContainer,
  StyledRecentSearch,
} from "./homeStyled";
import Search from "../../components/search/search";
import { Keyboard, Text } from "react-native";
import api from "../../services/api";
import { useState } from "react";
import { UserInfo } from "../../types/types";
import User from "../../components/user/user";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../routes/stack";

export default function Home() {
  const navigation = useNavigation<StackTypes>();
  const [text, setText] = useState("");
  const [user, setUser] = useState<UserInfo | null>(null);
  const [error, setError] = useState(false);
  const [lastSearch, setLastSearch] = useState<string[]>([]);

  async function getUser(text: string) {
    Keyboard.dismiss();
    try {
      const result = await api.get(`/users/${text}`);
      setUser(result.data);
      setError(false);
      saveSearch();
    } catch (error) {
      setUser(null);
      setError(true);
    }
  }

  function saveSearch() {
    if (text.trim() === "") return;

    if (!lastSearch.includes(text)) {
      const recentSearch = [text, ...lastSearch.slice(0, 9)];
      setLastSearch(recentSearch);
    }
    setText("");
  }

  return (
    <LinearGradient
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      locations={[0.2, 0.9]}
      colors={["#070606", "#631766"]}
    >
      <StyledView>
        <Search text={text} setText={setText} getUser={getUser} />
        {user && <User {...user} />}
        {error && <StyledError>Usuário não encontrado :( </StyledError>}
        <StyledRecentSearchContainer>
          <StyledRecentSearch
            onPress={() => navigation.navigate("LastSearch", { lastSearch })}
          >
            <Ionicons
              name="search"
              color="white"
              size={18}
              style={{ marginRight: 5 }}
            />
            <Text style={{ color: "white", fontSize: 16 }}>
              Últimas pesquisas
            </Text>
          </StyledRecentSearch>
        </StyledRecentSearchContainer>
      </StyledView>
    </LinearGradient>
  );
}
