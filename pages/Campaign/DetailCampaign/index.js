import { useReactive } from "ahooks";
import moment from "moment";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";
import { NAVIGATOR_SCREEN } from "../../../utils/enum";

const DetailCampaign = ({ route, navigation }) => {
  const state = useReactive({ height: 400 });
  const { item } = route.params;

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <ScrollView>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Image
            source={{ uri: item.avatar }}
            resizeMode="stretch"
            style={{
              width: "100%",
              height: 200,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              width: "100%",
              textAlign: "center",
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 12,
              width: "100%",
              fontWeight: "300",
              textAlign: "center",
            }}
          >
            {`Ngày diễn ra: ${moment(item.startDate).format(
              "DD/MM/YYYY"
            )} - ${moment(item.endDate).format("DD/MM/YYYY")}`}
          </Text>
        </View>
        <View style={{ flex: 1, marginTop: 10 }}>
          <WebView
            source={{
              html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>${item.content}</body></html>`,
            }}
            style={{ width: "100%", height: state.height }}
            androidHardwareAccelerationDisabled={true}
            onMessage={(event) => {
              state.height = Number(event.nativeEvent.data);
            }}
            injectedJavaScript="window.ReactNativeWebView.postMessage(document.body.scrollHeight)"
          />
        </View>
      </ScrollView>
      <View
        style={{
          padding: 10,
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            borderRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 5,
          }}
          onPress={() =>
            navigation.navigate(NAVIGATOR_SCREEN.GAME, {
              discount: item.discount,
            })
          }
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Chơi trò chơi
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailCampaign;
