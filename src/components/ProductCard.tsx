import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { type Product } from '@/data/products';
import { colors, font, radius } from '@/theme/tokens';
import { ProductImage } from '@/components/ui';

export function ProductCard({ product, onPress, onFavorite, saved }: {
  product: Product; onPress: () => void; onFavorite: () => void; saved: boolean;
}) {
  return (
    <View style={styles.card}>
      <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={`View ${product.name}`}>
        <View style={styles.imageWrap}>
          <ProductImage source={{ uri: product.image }} style={styles.image} />
          {product.badge ? <View style={styles.badge}><Text style={styles.badgeText}>{product.badge}</Text></View> : null}
        </View>
      </Pressable>
      <Pressable onPress={onFavorite} accessibilityRole="button" accessibilityLabel={saved ? 'Remove from saved items' : 'Save item'} style={styles.heart}>
        <Text style={[styles.heartText, saved && styles.heartSelected]}>{saved ? '♥' : '♡'}</Text>
      </Pressable>
      <View style={styles.details}>
        <Text numberOfLines={1} style={styles.name}>{product.name}</Text>
        <Text style={styles.category}>{product.category} · {product.colorName}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>£{product.price}</Text>
          {product.oldPrice ? <Text style={styles.oldPrice}>£{product.oldPrice}</Text> : null}
          <View style={[styles.swatch, { backgroundColor: product.color }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, minWidth: 0 },
  imageWrap: { position: 'relative', borderRadius: radius.md, overflow: 'hidden' },
  image: { height: 230, borderRadius: radius.md },
  badge: { position: 'absolute', left: 10, top: 10, backgroundColor: colors.paper, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 6 },
  badgeText: { color: colors.olive, fontFamily: font.bodyMedium, fontSize: 9, letterSpacing: 0.7 },
  heart: { position: 'absolute', top: 8, right: 8, width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,254,252,0.9)' },
  heartText: { fontSize: 20, color: colors.ink, lineHeight: 22 },
  heartSelected: { color: colors.rust },
  details: { paddingTop: 10, paddingBottom: 7 },
  name: { color: colors.ink, fontFamily: font.bodyMedium, fontSize: 12 },
  category: { color: colors.muted, fontFamily: font.body, fontSize: 10, marginTop: 3 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 7 },
  price: { color: colors.ink, fontFamily: font.bodyMedium, fontSize: 12 },
  oldPrice: { color: colors.muted, fontFamily: font.body, fontSize: 10, marginLeft: 7, textDecorationLine: 'line-through' },
  swatch: { width: 12, height: 12, borderRadius: 6, marginLeft: 'auto', borderWidth: 1, borderColor: 'rgba(37,37,33,0.12)' },
});
