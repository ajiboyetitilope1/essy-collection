import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { colors, font } from '@/theme/tokens';

export default function NotFoundScreen() {
  return <View style={styles.screen}>
    <Text style={styles.brand}>ESSY</Text>
    <Text style={styles.title}>This page took a different turn.</Text>
    <Pressable onPress={() => router.replace('/')}><Text style={styles.link}>Back to the collection  ↗</Text></Pressable>
  </View>;
}
const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.paper, padding: 30 },
  brand: { color: colors.olive, fontFamily: font.displayBold, fontSize: 22, letterSpacing: 4 },
  title: { color: colors.ink, fontFamily: font.display, fontSize: 31, textAlign: 'center', marginVertical: 14 },
  link: { color: colors.rust, fontFamily: font.bodyMedium, fontSize: 12 },
});
