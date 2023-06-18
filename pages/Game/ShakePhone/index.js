import { useAsyncEffect, useReactive } from "ahooks";
import { Alert, Image, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RNShake from "react-native-shake";
import { useSelector } from "react-redux";
import to from "await-to-js";
import { createVoucher } from "../../../services/voucher";

const ShakePhone = ({ route }) => {
  const { discount } = route.params;
  const profile = useSelector((state) => state.profile);
  const state = useReactive({ showResult: false, loading: false });

  useAsyncEffect(() => {
    const subscription = RNShake.addListener(async () => {
      if (state.loading) return;
      state.loading = true;

      const [err] = await to(createVoucher(profile?.token, { discount }));
      if (err) return Alert.alert("Lỗi", "Mất kết nối server!");

      Alert.alert("Thông báo", "Bạn đã nhận được voucher Giảm giá ");
      state.showResult = true;
      state.loading = false;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      {!state.showResult && (
        <>
          <MaterialCommunityIcons name="cellphone" size={100} />
          <Text>Lắc điện thoại của bạn để nhận mã giảm giá</Text>
        </>
      )}
      {state.showResult && (
        <View style={{ width: "100%" }}>
          <View
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../assets/congratulation.png")}
              resizeMode="stretch"
              style={{ width: 200, height: 200, alignSelf: "center" }}
            />
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              width: "100%",
              textAlign: "center",
            }}
          >
            Bạn đã nhận được voucher
          </Text>
        </View>
      )}
    </View>
  );
};

export default ShakePhone;
