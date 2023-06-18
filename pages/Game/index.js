import { FlatList, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NAVIGATOR_SCREEN } from "../../utils/enum";

const data = [
  {
    image: <MaterialCommunityIcons name="cellphone" size={40} />,
    title: "Lắc điện thoại",
    description: "Lắc điện thoại để nhận phiếu giảm giá đầy hấp dẫn",
  },
];

const Game = ({ navigation, route }) => {
  const { discount } = route.params;

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          padding: 10,
          paddingTop: 20,
          paddingBottom: 20,
          display: "flex",
          flexDirection: "row",
          backgroundColor: "white",
          gap: 10,
        }}
        onPress={() =>
          navigation.navigate(NAVIGATOR_SCREEN.SHAKE_PHONE, { item, discount })
        }
      >
        {item.image}
        <View>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>{item.title}</Text>
          <Text style={{ fontSize: 12, fontWeight: "300", flexWrap: "wrap" }}>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
};

export default Game;
