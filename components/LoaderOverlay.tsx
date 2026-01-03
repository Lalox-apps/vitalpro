import { useLoaderStore } from '@/stores/loaderStorage';
import { MotiView } from 'moti';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MotiLoader } from './MotiLoader';


export default function LoaderOverlay() {
    const visible = useLoaderStore((s) => s.visible);
  
    if (!visible) return null;
  
    return (
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: 'timing', duration: 250 }}
        style={styles.overlay}
      >
        <View style={styles.container}>
          <MotiLoader />
        </View>
      </MotiView>
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
    container: {
      width: 120,
      height: 120,
      borderRadius: 24,
      backgroundColor: 'rgba(0,0,0,0.6)',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });