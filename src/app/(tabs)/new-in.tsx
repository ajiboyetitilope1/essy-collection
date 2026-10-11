import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader, Chip } from '@/components/ui';
import { ProductGrid } from '@/components/ProductGrid';
import { categories, products } from '@/data/products';
import { useStore } from '@/providers/StoreProvider';
import { colors, font } from '@/theme/tokens';

export default function NewInScreen() {
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState<'Featured' | 'Price: low to high'>('Featured');
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { cartCount } = useStore();
  const filtered = useMemo(() => {
    const list = (category === 'All' ? [...products] : products.filter((product) => product.category === category))
      .filter((product) => (product.name + ' ' + product.category).toLowerCase().includes(query.trim().toLowerCase()));
    return sort === 'Price: low to high' ? list.sort((a, b) => a.price - b.price) : list;
  }, [category, query, sort]);

  return <SafeAreaView style={styles.safe} edges={['top']}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <AppHeader cartCount={cartCount} onBagPress={() => router.push('/bag')} onSearchPress={() => setSearchOpen((open) => !open)} />
      <Text style={styles.eyebrow}>FRESH FROM THE STUDIO</Text>
      <Text style={styles.title}>New arrivals</Text>
      <Text style={styles.description}>The pieces you’ll reach for, on repeat.</Text>
      {searchOpen ? <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput value={query} onChangeText={setQuery} placeholder="Find your next favourite" placeholderTextColor={colors.muted}
          style={styles.searchInput} autoFocus returnKeyType="search" />
        {query ? <Pressable onPress={() => setQuery('')}><Text style={styles.clear}>×</Text></Pressable> : null}
      </View> : null}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
        {categories.map((item) => <Chip key={item} label={item} selected={item === category} onPress={() => setCategory(item)} />)}
      </ScrollView>
      <View style={styles.resultsRow}>
        <Text style={styles.resultCount}>{filtered.length} pieces</Text>
        <Pressable onPress={() => setSort(sort === 'Featured' ? 'Price: low to high' : 'Featured')} style={styles.sortButton}>
          <Text style={styles.sortText}>{sort}  ⌄</Text>
        </Pressable>
      </View>
      <ProductGrid items={filtered} onProductPress={(id) => router.push({ pathname: '/product/[id]', params: { id } })} emptyTitle="No pieces found" />
      <Text style={styles.endNote}>A little less, a lot more considered.</Text>
    </ScrollView>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  content: { paddingHorizontal: 19, paddingBottom: 28 },
  eyebrow: { color: colors.rust, fontFamily: font.bodyMedium, fontSize: 9, letterSpacing: 1.9, marginTop: 14 },
  title: { color: colors.ink, fontFamily: font.display, fontSize: 41, lineHeight: 45, marginTop: 4 },
  description: { color: colors.muted, fontFamily: font.body, fontSize: 11, marginTop: 3 },
  searchWrap: { height: 46, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 13, borderRadius: 12, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, marginTop: 15 },
  searchIcon: { color: colors.muted, fontSize: 18, marginRight: 9 },
  searchInput: { flex: 1, color: colors.ink, fontFamily: font.body, fontSize: 11, paddingVertical: 0 },
  clear: { color: colors.muted, fontSize: 20, paddingLeft: 8 },
  filters: { gap: 8, paddingVertical: 19 },
  resultsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 13 },
  resultCount: { color: colors.muted, fontFamily: font.body, fontSize: 10 },
  sortButton: { paddingVertical: 5, paddingLeft: 12 },
  sortText: { color: colors.ink, fontFamily: font.bodyMedium, fontSize: 10 },
  endNote: { color: colors.olive, textAlign: 'center', fontFamily: font.display, fontSize: 22, marginTop: 27 },
});
