import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DateTimePicker from "@react-native-community/datetimepicker";
import nasa from "./api/nasa";

function HomeScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#365160",
      }}
    >
      <Text
        style={{
          paddingBottom: 50,
          marginTop: -200,
          marginBottom: 100,
          color: "#fff",
          fontSize: 16,
        }}
      >
        {" "}
        MORE WORDS {"\n"}
        Tap Image To Start
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("Calendar")}>
        <Image source={require("./assets/logo.png")} />
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

function CalendarScreen() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [result, setResult] = useState(null)
  // const id = navigation.getparam("id")

  const getResult = async (links) => {
    const response = await nasa.get(`/${links}`);
    setResult(response.data);
  };
  useEffect(() => {
    getResult(links);
  }, []);

  if (!result) {
    return null;
  }


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <View>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: "#365160",
            alignItems: "center",
            padding: 10,
          }}
          onPress={showDatepicker}
        >
          <Text style={{ color: "#FFF" }}>Show Calendar</Text>
        </TouchableOpacity>
      </View>

      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={mode}
        display="default"
        onChange={onChange}
      />
      <Text>{result.name}</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Near Earth",
          }}
        />
        <Stack.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            title: "Choose a date",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

// blue #365160 orange #F28512 tan #EFE8AD green #AADD96 yellow #F6BC3B
