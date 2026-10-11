import React, { useMemo, useState } from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader, Chip, SectionTitle } from '@/components/ui';
import { ProductGrid } from '@/components/ProductGrid';
import { categories, products } from '@/data/products';
import { useStore } from '@/providers/StoreProvider';
import { colors, font, radius } from '@/theme/tokens';

const heroImage = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=90';

export default function HomeScreen() {
  const { cartCount } = useStore();
  const [category, setCategory] = useState('All');
  const featured = useMemo(() => products.filter((item) => item.id === 'linen-dress' || item.id === 'everyday-tote'), []);
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.promo}><Text style={styles.promoText}>Complimentary delivery over £150</Text><Text style={styles.promoArrow}>↗</Text></View>
        <AppHeader cartCount={cartCount} onBagPress={() => router.push('/bag')} onSearchPress={() => router.push('/new-in')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categories}>
          {categories.map((item) => <Chip key={item} label={item} selected={category === item} onPress={() => setCategory(item)} />)}
        </ScrollView>

        <Pressable onPress={() => router.push('/new-in')} style={styles.heroWrap}>
          <ImageBackground source={{ uri: heroImage }} resizeMode="cover" style={styles.hero}>
            <View style={styles.heroTint} />
            <View style={styles.heroContent}>
              <Text style={styles.heroEyebrow}>THE SPRING EDIT · 2026</Text>
              <Text style={styles.heroTitle}>Ease, in{ '\n' }every detail.</Text>
              <Text style={styles.heroCopy}>Thoughtful pieces for the way you live now.</Text>
              <View style={styles.heroLink}><Text style={styles.heroLinkText}>Explore the edit</Text><Text style={styles.heroLinkArrow}>↗</Text></View>
            </View>
            <Text style={styles.heroIndex}>01 / 03</Text>
          </ImageBackground>
        </Pressable>

        <View style={styles.noteRow}>
          <Text style={styles.noteMark}>✳</Text>
          <Text style={styles.noteText}>Considered design. Pieces to live in.</Text>
        </View>

        <View style={styles.sectionWrap}>
          <SectionTitle eyebrow="JUST ARRIVED" title="The new collection" action="View all" onAction={() => router.push('/new-in')} />
          <ProductGrid items={category === 'All' ? featured : products.filter((product) => product.category === category).slice(0, 2)}
            onProductPress={(id) => router.push({ pathname: '/product/[id]', params: { id } })} />
        </View>

        <Pressable style={styles.storyCard} onPress={() => router.push('/new-in')}>
          <View style={styles.storyCopy}>
            <Text style={styles.eyebrow}>MADE TO BE WORN</Text>
            <Text style={styles.storyTitle}>Less, but{ '\n' }more considered.</Text>
            <Text style={styles.storyBody}>Meet the pieces earning a permanent place in your wardrobe.</Text>
            <Text style={styles.storyLink}>Our point of view  ↗</Text>
          </View>
          <View style={styles.storyImage}>
            <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85' }} style={StyleSheet.absoluteFill} resizeMode="cover" />
          </View>
        </Pressable>
        <Text style={styles.footer}>ESSY COLLECTION  ·  MADE FOR EVERY DAY</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  content: { paddingHorizontal: 19, paddingBottom: 28 },
  promo: { height: 27, backgroundColor: colors.olive, borderRadius: radius.sm, marginTop: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  promoText: { color: colors.white, fontFamily: font.body, fontSize: 9, letterSpacing: 0.6 },
  promoArrow: { color: colors.white, fontSize: 11, position: 'absolute', right: 12 },
  categories: { gap: 8, paddingVertical: 7 },
  heroWrap: { borderRadius: radius.lg, overflow: 'hidden', marginTop: 8 },
  hero: { height: 378, justifyContent: 'center', overflow: 'hidden', backgroundColor: colors.sand },
  heroTint: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(25,24,21,0.24)' },
  heroContent: { paddingHorizontal: 23, paddingTop: 46, maxWidth: '83%' },
  heroEyebrow: { color: colors.white, fontFamily: font.bodyMedium, fontSize: 9, letterSpacing: 2.1, marginBottom: 11 },
  heroTitle: { color: colors.white, fontFamily: font.display, fontSize: 51, lineHeight: 48 },
  heroCopy: { color: colors.white, fontFamily: font.body, fontSize: 12, lineHeight: 19, marginTop: 13, maxWidth: 205 },
  heroLink: { marginTop: 21, height: 39, paddingHorizontal: 14, borderRadius: radius.pill, alignSelf: 'flex-start', backgroundColor: colors.white, flexDirection: 'row', alignItems: 'center', gap: 13 },
  heroLinkText: { color: colors.ink, fontFamily: font.bodyMedium, fontSize: 10 },
  heroLinkArrow: { color: colors.ink, fontSize: 12 },
  heroIndex: { position: 'absolute', bottom: 17, right: 18, color: colors.white, fontFamily: font.body, fontSize: 9, letterSpacing: 1 },
  noteRow: { height: 54, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, borderBottomWidth: 1, borderBottomColor: colors.line },
  noteMark: { color: colors.rust, fontSize: 14 },
  noteText: { color: colors.olive, fontFamily: font.body, fontSize: 10, letterSpacing: 0.4 },
  sectionWrap: { marginTop: 28 },
  eyebrow: { color: colors.rust, fontFamily: font.bodyMedium, fontSize: 9, letterSpacing: 1.6, marginBottom: 7 },
  storyCard: { marginTop: 30, borderRadius: radius.lg, backgroundColor: colors.sand, overflow: 'hidden', minHeight: 226, flexDirection: 'row' },
  storyCopy: { flex: 1, padding: 20, justifyContent: 'center' },
  storyTitle: { color: colors.ink, fontFamily: font.display, fontSize: 31, lineHeight: 29 },
  storyBody: { color: colors.muted, fontFamily: font.body, fontSize: 10, lineHeight: 16, marginTop: 9 },
  storyLink: { color: colors.olive, fontFamily: font.bodyMedium, fontSize: 9, marginTop: 15 },
  storyImage: { width: '36%', backgroundColor: colors.clay },
  footer: { textAlign: 'center', color: colors.muted, fontFamily: font.body, fontSize: 8, letterSpacing: 1.5, marginTop: 26 },
});

