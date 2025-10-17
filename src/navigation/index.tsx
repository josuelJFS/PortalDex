import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListScreen from "../screens/ListScreen";
import DetailScreen from "../screens/DetailScreen";
import { RootStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="List"
          component={ListScreen}
          options={{ title: "Personagens" }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: "Detalhes" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
