import { Text } from "react-native";
import {
  StyledText,
  StyledText2,
  StyledInput,
  StyledTouchableOpacity,
  StyledView,
} from "./searchStyled";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Dispatch } from "react";

type SearchProps = {
  text: string;
  setText: Dispatch<React.SetStateAction<string>>;
  getUser: (text: string) => Promise<void>;
};

export default function Search({ text, setText, getUser }: SearchProps) {
  return (
    <StyledView>
      <StyledText>HUBusca</StyledText>
      <StyledText2>Encontre o perfil do dev no GitHub e veja seus repositórios</StyledText2>
      <StyledInput
        placeholder="Pesquise pelo nome de usuário"
        onChangeText={(newText) => setText(newText)}
        defaultValue={text}
        onSubmitEditing={() => getUser(text)}
      />
      <StyledTouchableOpacity onPress={() => getUser(text)}>
        <Ionicons name="search" color="white" size={18} />
        <Text style={{ color: "#ffffff" }}>Pesquisar</Text>
      </StyledTouchableOpacity>
    </StyledView>
  );
}