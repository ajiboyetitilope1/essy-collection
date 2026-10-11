import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/ui';
import { ProductGrid } from '@/components/ProductGrid';
import { products } from '@/data/products';
import { useStore } from '@/providers/StoreProvider';
import { colors, font } from '@/theme/tokens';

export default function SavedScreen() {
  const { saved, cartCount } = useStore();
  const items = products.filter((product) => saved.includes(product.id));
  return <SafeAreaView style={styles.safe} edges={['top']}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      <AppHeader cartCount={cartCount} onBagPress={() => router.push('/bag')} onSearchPress={() => router.push('/new-in')} />
      <Text style={styles.eyebrow}>YOUR EDIT</Text>
      <Text style={styles.title}>Saved pieces</Text>
      <Text style={styles.description}>{items.length ? 'For later, or for right now.' : 'Keep the pieces you love close.'}</Text>
      <ProductGrid items={items} onProductPress={(id) => router.push({ pathname: '/product/[id]', params: { id } })} emptyTitle="Your saved edit is waiting" />
    </ScrollView>
  </SafeAreaView>;
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  content: { paddingHorizontal: 19, paddingBottom: 30 },
  eyebrow: { color: colors.rust, fontFamily: font.bodyMedium, fontSize: 9, letterSpacing: 1.9, marginTop: 14 },
  title: { color: colors.ink, fontFamily: font.display, fontSize: 41, lineHeight: 45, marginTop: 4 },
  description: { color: colors.muted, fontFamily: font.body, fontSize: 11, marginTop: 3, marginBottom: 22 },
});
