// app/(admin)/_layout.tsx
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

export default function AdminLayout() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/auth/login' as any);
    }
  }, [user, router])

  if (!user || user.role !== 'admin') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FFCE1B" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="employees" options={{ title: 'Employee Management' }} />
      <Stack.Screen name="categories" options={{ title: 'Category Management' }} />
      <Stack.Screen name="menu-inventory" options={{ title: 'Menu & Inventory' }} />
      <Stack.Screen name="sales-forecast" options={{ title: 'Sales Forecast' }} />
      <Stack.Screen name="feedback-hub" options={{ title: 'Feedback Hub' }} />
      <Stack.Screen name="setings" options={{ title: 'System Settings' }} />
    </Stack>
  );
}