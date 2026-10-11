import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormField, IconButton, PrimaryButton, Rule } from '@/components/ui';
import { useStore } from '@/providers/StoreProvider';
import { colors, font, radius } from '@/theme/tokens';

export default function CheckoutScreen() {
  const { cart, getProduct, subtotal, clearBag } = useStore();
  const [payment, setPayment] = useState<'card' | 'apple'>('card');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const total = subtotal + (subtotal >= 150 || subtotal === 0 ? 0 : 8);

  const placeOrder = () => {
    clearBag();
    router.replace('/order-confirmation');
  };

  return <SafeAreaView style={styles.safe} edges={['top']}>
    <View style={styles.topBar}>
      <IconButton symbol="‹" accessibilityLabel="Return to bag" onPress={() => router.back()} />
      <View style={styles.headings}><Text style={styles.title}>A few final details</Text><Text style={styles.subtitle}>A lovely choice, by the way.</Text></View>
      <Text style={styles.lock}>⌑</Text>
    </View>
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.stepRow}><Text style={styles.stepActive}>01  DELIVERY</Text><View style={styles.stepLine} /><Text style={styles.step}>02  PAYMENT</Text></View>
        <Text style={styles.sectionTitle}>Contact details</Text>
        <FormField label="Email address" placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
        <Text style={styles.sectionTitle}>Delivery address</Text>
        <FormField label="Full name" placeholder="Your name" value={name} onChangeText={setName} />
        <FormField label="Address" placeholder="House number and street" />
        <View style={styles.fieldRow}>
          <View style={{ flex: 1 }}><FormField label="Town / city" placeholder="City" /></View>
          <View style={{ flex: 1 }}><FormField label="Postcode" placeholder="Postcode" autoCapitalize="characters" /></View>
        </View>
        <Text style={styles.sectionTitle}>Delivery</Text>
        <View style={styles.deliveryCard}>
          <View style={styles.radioSelected}><View style={styles.radioDot} /></View>
          <View style={{ flex: 1 }}><Text style={styles.deliveryTitle}>Standard delivery</Text><Text style={styles.deliverySubtitle}>2–4 working days · Thoughtfully packed</Text></View>
          <Text style={styles.deliveryCost}>{subtotal >= 150 ? 'FREE' : '£8'}</Text>
        </View>
        <Text style={styles.sectionTitle}>Payment method</Text>
        <Pressable onPress={() => setPayment('card')} style={[styles.paymentCard, payment === 'card' && styles.paymentSelected]}>
          <View style={payment === 'card' ? styles.radioSelected : styles.radio}><View style={payment === 'card' ? styles.radioDot : null} /></View>
          <Text style={styles.paymentIcon}>▰</Text><Text style={styles.paymentTitle}>Credit or debit card</Text>
        </Pressable>
        <Pressable onPress={() => setPayment('apple')} style={[styles.paymentCard, payment === 'apple' && styles.paymentSelected]}>
          <View style={payment === 'apple' ? styles.radioSelected : styles.radio}><View style={payment === 'apple' ? styles.radioDot : null} /></View>
          <Text style={styles.paymentIcon}>●</Text><Text style={styles.paymentTitle}>Apple Pay</Text>
        </Pressable>
        <View style={styles.orderCard}>
          <Text style={styles.orderTitle}>In your order</Text>
          {cart.map((line) => {
            const item = getProduct(line.productId);
            return item ? <View style={styles.orderLine} key={line.productId + line.size}>
              <Text numberOfLines={1} style={styles.orderName}>{line.quantity} × {item.name}</Text>
              <Text style={styles.orderPrice}>£{item.price * line.quantity}</Text>
            </View> : null;
          })}
          <Rule style={{ marginVertical: 9 }} />
          <View style={styles.orderLine}><Text style={styles.totalLabel}>Total</Text><Text style={styles.totalPrice}>£{total.toFixed(2)}</Text></View>
          <Text style={styles.tax}>Including applicable taxes</Text>
        </View>
        <Text style={styles.terms}>By placing your order you agree to our terms of service and returns policy.</Text>
      </ScrollView>
    </KeyboardAvoidingView>
    <View style={styles.bottom}><PrimaryButton title="Place order" trailing={`£${total.toFixed(2)}  →`} onPress={placeOrder} disabled={!cart.length} /></View>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  topBar: { minHeight: 62, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 },
  headings: { flex: 1, alignItems: 'center' },
  title: { color: colors.ink, fontFamily: font.display, fontSize: 25, lineHeight: 27 },
  subtitle: { color: colors.muted, fontFamily: font.body, fontSize: 9, marginTop: 1 },
  lock: { width: 42, textAlign: 'center', color: colors.olive, fontSize: 17 },
  content: { paddingHorizontal: 20, paddingBottom: 20 },
  stepRow: { flexDirection: 'row', alignItems: 'center', marginTop: 7, marginBottom: 22 },
  stepActive: { color: colors.olive, fontFamily: font.bodyMedium, fontSize: 8, letterSpacing: 1 },
  stepLine: { height: 1, flex: 1, backgroundColor: colors.line, marginHorizontal: 10 },
  step: { color: colors.muted, fontFamily: font.body, fontSize: 8, letterSpacing: 1 },
  sectionTitle: { color: colors.ink, fontFamily: font.display, fontSize: 24, marginBottom: 10, marginTop: 5 },
  fieldRow: { flexDirection: 'row', gap: 10 },
  deliveryCard: { borderWidth: 1, borderColor: colors.olive, borderRadius: radius.sm, backgroundColor: '#F0F1EB', padding: 13, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 17 },
  radioSelected: { width: 17, height: 17, borderRadius: 9, borderWidth: 1, borderColor: colors.olive, alignItems: 'center', justifyContent: 'center' },
  radioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.olive },
  radio: { width: 17, height: 17, borderRadius: 9, borderWidth: 1, borderColor: colors.line },
  deliveryTitle: { color: colors.ink, fontFamily: font.bodyMedium, fontSize: 10 },
  deliverySubtitle: { color: colors.muted, fontFamily: font.body, fontSize: 8, marginTop: 3 },
  deliveryCost: { color: colors.olive, fontFamily: font.bodyMedium, fontSize: 9 },
  paymentCard: { height: 47, borderWidth: 1, borderColor: colors.line, borderRadius: radius.sm, backgroundColor: colors.white, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginBottom: 7 },
  paymentSelected: { borderColor: colors.olive, backgroundColor: '#F0F1EB' },
  paymentIcon: { color: colors.ink, fontSize: 13 },
  paymentTitle: { color: colors.ink, fontFamily: font.body, fontSize: 10 },
  orderCard: { backgroundColor: colors.white, borderRadius: radius.md, padding: 15, marginTop: 17 },
  orderTitle: { color: colors.ink, fontFamily: font.display, fontSize: 23, marginBottom: 9 },
  orderLine: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginVertical: 4 },
  orderName: { color: colors.muted, fontFamily: font.body, fontSize: 9, flex: 1 },
  orderPrice: { color: colors.ink, fontFamily: font.body, fontSize: 9 },
  totalLabel: { color: colors.ink, fontFamily: font.bodyMedium, fontSize: 11 },
  totalPrice: { color: colors.ink, fontFamily: font.bodyMedium, fontSize: 13 },
  tax: { color: colors.muted, fontFamily: font.body, fontSize: 8, marginTop: 6 },
  terms: { color: colors.muted, fontFamily: font.body, fontSize: 8, lineHeight: 13, textAlign: 'center', marginTop: 12 },
  bottom: { paddingHorizontal: 20, paddingVertical: 12, borderTopColor: colors.line, borderTopWidth: 1 },
});
