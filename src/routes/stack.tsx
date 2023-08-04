import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import Home from "../../src/screens/homepage/home";
import Profile from "../../src/screens/userProfile/userProfile";
import LastSearch from "../screens/lastSearch/lastSearch";

const Stack = createNativeStackNavigator();

type StackNavigation = {
  Home: undefined;
  Profile: {
    login: string;
  };
  LastSearch: { lastSearch: string[]};
};

export type StackTypes = NativeStackNavigationProp<StackNavigation>;

export default function StackComponent() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="LastSearch" component={LastSearch} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
