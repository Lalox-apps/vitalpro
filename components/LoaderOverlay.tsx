import { useLoaderStore } from '@/stores/loaderStorage';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function LoaderOverlay() {
  const visible = useLoaderStore((s) => s.visible);

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
});
