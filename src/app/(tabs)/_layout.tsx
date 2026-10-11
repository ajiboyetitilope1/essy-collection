import React from 'react';
import { Tabs } from 'expo-router';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { StyleSheet } from 'react-native';
import { colors, font } from '@/theme/tokens';

const icons: Record<'home' | 'new' | 'saved' | 'account', SymbolViewProps['name']> = {
  home: { ios: 'house', android: 'home', web: 'home' },
  new: { ios: 'sparkles', android: 'auto_awesome', web: 'auto_awesome' },
  saved: { ios: 'heart', android: 'favorite', web: 'favorite' },
  account: { ios: 'person.crop.circle', android: 'person', web: 'person' },
};

function TabIcon({ name, color }: { name: SymbolViewProps['name']; color: string }) {
  return <SymbolView name={name} tintColor={color} size={21} />;
}

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.ink,
      tabBarInactiveTintColor: colors.muted,
      tabBarLabelStyle: styles.label,
      tabBarStyle: styles.tabBar,
      tabBarItemStyle: styles.tabItem,
      sceneStyle: { backgroundColor: colors.paper },
    }}>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color }) => <TabIcon name={icons.home} color={String(color)} /> }} />
      <Tabs.Screen name="new-in" options={{ title: 'New in', tabBarIcon: ({ color }) => <TabIcon name={icons.new} color={String(color)} /> }} />
      <Tabs.Screen name="saved" options={{ title: 'Saved', tabBarIcon: ({ color }) => <TabIcon name={icons.saved} color={String(color)} /> }} />
      <Tabs.Screen name="account" options={{ title: 'Account', tabBarIcon: ({ color }) => <TabIcon name={icons.account} color={String(color)} /> }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: { height: 67, paddingTop: 8, paddingBottom: 7, backgroundColor: colors.white, borderTopColor: colors.line, elevation: 0 },
  tabItem: { paddingTop: 1 },
  label: { fontFamily: font.body, fontSize: 9, marginTop: 1 },
});
