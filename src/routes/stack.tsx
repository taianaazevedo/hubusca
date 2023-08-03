import { NavigationContainer } from "@react-navigation/native";
import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../src/screens/homepage/home";
import Profile from "../../src/screens/userProfile/userProfile";

const Stack = createNativeStackNavigator();

type StackNavigation = {
  Home: undefined;
  Profile: {login: string, name: string, avatar_url: string, location: string};
}

export type StackTypes = NativeStackNavigationProp<StackNavigation>

export default function StackComponent() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
