import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton, PrimaryButton, Rule } from '@/components/ui';
import { useStore } from '@/providers/StoreProvider';
import { colors, font, radius } from '@/theme/tokens';

const shippingThreshold = 150;
export default function BagScreen() {
  const { cart, getProduct, subtotal, updateQuantity, removeFromBag } = useStore();
  const delivery = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 8;
  return <SafeAreaView style={styles.safe} edges={['top']}>
    <View style={styles.topBar}>
      <IconButton symbol="‹" accessibilityLabel="Go back" onPress={() => router.back()} />
      <Text style={styles.title}>Your bag <Text style={styles.count}>({cart.reduce((sum, line) => sum + line.quantity, 0)})</Text></Text>
      <View style={{ width: 42 }} />
    </View>
    {cart.length ? <>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.deliveryNote}>
          <Text style={styles.deliveryMark}>✳</Text>
          <Text style={styles.deliveryText}>{subtotal >= shippingThreshold ? 'You’ve unlocked complimentary delivery.' : `You’re £${(shippingThreshold - subtotal).toFixed(0)} away from complimentary delivery.`}</Text>
        </View>
        {cart.map((line) => {
          const product = getProduct(line.productId);
          if (!product) return null;
          return <View key={line.productId + line.size} style={styles.lineItem}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemCategory}>{product.category.toUpperCase()} · {product.colorName.toUpperCase()}</Text>
              <Text style={styles.itemName}>{product.name}</Text>
              <Text style={styles.itemMeta}>Size {line.size}</Text>
              <View style={styles.itemBottom}>
                <Text style={styles.itemPrice}>£{product.price}</Text>
                <View style={styles.quantity}>
                  <Pressable onPress={() => updateQuantity(line.productId, line.size, line.quantity - 1)} style={styles.quantityButton}><Text style={styles.quantityGlyph}>−</Text></Pressable>
                  <Text style={styles.quantityValue}>{line.quantity}</Text>
                  <Pressable onPress={() => updateQuantity(line.productId, line.size, line.quantity + 1)} style={styles.quantityButton}><Text style={styles.quantityGlyph}>+</Text></Pressable>
                </View>
              </View>
              <Pressable onPress={() => removeFromBag(line.productId, line.size)} style={styles.remove}><Text style={styles.removeText}>Remove</Text></Pressable>
            </View>
          </View>;
        })}
        <Rule style={{ marginTop: 6 }} />
        <Text style={styles.summaryTitle}>Order summary</Text>
        <PriceRow label="Subtotal" value={`£${subtotal.toFixed(2)}`} />
        <PriceRow label="Delivery" value={delivery === 0 ? 'Complimentary' : `£${delivery.toFixed(2)}`} />
        <Rule style={{ marginVertical: 11 }} />
        <PriceRow label="Total" value={`£${(subtotal + delivery).toFixed(2)}`} strong />
        <Text style={styles.taxNote}>Including applicable taxes. Shipping calculated at checkout.</Text>
        <Pressable onPress={() => router.push('/new-in')} style={styles.continue}><Text style={styles.continueText}>Continue browsing  ↗</Text></Pressable>
      </ScrollView>
      <View style={styles.bottom}><PrimaryButton title="Continue to checkout" trailing="→" onPress={() => router.push('/checkout')} /></View>
    </> : <View style={styles.empty}>
      <Text style={styles.emptyMark}>ESSY</Text>
      <Text style={styles.emptyTitle}>A little room for something lovely.</Text>
      <Text style={styles.emptyCopy}>Your bag is waiting for pieces that feel like you.</Text>
      <Pressable onPress={() => router.replace('/new-in')} style={styles.shopButton}><Text style={styles.shopButtonText}>Explore the collection  ↗</Text></Pressable>
    </View>}
  </SafeAreaView>;
}

function PriceRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return <View style={styles.priceRow}><Text style={[styles.summaryLabel, strong && styles.strong]}>{label}</Text><Text style={[styles.summaryValue, strong && styles.strong]}>{value}</Text></View>;
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  topBar: { height: 56, paddingHorizontal: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: colors.ink, fontFamily: font.display, fontSize: 30 },
  count: { color: colors.muted, fontFamily: font.body, fontSize: 12 },
  content: { paddingHorizontal: 19, paddingBottom: 25 },
  deliveryNote: { height: 42, borderRadius: radius.sm, backgroundColor: '#E8EBE3', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginVertical: 8 },
  deliveryMark: { color: colors.olive, fontSize: 13 },
  deliveryText: { color: colors.olive, fontFamily: font.body, fontSize: 10 },
  lineItem: { flexDirection: 'row', paddingVertical: 16, gap: 14 },
  productImage: { width: 116, height: 148, borderRadius: radius.md, backgroundColor: colors.sand },
  itemInfo: { flex: 1, paddingTop: 4 },
  itemCategory: { color: colors.rust, fontFamily: font.bodyMedium, fontSize: 8, letterSpacing: 1.2 },
  itemName: { color: colors.ink, fontFamily: font.display, fontSize: 22, lineHeight: 23, marginTop: 6 },
  itemMeta: { color: colors.muted, fontFamily: font.body, fontSize: 10, marginTop: 6 },
  itemBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 13 },
  itemPrice: { color: colors.ink, fontFamily: font.bodyMedium, fontSize: 12 },
  quantity: { height: 31, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.line, borderRadius: radius.pill, backgroundColor: colors.white },
  quantityButton: { width: 29, alignItems: 'center' },
  quantityGlyph: { color: colors.ink, fontFamily: font.body, fontSize: 15 },
  quantityValue: { color: colors.ink, fontFamily: font.body, fontSize: 10, minWidth: 16, textAlign: 'center' },
  remove: { alignSelf: 'flex-start', paddingTop: 9 },
  removeText: { color: colors.muted, fontFamily: font.body, fontSize: 9, textDecorationLine: 'underline' },
  summaryTitle: { color: colors.ink, fontFamily: font.display, fontSize: 27, marginTop: 20, marginBottom: 11 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 6 },
  summaryLabel: { color: colors.muted, fontFamily: font.body, fontSize: 11 },
  summaryValue: { color: colors.ink, fontFamily: font.body, fontSize: 11 },
  strong: { color: colors.ink, fontFamily: font.bodyMedium, fontSize: 13 },
  taxNote: { color: colors.muted, fontFamily: font.body, fontSize: 9, lineHeight: 15, marginTop: 7 },
  continue: { alignSelf: 'center', marginTop: 22 },
  continueText: { color: colors.olive, fontFamily: font.bodyMedium, fontSize: 10 },
  bottom: { paddingHorizontal: 20, paddingVertical: 12, borderTopWidth: 1, borderTopColor: colors.line },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 35 },
  emptyMark: { color: colors.olive, fontFamily: font.displayBold, letterSpacing: 5, fontSize: 24 },
  emptyTitle: { color: colors.ink, fontFamily: font.display, fontSize: 32, textAlign: 'center', lineHeight: 34, marginTop: 20 },
  emptyCopy: { color: colors.muted, fontFamily: font.body, fontSize: 12, lineHeight: 19, textAlign: 'center', marginTop: 9 },
  shopButton: { backgroundColor: colors.ink, paddingHorizontal: 22, paddingVertical: 15, borderRadius: radius.pill, marginTop: 24 },
  shopButtonText: { color: colors.white, fontFamily: font.bodyMedium, fontSize: 11 },
});
