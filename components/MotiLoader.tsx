import { MotiView } from 'moti';
import React from 'react';
import { View } from 'react-native';

export function MotiLoader() {
  return (
    <View style={{ width: 60, height: 60 }}>
      {[0, 1, 2].map((i) => (
        <MotiView
          key={i}
          from={{
            opacity: 0.4,
            scale: 1,
          }}
          animate={{
            opacity: 0,
            scale: 1.6,
          }}
          transition={{
            type: 'timing',
            duration: 1200,
            delay: i * 200,
            loop: true,
          }}
          style={{
            position: 'absolute',
            width: 60,
            height: 60,
            borderRadius: 30,
            borderWidth: 3,
            borderColor: '#ffffff',
          }}
        />
      ))}
    </View>
  );
}
