import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton, PrimaryButton, Rule } from '@/components/ui';
import { products } from '@/data/products';
import { useStore } from '@/providers/StoreProvider';
import { colors, font, radius } from '@/theme/tokens';

const sizes = ['XS', 'S', 'M', 'L', 'XL'];
export default function ProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = products.find((item) => item.id === id) ?? products[0];
  const [size, setSize] = useState('S');
  const { addToBag, saved, toggleSaved } = useStore();
  const isSaved = saved.includes(product.id);

  return <SafeAreaView style={styles.safe} edges={['top']}>
    <View style={styles.topBar}>
      <IconButton symbol="‹" accessibilityLabel="Go back" onPress={() => router.back()} />
      <Text style={styles.brand}>ESSY</Text>
      <IconButton symbol={isSaved ? '♥' : '♡'} accessibilityLabel={isSaved ? 'Remove from saved' : 'Save item'} onPress={() => toggleSaved(product.id)} />
    </View>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Image source={{ uri: product.image }} resizeMode="cover" style={StyleSheet.absoluteFill} />
        <View style={styles.productBadge}><Text style={styles.badgeText}>{product.badge ?? 'A considered essential'}</Text></View>
        <Text style={styles.imageCount}>01  /  03</Text>
      </View>
      <View style={styles.productIntro}>
        <View style={styles.namePrice}>
          <View style={styles.nameWrap}>
            <Text style={styles.eyebrow}>{product.category.toUpperCase()} · ESSY STUDIO</Text>
            <Text style={styles.name}>{product.name}</Text>
          </View>
          <Text style={styles.price}>£{product.price}</Text>
        </View>
        <Text style={styles.rating}>★★★★★  <Text style={styles.ratingMeta}>4.8  ·  26 reviews</Text></Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
      <Rule style={styles.rule} />
      <View style={styles.option}>
        <View style={styles.optionHeader}><Text style={styles.optionTitle}>Colour</Text><Text style={styles.optionValue}>{product.colorName}</Text></View>
        <View style={styles.swatches}>
          {[product.color, '#252521', '#A48670'].map((colour, index) =>
            <Pressable key={colour} onPress={() => {}} style={[styles.swatch, { backgroundColor: colour }, index === 0 && styles.swatchSelected]} />
          )}
        </View>
      </View>
      <View style={styles.option}>
        <View style={styles.optionHeader}><Text style={styles.optionTitle}>Select your size</Text><Text style={styles.sizeGuide}>Size guide ↗</Text></View>
        <View style={styles.sizes}>
          {sizes.map((item) => <Pressable key={item} onPress={() => setSize(item)} style={[styles.size, size === item && styles.sizeSelected]}>
            <Text style={[styles.sizeText, size === item && styles.sizeTextSelected]}>{item}</Text>
          </Pressable>)}
        </View>
        <Text style={styles.fitNote}>True to size · Model: 5 ft 9 in, wearing size S</Text>
      </View>
      <View style={styles.promise}><Text style={styles.promiseMark}>✳</Text><Text style={styles.promiseText}>Free delivery over £150 · Easy 30-day returns</Text></View>
    </ScrollView>
    <View style={styles.bottom}>
      <PrimaryButton title="Add to bag" trailing={`£${product.price}`} onPress={() => { addToBag(product.id, size); router.push('/bag'); }} />
      <Text style={styles.secure}>Thoughtful delivery, always.</Text>
    </View>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  topBar: { height: 53, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brand: { color: colors.ink, fontFamily: font.displayBold, fontSize: 21, letterSpacing: 4 },
  content: { paddingBottom: 18 },
  hero: { height: 440, marginHorizontal: 19, borderRadius: radius.lg, backgroundColor: colors.sand, overflow: 'hidden' },
  productBadge: { position: 'absolute', left: 14, top: 14, paddingHorizontal: 11, paddingVertical: 7, borderRadius: radius.pill, backgroundColor: 'rgba(255,254,252,0.9)' },
  badgeText: { color: colors.olive, fontFamily: font.bodyMedium, fontSize: 9 },
  imageCount: { position: 'absolute', bottom: 15, right: 15, color: colors.white, fontFamily: font.bodyMedium, fontSize: 9, letterSpacing: 1 },
  productIntro: { paddingHorizontal: 22, paddingTop: 21, paddingBottom: 18 },
  namePrice: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8 },
  nameWrap: { flex: 1 },
  eyebrow: { color: colors.rust, fontFamily: font.bodyMedium, fontSize: 8, letterSpacing: 1.4, marginBottom: 6 },
  name: { color: colors.ink, fontFamily: font.display, fontSize: 30, lineHeight: 31 },
  price: { color: colors.ink, fontFamily: font.bodyMedium, fontSize: 14, paddingBottom: 3 },
  rating: { color: colors.rust, fontSize: 11, marginTop: 11, letterSpacing: 0.5 },
  ratingMeta: { color: colors.muted, fontFamily: font.body, fontSize: 10, letterSpacing: 0 },
  description: { color: colors.muted, fontFamily: font.body, fontSize: 11, lineHeight: 18, marginTop: 11 },
  rule: { marginHorizontal: 22 },
  option: { paddingHorizontal: 22, paddingTop: 17 },
  optionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  optionTitle: { color: colors.ink, fontFamily: font.bodyMedium, fontSize: 11 },
  optionValue: { color: colors.muted, fontFamily: font.body, fontSize: 10 },
  sizeGuide: { color: colors.olive, fontFamily: font.body, fontSize: 10 },
  swatches: { flexDirection: 'row', gap: 11 },
  swatch: { width: 25, height: 25, borderRadius: 13, borderWidth: 1, borderColor: colors.line },
  swatchSelected: { borderWidth: 2, borderColor: colors.white } as object,
  sizes: { flexDirection: 'row', gap: 8 },
  size: { flex: 1, height: 40, borderRadius: radius.sm, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  sizeSelected: { backgroundColor: colors.ink, borderColor: colors.ink },
  sizeText: { color: colors.ink, fontFamily: font.body, fontSize: 11 },
  sizeTextSelected: { color: colors.white },
  fitNote: { color: colors.muted, fontFamily: font.body, fontSize: 9, marginTop: 10 },
  promise: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 22, paddingVertical: 12, backgroundColor: colors.pale },
  promiseMark: { color: colors.rust },
  promiseText: { color: colors.olive, fontFamily: font.body, fontSize: 9 },
  bottom: { paddingHorizontal: 20, paddingTop: 11, paddingBottom: 8, backgroundColor: colors.paper, borderTopWidth: 1, borderTopColor: colors.line },
  secure: { textAlign: 'center', color: colors.muted, fontFamily: font.body, fontSize: 9, marginTop: 8 },
});


