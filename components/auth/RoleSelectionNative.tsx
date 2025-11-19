import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Sizes } from '../../constants/colors';

const roles = [
  {
    id: 'admin',
    label: 'Admin',
    description: 'Manage staff, inventory, and analytics',
    icon: '👨‍💼',
  },
  {
    id: 'cashier',
    label: 'Cashier',
    description: 'Process orders and payments',
    icon: '🛒',
  },
  {
    id: 'kitchen',
    label: 'Kitchen',
    description: 'Prepare and manage orders',
    icon: '👨‍🍳',
  },
];

export function RoleSelectionNative() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedRole) {
      // In a real app, this would pass the selected role to the next step
      router.push('./login');
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.light.background }}
      contentContainerStyle={{ padding: Sizes.spacing.lg, justifyContent: 'center', minHeight: '100%' }}
    >
      <View style={{ marginBottom: Sizes.spacing.xl }}>
        <Text style={{ fontSize: Sizes.typography.xl, fontWeight: '700', color: Colors.light.foreground }}>
          Select Your Role
        </Text>
        <Text style={{ fontSize: Sizes.typography.base, color: Colors.light.mutedForeground, marginTop: Sizes.spacing.sm }}>
          Choose your role to get started
        </Text>
      </View>

      <View style={{ gap: Sizes.spacing.lg, marginBottom: Sizes.spacing.xl }}>
        {roles.map((role) => (
          <TouchableOpacity
            key={role.id}
            style={{
              backgroundColor: selectedRole === role.id ? Colors.light.primary : Colors.light.card,
              borderWidth: 2,
              borderColor: selectedRole === role.id ? Colors.light.primary : Colors.light.border,
              borderRadius: Sizes.radius.lg,
              padding: Sizes.spacing.lg,
              flexDirection: 'row',
              gap: Sizes.spacing.lg,
              alignItems: 'center',
            }}
            onPress={() => setSelectedRole(role.id)}
          >
            <Text style={{ fontSize: 40 }}>{role.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: Sizes.typography.lg,
                  fontWeight: '600',
                  color: selectedRole === role.id ? '#fff' : Colors.light.foreground,
                }}
              >
                {role.label}
              </Text>
              <Text
                style={{
                  fontSize: Sizes.typography.sm,
                  color: selectedRole === role.id ? '#fff' : Colors.light.mutedForeground,
                  marginTop: 4,
                }}
              >
                {role.description}
              </Text>
            </View>
            {selectedRole === role.id && (
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>✓</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: selectedRole ? Colors.light.primary : Colors.light.mutedForeground,
          borderRadius: Sizes.radius.md,
          padding: Sizes.spacing.lg,
          alignItems: 'center',
          marginBottom: Sizes.spacing.lg,
        }}
        onPress={handleContinue}
        disabled={!selectedRole}
      >
        <Text style={{ color: '#fff', fontWeight: '600', fontSize: Sizes.typography.base }}>
          Continue
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={{ color: Colors.light.primary, textAlign: 'center' }}>
          Back
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
