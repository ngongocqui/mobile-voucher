import { ActivityIndicator, Animated, FlatList, View } from "react-native";
import SlideItem from "./SlideItem";
import { useAsyncEffect, useReactive } from "ahooks";
import to from "await-to-js";
import { getStores } from "../../../services/store";
import Pagination from "./Pagination";
import { useRef } from "react";

const Slider = () => {
  const state = useReactive({ data: [], index: 0, loading: true });
  const scrollX = useRef(new Animated.Value(0)).current;

  useAsyncEffect(async () => {
    const [, res] = await to(getStores({ page: 0, limit: 4 }));
    state.data = res?.data?.data || [];
    state.loading = false;
  }, []);

  const handleOnScroll = (event) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(event);
  };

  const handleViewableItemChanged = useRef(({ viewableItems }) => {
    state.index = viewableItems[0].index;
  }).current;
  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

  if (state.loading) return <ActivityIndicator />;
  return (
    <View>
      <FlatList
        data={state.data}
        renderItem={({ item }) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleViewableItemChanged}
        viewabilityConfig={viewabilityConfig}
        keyExtractor={(item, index) => index.toString()}
      />
      <Pagination data={state.data} scrollX={scrollX} index={state.index} />
    </View>
  );
};

export default Slider;
