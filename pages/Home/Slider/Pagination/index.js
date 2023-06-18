import { Animated, Dimensions, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("screen");

const Pagination = ({ data, scrollX, index }) => {
  return (
    <View style={styles.container}>
      {data?.map?.((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [12, 30, 12],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={idx.toString()}
            style={[
              styles.dot,
              { width: dotWidth },
              idx === index && styles.dotActive,
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 3,
    backgroundColor: "#ccc",
  },
  dotActive: {
    backgroundColor: "#000",
  },
});

export default Pagination;
