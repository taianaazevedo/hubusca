import { FlatList, Image, Text, View } from "react-native";
import {
  StyledView,
  StyledContainer,
  StyledText,
  StyledText2,
  StyledInfos,
  StyledText3,
} from "./userProfileStyled";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyledLocation } from "../../components/user/userStyled";
import { StackTypes } from "../../routes/stack";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";
import { useEffect, useState } from "react";
import { UserDetails, UserRepositories } from "../../types/types";
import Repository from "../../components/repositoryList/repositoryList";

export default function Profile({ route }: any) {
  const navigation = useNavigation<StackTypes>();
  const { login } = route.params;
  const [userInfo, setUserInfo] = useState<UserDetails | null>(null);
  const [repository, setRepository] = useState<UserRepositories | []>([]);
  const [error, setError] = useState(false);

  async function getUser() {
    try {
      const result = await api.get(`/users/${login}`);
      setUserInfo(result.data);
    } catch (error) {
      setError(true);
    }
  }

  async function getRepositories() {
    try {
      const result = await api.get(`/users/${login}/repos`);
      setRepository(result.data);
    } catch (error) {
      setError(true);
    }
  }

  function ErrorMessage(){
    return <Text>Não foi possível recuperar as informações desse usuário</Text>
  }

  useEffect(() => {
    getUser();
    getRepositories();
  }, []);

  return (
    <LinearGradient
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      locations={[0.2, 0.9]}
      colors={["#070606", "#631766"]}
    >
      <StyledContainer>
        <StyledView>
          <Ionicons
            name="chevron-back"
            style={{ marginRight: 330, color: "white" }}
            size={30}
            onPress={() => navigation.pop()}
          />
          <Image
            source={{ uri: `${userInfo?.avatar_url}` }}
            style={{ width: 100, height: 100, borderRadius: 100 }}
          />
          <StyledText>{userInfo?.name} </StyledText>
          <StyledText2>
            @{login} | id: {userInfo?.id}{" "}
          </StyledText2>
          {userInfo?.location && (
            <StyledLocation>
              <Ionicons
                name="location"
                size={15}
                style={{ marginRight: 5, color: "white" }}
              />
              <StyledText2>{userInfo?.location} </StyledText2>
            </StyledLocation>
          )}

          <StyledInfos>
            <Text style={{ color: "white" }}>
              Seguidores: {userInfo?.followers} |{" "}
            </Text>
            <Text style={{ color: "white" }}>
              Repositórios: {userInfo?.public_repos}
            </Text>
          </StyledInfos>
          <StyledText3>Repositórios</StyledText3>
          {error && <ErrorMessage/>}
          <FlatList
            showsVerticalScrollIndicator={false}
            data={repository}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return <Repository {...item} />;
            }}
          />
        </StyledView>
      </StyledContainer>
    </LinearGradient>
  );
}