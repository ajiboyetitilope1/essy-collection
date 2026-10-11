import React from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View, type ImageSourcePropType, type TextInputProps, type ViewStyle } from 'react-native';
import { colors, font, radius, spacing } from '@/theme/tokens';

export function Label({ children, style }: React.PropsWithChildren<{ style?: object }>) {
  return <Text style={[styles.label, style]}>{children}</Text>;
}

export function IconButton({ symbol, onPress, accessibilityLabel, badge }: {
  symbol: string; onPress: () => void; accessibilityLabel: string; badge?: number;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={accessibilityLabel} style={styles.iconButton}>
      <>{symbol === "bag" ? <View style={styles.bagIcon}><View style={styles.bagHandle} /><View style={styles.bagBody} /></View> : <Text style={styles.iconGlyph}>{symbol}</Text>}</>
      {badge ? <View style={styles.badge}><Text style={styles.badgeText}>{badge}</Text></View> : null}
    </Pressable>
  );
}

export function AppHeader({ onBagPress, cartCount, onSearchPress }: { onBagPress: () => void; cartCount: number; onSearchPress?: () => void }) {
  return (
    <View style={styles.header}>
      <IconButton symbol="⌕" accessibilityLabel="Search" onPress={onSearchPress ?? (() => {})} />
      <View style={styles.brandLockup}>
        <Text style={styles.brand}>ESSY</Text>
        <Text style={styles.brandSub}>COLLECTION</Text>
      </View>
      <IconButton symbol="bag" accessibilityLabel="Shopping bag" onPress={onBagPress} badge={cartCount || undefined} />
    </View>
  );
}

export function PrimaryButton({ title, onPress, style, disabled, trailing }: {
  title: string; onPress: () => void; style?: ViewStyle; disabled?: boolean; trailing?: string;
}) {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={({ pressed }) => [
      styles.primaryButton, style, disabled && styles.disabledButton, pressed && !disabled && styles.pressed,
    ]}>
      <Text style={styles.primaryButtonText}>{title}</Text>
      {trailing ? <Text style={styles.primaryButtonText}>{trailing}</Text> : null}
    </Pressable>
  );
}

export function OutlineButton({ title, onPress }: { title: string; onPress: () => void }) {
  return <Pressable onPress={onPress} style={styles.outlineButton}><Text style={styles.outlineButtonText}>{title}</Text></Pressable>;
}

export function Chip({ label, selected, onPress }: { label: string; selected?: boolean; onPress: () => void }) {
  return <Pressable onPress={onPress} style={[styles.chip, selected && styles.chipSelected]}>
    <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
  </Pressable>;
}

export function SectionTitle({ eyebrow, title, action, onAction }: {
  eyebrow?: string; title: string; action?: string; onAction?: () => void;
}) {
  return <View style={styles.sectionTitle}>
    <View>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.sectionHeading}>{title}</Text>
    </View>
    {action ? <Pressable onPress={onAction}><Text style={styles.textAction}>{action} ↗</Text></Pressable> : null}
  </View>;
}

export function ProductImage({ source, style, imageStyle }: { source: ImageSourcePropType; style?: ViewStyle; imageStyle?: object }) {
  return <View style={[styles.imageFrame, style]}>
    <Image source={source} style={[StyleSheet.absoluteFill, imageStyle]} resizeMode="cover" />
  </View>;
}

export function FormField({ label, placeholder, ...props }: TextInputProps & { label: string; placeholder: string }) {
  return <View style={styles.formField}>
    <Text style={styles.formLabel}>{label}</Text>
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={colors.muted}
      style={styles.input}
      autoCapitalize="words"
      {...props}
    />
  </View>;
}

export function Rule({ style }: { style?: ViewStyle }) {
  return <View style={[styles.rule, style]} />;
}

const styles = StyleSheet.create({
  label: { color: colors.ink, fontFamily: font.bodyMedium, fontSize: 14 },
  header: { height: 62, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brandLockup: { alignItems: 'center', marginLeft: -5 },
  brand: { color: colors.ink, fontFamily: font.displayBold, fontSize: 26, letterSpacing: 5, lineHeight: 26 },
  brandSub: { color: colors.muted, fontFamily: font.bodyMedium, fontSize: 7, letterSpacing: 2.8, marginTop: 2 },
  iconButton: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  iconGlyph: { color: colors.ink, fontSize: 24, lineHeight: 27 },
  bagIcon: { width: 18, height: 20, alignItems: "center", justifyContent: "flex-end" },
  bagHandle: { position: "absolute", top: 0, width: 9, height: 8, borderWidth: 1.4, borderColor: colors.ink, borderBottomWidth: 0, borderTopLeftRadius: 6, borderTopRightRadius: 6 },
  bagBody: { width: 17, height: 13, borderWidth: 1.4, borderColor: colors.ink, borderRadius: 3 },
  badge: { position: 'absolute', top: 1, right: 1, minWidth: 17, height: 17, borderRadius: 9, backgroundColor: colors.rust, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  badgeText: { color: colors.white, fontFamily: font.bodyBold, fontSize: 9 },
  primaryButton: { minHeight: 54, borderRadius: radius.pill, paddingHorizontal: spacing.lg, backgroundColor: colors.ink, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  primaryButtonText: { color: colors.white, fontFamily: font.bodyMedium, fontSize: 13, letterSpacing: 0.4 },
  disabledButton: { opacity: 0.4 },
  pressed: { opacity: 0.82, transform: [{ scale: 0.99 }] },
  outlineButton: { minHeight: 50, borderRadius: radius.pill, borderColor: colors.ink, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  outlineButtonText: { color: colors.ink, fontFamily: font.bodyMedium, fontSize: 13 },
  chip: { paddingHorizontal: 17, height: 38, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.line, justifyContent: 'center', backgroundColor: colors.white },
  chipSelected: { backgroundColor: colors.ink, borderColor: colors.ink },
  chipText: { color: colors.ink, fontFamily: font.body, fontSize: 12 },
  chipTextSelected: { color: colors.white },
  sectionTitle: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16 },
  eyebrow: { color: colors.rust, fontFamily: font.bodyMedium, fontSize: 9, letterSpacing: 1.8, textTransform: 'uppercase', marginBottom: 6 },
  sectionHeading: { color: colors.ink, fontFamily: font.display, fontSize: 31, lineHeight: 34 },
  textAction: { color: colors.olive, fontFamily: font.bodyMedium, fontSize: 11, paddingBottom: 4 },
  imageFrame: { overflow: 'hidden', backgroundColor: colors.sand },
  formField: { marginBottom: 14 },
  formLabel: { color: colors.ink, fontFamily: font.bodyMedium, fontSize: 11, marginBottom: 8 },
  input: { height: 48, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, borderRadius: radius.sm, paddingHorizontal: 14, color: colors.ink, fontFamily: font.body, fontSize: 13 },
  rule: { height: 1, backgroundColor: colors.line },
});

