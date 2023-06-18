import { Animated, Easing } from "react-native";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get("screen");

const SlideItem = ({ item }) => {
  const translateImage = new Animated.Value(40);

  Animated.timing(translateImage, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: item.avatar }}
        resizeMode="stretch"
        style={[styles.image, { transform: [{ translateY: translateImage }] }]}
      />
      {/* <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height: 220,
    alignItems: "center",
  },
  image: {
    width: "100%",
    flex: 1,
    height,
  },
  content: {
    position: "absolute",
    bottom: 0,
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
});

export default SlideItem;
