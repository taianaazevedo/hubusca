import { StyledView, StyledError } from "./homeStyled";
import Search from "../../components/search/search";
import { Keyboard } from "react-native";
import api from "../../services/api";
import { useState } from "react";
import { UserInfo } from "../../types/types";
import User from "../../components/user/user";
import { LinearGradient } from "expo-linear-gradient";


export default function Home() {
  const [text, setText] = useState("");
  const [user, setUser] = useState<UserInfo | null>(null);
  const [error, setError] = useState(false);

  async function getUser(text: string) {
    Keyboard.dismiss();
    try {
      const result = await api.get(`/users/${text}`);
      setUser(result.data);
      setError(false);
    } catch (error) {
      setUser(null);
      setError(true);
    }
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
      </StyledView>
    </LinearGradient>
  );
}