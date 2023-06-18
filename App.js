import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "./pages/Home";
import Campaign from "./pages/Campaign";
import DetailCampaign from "./pages/Campaign/DetailCampaign";
import { NAVIGATOR_SCREEN } from "./utils/enum";
import Game from "./pages/Game";
import ShakePhone from "./pages/Game/ShakePhone";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import { store } from "./store";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={NAVIGATOR_SCREEN.HOME}
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: "Trang chủ",
          tabBarLabelStyle: { width: "100%" },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={NAVIGATOR_SCREEN.CAMPAIGN}
        component={Campaign}
        options={{
          headerShown: false,
          tabBarLabel: "Chiến dịch",
          tabBarLabelStyle: { width: "100%" },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="sale" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={NAVIGATOR_SCREEN.PROFILE}
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: "Tài khoản",
          tabBarLabelStyle: { width: "100%" },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={NAVIGATOR_SCREEN.LOGIN}
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={NAVIGATOR_SCREEN.HOME_SCREEN}
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={NAVIGATOR_SCREEN.DETAIL_CAMPAIGN}
            component={DetailCampaign}
            options={{
              title: "Chi tiết khuyến mãi",
              headerTitleStyle: { fontSize: 14 },
            }}
          />
          <Stack.Screen
            name={NAVIGATOR_SCREEN.GAME}
            component={Game}
            options={{
              title: "Trò chơi",
              headerTitleStyle: { fontSize: 14 },
            }}
          />
          <Stack.Screen
            name={NAVIGATOR_SCREEN.SHAKE_PHONE}
            component={ShakePhone}
            options={{
              title: "Lắc điện thoại",
              headerTitleStyle: { fontSize: 14 },
            }}
          />
          <Stack.Screen
            name={NAVIGATOR_SCREEN.REGISTER}
            component={Register}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
