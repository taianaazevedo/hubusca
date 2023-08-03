import { Image, TouchableOpacity } from "react-native";
import { UserInfo } from "../../types/types";
import {
  StyledText,
  StyledView,
  StyledLocation,
  StyledName,
} from "./userStyled";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../routes/stack";

export default function User({ avatar_url, name, login, location }: UserInfo) {
  const navigation = useNavigation<StackTypes>();

  return (
    <>
      <StyledView>
        <TouchableOpacity onPress={() => navigation.navigate("Profile", {login, name, location, avatar_url})}>
          <Image
            source={{ uri: `${avatar_url}` }}
            style={{ width: 250, height: 250, borderRadius: 150 }}
          />
        </TouchableOpacity>

        <StyledName>
          <StyledText style={{ fontSize: 25, fontWeight: "bold" }}>
            {name}
          </StyledText>
          <StyledText>@{login}</StyledText>
        </StyledName>
        {location && (
          <StyledLocation>
            <Ionicons name="location" color="white" size={22} />
            <StyledText style={{ marginRight: 5 }}>{location}</StyledText>
          </StyledLocation>
        )}
      </StyledView>
    </>
  );
}
