import { useAsyncEffect, useReactive } from "ahooks";
import to from "await-to-js";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { getCampaigns } from "../../services/campaign";
import moment from "moment";
import { NAVIGATOR_SCREEN } from "../../utils/enum";

const Campaign = ({ navigation }) => {
  const state = useReactive({ data: [], index: 0, loading: true });

  const onRefresh = async () => {
    state.loading = true;
    const [, res] = await to(getCampaigns({ page: 0, limit: 100 }));
    state.data = res?.data?.data || [];
    state.loading = false;
  };

  useAsyncEffect(async () => {
    await onRefresh();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          padding: 10,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          gap: 10,
        }}
        onPress={() =>
          navigation.navigate(NAVIGATOR_SCREEN.DETAIL_CAMPAIGN, { item })
        }
      >
        <Image
          source={{ uri: item.avatar }}
          resizeMode="stretch"
          style={{
            width: "100%",
            height: 200,
            borderRadius: 10,
            backgroundColor: "red",
          }}
        />
        <View>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>{item.name}</Text>
          <Text style={{ fontSize: 12, fontWeight: "300" }}>
            {`Ngày diễn ra: ${moment(item.startDate).format(
              "DD/MM/YYYY"
            )} - ${moment(item.endDate).format("DD/MM/YYYY")}`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (state.loading)
    return (
      <View>
        <StatusBar animated={true} backgroundColor="#61dafb" />
        <SearchBar placeholder="Tìm kiếm chiến dịch" lightTheme />
        <ActivityIndicator />
      </View>
    );
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <StatusBar animated={true} backgroundColor="#61dafb" />
      <SearchBar placeholder="Tìm kiếm chiến dịch" lightTheme />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={state.loading} onRefresh={onRefresh} />
        }
        data={state.data}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 10 }}
      />
    </ScrollView>
  );
};

export default Campaign;
