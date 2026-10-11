import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader, Rule } from '@/components/ui';
import { useStore } from '@/providers/StoreProvider';
import { colors, font, radius } from '@/theme/tokens';

const links = ['Your orders', 'Delivery & returns', 'The ESSY story', 'Get in touch'];
export default function AccountScreen() {
  const { cartCount } = useStore();
  return <SafeAreaView style={styles.safe} edges={['top']}>
    <ScrollView contentContainerStyle={styles.content}>
      <AppHeader cartCount={cartCount} onBagPress={() => router.push('/bag')} onSearchPress={() => router.push('/new-in')} />
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>A WARDROBE, MORE YOU</Text>
        <Text style={styles.title}>Welcome to{ '\n' }your ESSY.</Text>
        <Text style={styles.copy}>Sign in to keep your order history, delivery details, and favourites together.</Text>
        <Pressable style={styles.signIn}><Text style={styles.signText}>Sign in / Create account  ↗</Text></Pressable>
      </View>
      <Text style={styles.section}>A little help</Text>
      <View style={styles.links}>
        {links.map((item, i) => <React.Fragment key={item}>
          <Pressable style={styles.linkRow} onPress={() => item === 'Your orders' ? router.push('/bag') : undefined}>
            <Text style={styles.linkText}>{item}</Text><Text style={styles.arrow}>↗</Text>
          </Pressable>
          {i < links.length - 1 ? <Rule /> : null}
        </React.Fragment>)}
      </View>
      <Text style={styles.footer}>Thoughtful pieces. A thoughtful experience.</Text>
    </ScrollView>
  </SafeAreaView>;
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  content: { paddingHorizontal: 19, paddingBottom: 30 },
  hero: { backgroundColor: colors.sand, borderRadius: radius.lg, padding: 25, paddingVertical: 31, marginTop: 12 },
  eyebrow: { color: colors.rust, fontFamily: font.bodyMedium, fontSize: 9, letterSpacing: 1.8 },
  title: { color: colors.ink, fontFamily: font.display, fontSize: 43, lineHeight: 40, marginTop: 13 },
  copy: { color: colors.muted, fontFamily: font.body, fontSize: 12, lineHeight: 19, marginTop: 12, maxWidth: 280 },
  signIn: { alignSelf: 'flex-start', marginTop: 24, borderBottomColor: colors.olive, borderBottomWidth: 1, paddingBottom: 7 },
  signText: { color: colors.olive, fontFamily: font.bodyMedium, fontSize: 11 },
  section: { color: colors.ink, fontFamily: font.display, fontSize: 29, marginTop: 29, marginBottom: 8 },
  links: { backgroundColor: colors.white, borderRadius: radius.md, paddingHorizontal: 16 },
  linkRow: { height: 55, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  linkText: { color: colors.ink, fontFamily: font.body, fontSize: 12 },
  arrow: { color: colors.olive, fontSize: 14 },
  footer: { color: colors.muted, fontFamily: font.display, fontSize: 21, textAlign: 'center', marginTop: 34 },
});
