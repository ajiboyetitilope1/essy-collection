import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, font, radius } from '@/theme/tokens';

export default function OrderConfirmationScreen() {
  return <SafeAreaView style={styles.safe}>
    <View style={styles.center}>
      <View style={styles.mark}><Text style={styles.markText}>✳</Text></View>
      <Text style={styles.eyebrow}>THANK YOU FOR CHOOSING ESSY</Text>
      <Text style={styles.title}>Something lovely{ '\n' }is on its way.</Text>
      <Text style={styles.copy}>Your order is confirmed. We’ll send a note with all the details as soon as it’s on its way.</Text>
      <Text style={styles.orderNumber}>ORDER  ·  EC—2026—0418</Text>
      <Pressable onPress={() => router.replace('/')} style={styles.button}><Text style={styles.buttonText}>Back to the collection  ↗</Text></Pressable>
    </View>
    <Text style={styles.footer}>ESSY COLLECTION</Text>
  </SafeAreaView>;
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper, justifyContent: 'center', paddingHorizontal: 28 },
  center: { alignItems: 'center' },
  mark: { width: 62, height: 62, borderRadius: 31, backgroundColor: colors.olive, alignItems: 'center', justifyContent: 'center' },
  markText: { color: colors.white, fontSize: 24 },
  eyebrow: { color: colors.rust, fontFamily: font.bodyMedium, fontSize: 8, letterSpacing: 1.7, marginTop: 28 },
  title: { color: colors.ink, textAlign: 'center', fontFamily: font.display, fontSize: 43, lineHeight: 42, marginTop: 12 },
  copy: { color: colors.muted, fontFamily: font.body, fontSize: 12, textAlign: 'center', lineHeight: 20, maxWidth: 285, marginTop: 13 },
  orderNumber: { color: colors.olive, fontFamily: font.bodyMedium, fontSize: 9, letterSpacing: 1.3, marginTop: 25 },
  button: { backgroundColor: colors.ink, borderRadius: radius.pill, paddingHorizontal: 21, paddingVertical: 15, marginTop: 30 },
  buttonText: { color: colors.white, fontFamily: font.bodyMedium, fontSize: 10 },
  footer: { position: 'absolute', bottom: 30, alignSelf: 'center', color: colors.muted, fontFamily: font.displayBold, letterSpacing: 3, fontSize: 13 },
});
