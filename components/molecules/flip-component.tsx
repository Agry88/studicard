import React, { useRef, useState } from "react";
import { View, StyleSheet, Animated, KeyboardAvoidingView, Pressable, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from "react-native";

type Props = {
  frontComponent: React.ReactNode
  backComponent: React.ReactNode
}

export default function FlipComponent (props: Props) {
  const animate = useRef(new Animated.Value(0));
  const [isFlipped, setIsFlipped] = useState(false);

  const { frontComponent, backComponent } = props;

  const doAFlip = () => {
    Animated.timing(animate.current, {
      duration: 300,
      toValue: isFlipped ? 0 : 180,
      useNativeDriver: true,
    }).start(() => {
      setIsFlipped(!isFlipped);
    });
  };

  const interpolatedValueFront = animate.current.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const interpolatedValueBack = animate.current.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const rotateFront = {
    transform: [
      {
        rotateY: interpolatedValueFront,
      },
    ],
  };

  const rotateBack = {
    transform: [
      {
        rotateY: interpolatedValueBack,
      },
    ],
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.container}>

        <Animated.View style={[styles.hidden, rotateFront]}>
          <Pressable style={{
            width: "100%", height: "100%"
          }} onPress={() => doAFlip()}
          >
            {frontComponent}
          </Pressable>
        </Animated.View>

        <Animated.View style={[styles.hidden, styles.back, rotateBack]}>
          <Pressable style={{
            width: "100%", height: "100%"
          }} onPress={() => doAFlip()}
          >
            {backComponent}
          </Pressable>
        </Animated.View>

      </View>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  hidden: {
    backfaceVisibility: "hidden",
  },
  back: {
    position: "absolute",
    top: 20,
  },
});