import { useReactive } from "ahooks";
import {
  Alert,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { Image, TextInput, View } from "react-native";
import { loginUser, registerUser } from "../../services/auth";
import to from "await-to-js";
import { useDispatch } from "react-redux";
import { updateProfileInfo } from "../../slices/profileSlice";
import { NAVIGATOR_SCREEN } from "../../utils/enum";

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useReactive({
    name: "",
    username: "",
    password: "",
    phone: "",
    loading: false,
  });

  const handleRegister = async () => {
    state.loading = true;
    const [err, res] = await to(
      registerUser({
        email: state.username?.trim?.(),
        password: state.password?.trim?.(),
        name: state.name?.trim?.(),
        phone: state.phone?.trim?.(),
      })
    );
    state.loading = false;

    console.log(err, res);
    if (err)
      return Alert.alert(
        "Lỗi",
        err?.response?.data?.message?.toString?.() || "Đăng ký thất bại!"
      );

    ToastAndroid.show("Đăng ký thành công!", ToastAndroid.SHORT);
    navigation.navigate(NAVIGATOR_SCREEN.LOGIN);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo.png")}
        resizeMode="stretch"
        style={{
          width: 100,
          height: 50,
          alignSelf: "center",
          marginBottom: 40,
        }}
      />
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Tên..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => (state.name = text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Số điện thoại..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => (state.phone = text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => (state.username = text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => (state.password = text)}
        />
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        disabled={state.loading}
        onPress={handleRegister}
      >
        <Text style={styles.loginText}>Đăng ký</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ width: "100%" }}
        onPress={() => navigation.navigate(NAVIGATOR_SCREEN.LOGIN)}
      >
        <Text style={styles.loginText}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
    width: "100%",
    textAlign: "center",
  },
});

export default Register;
