import { TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { resetProfile } from "../../slices/profileSlice";
import { GENDER_ENUM, NAVIGATOR_SCREEN } from "../../utils/enum";

const Profile = ({ navigation }) => {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  console.log(profile);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MaterialCommunityIcons name="account-outline" size={100} />
      <Text style={{ width: "100%", textAlign: "center" }}>
        {`Tên: ${profile?.name}`}
      </Text>
      <Text style={{ width: "100%", textAlign: "center" }}>
        {`Giới tính: ${GENDER_ENUM[profile?.gender]?.text || ""}`}
      </Text>
      <Text style={{ width: "100%", textAlign: "center" }}>
        {`Số điện thoại: ${profile?.phone}`}
      </Text>
      <Text style={{ width: "100%", textAlign: "center" }}>
        {`Email: ${profile?.email}`}
      </Text>
      <TouchableOpacity
        style={{
          width: 200,
          backgroundColor: "blue",
          margin: 20,
          padding: 10,
          borderRadius: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          dispatch(resetProfile());
          navigation.navigate(NAVIGATOR_SCREEN.LOGIN);
        }}
      >
        <Text style={{ color: "white", width: "100%", textAlign: "center" }}>
          Đăng xuất
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
