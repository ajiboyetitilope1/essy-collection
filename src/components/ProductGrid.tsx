import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { type Product } from '@/data/products';
import { useStore } from '@/providers/StoreProvider';
import { ProductCard } from '@/components/ProductCard';
import { colors, font, spacing } from '@/theme/tokens';

export function ProductGrid({ items, onProductPress, emptyTitle = 'Nothing here just yet' }: {
  items: Product[]; onProductPress: (id: string) => void; emptyTitle?: string;
}) {
  const { saved, toggleSaved } = useStore();
  if (!items.length) return <View style={styles.empty}><Text style={styles.emptyTitle}>{emptyTitle}</Text><Text style={styles.emptyCopy}>Save something lovely and it will find its way here.</Text></View>;
  const rows: Product[][] = [];
  for (let i = 0; i < items.length; i += 2) rows.push(items.slice(i, i + 2));
  return <View style={styles.grid}>
    {rows.map((row, index) => <View style={styles.row} key={row[0].id}>
      {row.map((product) => <ProductCard key={product.id} product={product} saved={saved.includes(product.id)}
        onPress={() => onProductPress(product.id)} onFavorite={() => toggleSaved(product.id)} />)}
      {row.length === 1 ? <View style={styles.cardSpacer} /> : null}
    </View>)}
  </View>;
}

const styles = StyleSheet.create({
  grid: { gap: spacing.lg },
  row: { flexDirection: 'row', gap: 12 },
  cardSpacer: { flex: 1 },
  empty: { alignItems: 'center', paddingVertical: 56, paddingHorizontal: 22 },
  emptyTitle: { color: colors.ink, fontFamily: font.display, fontSize: 27 },
  emptyCopy: { color: colors.muted, fontFamily: font.body, fontSize: 12, textAlign: 'center', marginTop: 8, lineHeight: 19 },
});

