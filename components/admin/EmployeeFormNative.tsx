import { useRouter } from 'expo-router';
import { ChevronLeft, RefreshCw } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { Sizes } from '../../constants/theme';

interface EmployeeFormProps {
  employee?: {
    id: string;
    name: string;
    email: string;
    role: string;
    station?: string;
    pin: string;
  };
}

export function EmployeeFormNative({ employee }: EmployeeFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: employee?.name || '',
    email: employee?.email || '',
    role: employee?.role || 'cashier',
    station: employee?.station || '',
  });

  const [pin, setPin] = useState(employee?.pin || generatePin());
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showStationMenu, setShowStationMenu] = useState(false);

  function generatePin() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      Alert.alert('Validation Error', 'Please enter employee name');
      return;
    }
    if (!formData.email.trim()) {
      Alert.alert('Validation Error', 'Please enter email address');
      return;
    }
    // Save employee logic would go here
    router.back();
  };

  const stations = ['Burger Station', 'Pasta & Fries', 'Coffee & Beverage'];
  const roles = [
    { label: 'Cashier', value: 'cashier' },
    { label: 'Kitchen Staff', value: 'kitchen' },
    { label: 'Admin', value: 'admin' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={Colors.light.foreground} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {employee ? 'Edit Employee' : 'Add Employee'}
        </Text>
      </View>

      {/* Form */}
      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        {/* Full Name */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter employee name"
            placeholderTextColor={Colors.light.muted}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
        </View>

        {/* Email Address */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email address"
            placeholderTextColor={Colors.light.muted}
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
          />
        </View>

        {/* Role Selection */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Role</Text>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => setShowRoleMenu(!showRoleMenu)}
          >
            <Text style={styles.selectText}>
              {roles.find((r) => r.value === formData.role)?.label || 'Select Role'}
            </Text>
          </TouchableOpacity>
          {showRoleMenu && (
            <View style={styles.dropdown}>
              {roles.map((role) => (
                <TouchableOpacity
                  key={role.value}
                  style={[
                    styles.dropdownItem,
                    formData.role === role.value && styles.dropdownItemSelected,
                  ]}
                  onPress={() => {
                    setFormData({ ...formData, role: role.value, station: '' });
                    setShowRoleMenu(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      formData.role === role.value && styles.dropdownItemTextSelected,
                    ]}
                  >
                    {role.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Station Assignment (only for Kitchen Staff) */}
        {formData.role === 'kitchen' && (
          <View style={styles.formGroup}>
            <Text style={styles.label}>Station Assignment</Text>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => setShowStationMenu(!showStationMenu)}
            >
              <Text style={styles.selectText}>
                {formData.station || 'Select Station'}
              </Text>
            </TouchableOpacity>
            {showStationMenu && (
              <View style={styles.dropdown}>
                {stations.map((station) => (
                  <TouchableOpacity
                    key={station}
                    style={[
                      styles.dropdownItem,
                      formData.station === station && styles.dropdownItemSelected,
                    ]}
                    onPress={() => {
                      setFormData({ ...formData, station });
                      setShowStationMenu(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        formData.station === station && styles.dropdownItemTextSelected,
                      ]}
                    >
                      {station}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Auto-PIN Section */}
        <View style={styles.pinSection}>
          <Text style={styles.pinLabel}>Employee PIN</Text>
          <View style={styles.pinDisplay}>
            <Text style={styles.pinText}>{pin}</Text>
          </View>
          <TouchableOpacity
            style={styles.generateButton}
            onPress={() => setPin(generatePin())}
          >
            <RefreshCw size={18} color={Colors.light.foreground} />
            <Text style={styles.generateButtonText}>Generate New PIN</Text>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Save Employee</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Sizes.spacing.lg,
    paddingVertical: Sizes.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
    backgroundColor: Colors.light.card,
  },
  backButton: {
    marginRight: Sizes.spacing.md,
  },
  headerTitle: {
    fontSize: Sizes.typography.lg,
    fontWeight: '600',
    color: Colors.light.foreground,
  },
  formContainer: {
    padding: Sizes.spacing.lg,
  },
  formGroup: {
    marginBottom: Sizes.spacing.lg,
  },
  label: {
    fontSize: Sizes.typography.sm,
    fontWeight: '500',
    color: Colors.light.foreground,
    marginBottom: Sizes.spacing.sm,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Sizes.radius.md,
    paddingHorizontal: Sizes.spacing.md,
    fontSize: Sizes.typography.base,
    color: Colors.light.foreground,
    backgroundColor: Colors.light.background,
  },
  selectButton: {
    height: 44,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Sizes.radius.md,
    paddingHorizontal: Sizes.spacing.md,
    justifyContent: 'center',
    backgroundColor: Colors.light.background,
  },
  selectText: {
    fontSize: Sizes.typography.base,
    color: Colors.light.foreground,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Sizes.radius.md,
    marginTop: Sizes.spacing.xs,
    backgroundColor: Colors.light.card,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingHorizontal: Sizes.spacing.md,
    paddingVertical: Sizes.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  dropdownItemSelected: {
    backgroundColor: Colors.light.muted,
  },
  dropdownItemText: {
    fontSize: Sizes.typography.base,
    color: Colors.light.foreground,
  },
  dropdownItemTextSelected: {
    fontWeight: '600',
  },
  pinSection: {
    backgroundColor: Colors.light.muted,
    borderRadius: Sizes.radius.md,
    padding: Sizes.spacing.lg,
    marginBottom: Sizes.spacing.lg,
  },
  pinLabel: {
    fontSize: Sizes.typography.sm,
    fontWeight: '500',
    color: Colors.light.foreground,
    marginBottom: Sizes.spacing.md,
    textAlign: 'center',
  },
  pinDisplay: {
    backgroundColor: Colors.light.card,
    borderWidth: 2,
    borderColor: Colors.light.secondary,
    borderRadius: Sizes.radius.md,
    paddingVertical: Sizes.spacing.xl,
    paddingHorizontal: Sizes.spacing.lg,
    marginBottom: Sizes.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinText: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.light.foreground,
    letterSpacing: 2,
  },
  generateButton: {
    flexDirection: 'row',
    height: 44,
    backgroundColor: Colors.light.border,
    borderRadius: Sizes.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Sizes.spacing.sm,
  },
  generateButtonText: {
    fontSize: Sizes.typography.base,
    fontWeight: '500',
    color: Colors.light.foreground,
  },
  submitButton: {
    height: 60,
    backgroundColor: Colors.light.secondary,
    borderRadius: Sizes.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Sizes.spacing.xl,
  },
  submitButtonText: {
    fontSize: Sizes.typography.lg,
    fontWeight: '600',
    color: Colors.light.foreground,
  },
});
