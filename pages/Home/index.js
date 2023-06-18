import {
  FlatList,
  Image,
  StatusBar,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Slider from "./Slider";
import { SearchBar, Card } from "react-native-elements";
import { useAsyncEffect, useReactive } from "ahooks";
import to from "await-to-js";
import { getStores } from "../../services/store";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../services/auth";
import { updateProfileInfo } from "../../slices/profileSlice";

const Home = () => {
  const state = useReactive({ data: [], index: 0, loading: true });
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useAsyncEffect(async () => {
    if (profile?.token) {
      const [err, res] = await to(getProfile(profile.token));
      if (err) return;
      dispatch(updateProfileInfo(res.data));
    }
  }, [profile?.token]);

  useAsyncEffect(async () => {
    const [, res] = await to(getStores({ page: 0, limit: 100 }));
    state.data = res?.data?.data || [];
    state.loading = false;
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1, flexDirection: "column", margin: 3 }}>
        <Image
          source={{ uri: item.avatar }}
          resizeMode="stretch"
          style={{
            width: "100%",
            height: 100,
          }}
        />
        <Text style={{ fontSize: 14 }}>{item.title}</Text>
      </View>
    );
  };

  if (state.loading)
    return (
      <View>
        <StatusBar animated={true} backgroundColor="#61dafb" />
        <SearchBar placeholder="Tìm kiếm sản phẩm" lightTheme />
        <ActivityIndicator />
      </View>
    );
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <StatusBar animated={true} backgroundColor="#61dafb" />
      <SearchBar placeholder="Tìm kiếm sản phẩm" lightTheme />
      <Slider />
      <Card>
        <Card.Title>Top sale</Card.Title>
        <FlatList
          data={state.data.slice(0, 3)}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </Card>
      <Card>
        <Card.Title>Top bán chạy</Card.Title>
        <FlatList
          data={state.data.slice(3, 6)}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </Card>
      <Card>
        <Card.Title>Sản phẩm tốt nhất</Card.Title>
        <FlatList
          data={state.data.slice(6, 9)}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </Card>
      <Card>
        <Card.Title>Miễn phí ship</Card.Title>
        <FlatList
          data={state.data.slice(9, 12)}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </Card>
    </ScrollView>
  );
};

export default Home;
