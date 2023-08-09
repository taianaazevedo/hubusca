import { Text, TouchableOpacity, Linking, Alert} from "react-native";
import { StyledTitle, StyledView, StyledInfo } from "./repositoryStyled";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet } from "react-native";

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
            <Text style={styles.infos}>
              Linguagem utilizada:{" "}
            </Text>
            <Text  style={styles.date}>{language}</Text>
          </StyledInfo>
        )}
        {description && (
          <StyledInfo>
            <Text style={styles.infos}>
              Descrição:{" "}
            </Text>
            <Text  style={styles.date}>{description}</Text>
          </StyledInfo>
        )}
        <StyledInfo>
          <Text style={styles.infos}>
            Criado em:{" "}
          </Text>
          <Text  style={styles.date}>{formattedCreatedDate}</Text>
        </StyledInfo>
        <StyledInfo>
          <Text style={styles.infos}>
            Último push:{" "}
          </Text>
          <Text  style={styles.date}>{formattedPushedDate}</Text>
        </StyledInfo>
        <StyledInfo>
          <Text style={styles.infos}>Link: </Text>
          <Text style={styles.date}>{html_url}</Text>
        </StyledInfo>
      </TouchableOpacity>
    </StyledView>
  );
}

const styles = StyleSheet.create({
  infos: {
    color: "white",
    fontWeight: "bold"
  },
  date : {
    color: "white"
  }
})