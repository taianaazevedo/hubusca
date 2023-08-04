import { Text, TouchableOpacity, Linking, Alert} from "react-native";
import { StyledTitle, StyledView, StyledInfo } from "./repositoryStyled";
import Ionicons from "react-native-vector-icons/Ionicons";

type RepositoryParams = {
  name: string;
  language: string;
  description: string;
  created_at: string;
  pushed_at: string;
  html_url: string;
};

export default function Repository({
  name,
  language,
  description,
  created_at,
  pushed_at,
  html_url,
}: RepositoryParams) {
  const createdDate = new Date(created_at);
  const formattedCreatedDate = createdDate.toLocaleDateString();
  const pusehdDate = new Date(pushed_at);
  const formattedPushedDate = pusehdDate.toLocaleDateString();

  async function goToRepository(html_url: string){
    const supported = await Linking.canOpenURL(html_url);
    if (supported) {
      await Linking.openURL(html_url);
    } else {
      Alert.alert(`Não é possível abrir o link: ${html_url}`);
    }
  }

  return (
    <StyledView>
      <TouchableOpacity onPress={() => goToRepository(html_url)}>
        <StyledTitle>
          <Ionicons
            name="logo-github"
            style={{ marginRight: 5, color: "white" }}
            size={18}
          />
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            {name}
          </Text>
        </StyledTitle>
        {language && (
          <StyledInfo>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Linguagem utilizada:{" "}
            </Text>
            <Text style={{ color: "white" }}>{language}</Text>
          </StyledInfo>
        )}
        {description && (
          <StyledInfo>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Descrição:{" "}
            </Text>
            <Text style={{ color: "white" }}>{description}</Text>
          </StyledInfo>
        )}
        <StyledInfo>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Criado em:{" "}
          </Text>
          <Text style={{ color: "white" }}>{formattedCreatedDate}</Text>
        </StyledInfo>
        <StyledInfo>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Último push:{" "}
          </Text>
          <Text style={{ color: "white" }}>{formattedPushedDate}</Text>
        </StyledInfo>
        <StyledInfo>
          <Text style={{ color: "white", fontWeight: "bold" }}>LInk: </Text>
          <Text style={{ color: "white" }}>{html_url}</Text>
        </StyledInfo>
      </TouchableOpacity>
    </StyledView>
  );
}
