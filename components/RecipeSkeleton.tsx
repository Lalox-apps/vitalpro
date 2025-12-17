import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

interface Props {
  isDark: boolean;
}

export function RecipeSkeleton({ isDark }: Props) {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 300],
  });

  const base = isDark ? '#2A2A3A' : '#E5E7EB';

  const Shimmer = ({ height, width, rounded = 12, mt = 0 }: any) => (
    <View
      style={{
        height,
        width,
        marginTop: mt,
        borderRadius: rounded,
        backgroundColor: base,
        overflow: 'hidden',
      }}
    >
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          transform: [{ translateX }],
        }}
      >
        <LinearGradient
          colors={
            isDark
              ? ['transparent', 'rgba(255,255,255,0.12)', 'transparent']
              : ['transparent', 'rgba(255,255,255,0.6)', 'transparent']
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      </Animated.View>
    </View>
  );

  return (
    <View className="mb-6 rounded-2xl overflow-hidden">
      <View
        style={{
          borderRadius: 20,
          padding: 24,
          backgroundColor: isDark ? '#151520' : '#FFFFFF',
        }}
      >
        <Shimmer height={160} width="100%" rounded={16} />

        <Shimmer height={20} width="70%" mt={20} />
        <Shimmer height={16} width="100%" mt={12} />
        <Shimmer height={16} width="85%" mt={8} />

        <View style={{ flexDirection: 'row', marginTop: 16 }}>
          <Shimmer height={28} width={80} rounded={999} />
          <View style={{ width: 12 }} />
          <Shimmer height={28} width={60} rounded={999} />
        </View>
      </View>
    </View>
  );
}
