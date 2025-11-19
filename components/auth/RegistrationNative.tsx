import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors, Sizes } from '../../constants/colors';
import { useAuth } from '../../hooks/useAuth';
import { authStyles } from '../../styles/authStyles';

export function RegistrationNative() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'cashier' as 'admin' | 'cashier' | 'kitchen',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleRegister = () => {
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Create new user
      const user = {
        id: Math.random().toString(),
        name: formData.fullName,
        email: formData.email,
        role: formData.role,
      };

      setUser(user);
      
      // Navigate based on role
      if (formData.role === 'admin') {
        router.replace('/admin/dashboard' as any);
      } else if (formData.role === 'cashier') {
        router.replace('/cashier/pos' as any);
      } else {
        router.replace('/kitchen/display' as any);
      }
    }
  };

  const roles = [
    { id: 'cashier', label: 'Cashier' },
    { id: 'kitchen', label: 'Kitchen' },
    { id: 'admin', label: 'Admin' },
  ];

  return (
    <ScrollView style={{ backgroundColor: Colors.light.background }} contentContainerStyle={{ padding: Sizes.spacing.lg }}>
      <Text style={authStyles.title}>Create Account</Text>
      <Text style={authStyles.subtitle}>Register to JAPZ MobilePOS</Text>

      <View style={authStyles.form}>
        {/* Full Name */}
        <View style={authStyles.inputGroup}>
          <Text style={authStyles.label}>Full Name</Text>
          <TextInput
            style={[authStyles.input, errors.fullName && authStyles.inputError]}
            placeholder="Enter your full name"
            placeholderTextColor={Colors.light.mutedForeground}
            value={formData.fullName}
            onChangeText={(text) => setFormData({ ...formData, fullName: text })}
          />
          {errors.fullName && <Text style={authStyles.errorText}>{errors.fullName}</Text>}
        </View>

        {/* Email */}
        <View style={authStyles.inputGroup}>
          <Text style={authStyles.label}>Email Address</Text>
          <TextInput
            style={[authStyles.input, errors.email && authStyles.inputError]}
            placeholder="Enter your email"
            placeholderTextColor={Colors.light.mutedForeground}
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && <Text style={authStyles.errorText}>{errors.email}</Text>}
        </View>

        {/* Password */}
        <View style={authStyles.inputGroup}>
          <Text style={authStyles.label}>Password</Text>
          <TextInput
            style={[authStyles.input, errors.password && authStyles.inputError]}
            placeholder="Enter password"
            placeholderTextColor={Colors.light.mutedForeground}
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            secureTextEntry
          />
          {errors.password && <Text style={authStyles.errorText}>{errors.password}</Text>}
        </View>

        {/* Confirm Password */}
        <View style={authStyles.inputGroup}>
          <Text style={authStyles.label}>Confirm Password</Text>
          <TextInput
            style={[authStyles.input, errors.confirmPassword && authStyles.inputError]}
            placeholder="Confirm password"
            placeholderTextColor={Colors.light.mutedForeground}
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
            secureTextEntry
          />
          {errors.confirmPassword && <Text style={authStyles.errorText}>{errors.confirmPassword}</Text>}
        </View>

        {/* Role Selection */}
        <View style={authStyles.roleContainer}>
          <Text style={authStyles.label}>Select Role</Text>
          <View style={{ flexDirection: 'row', gap: Sizes.spacing.md, marginTop: Sizes.spacing.md }}>
            {roles.map((role) => (
              <TouchableOpacity
                key={role.id}
                style={[
                  authStyles.roleButton,
                  formData.role === role.id && {
                    backgroundColor: Colors.light.primary,
                  },
                ]}
                onPress={() => setFormData({ ...formData, role: role.id as any })}
              >
                <Text
                  style={{
                    color: formData.role === role.id ? '#fff' : Colors.light.foreground,
                    fontWeight: '600' as const,
                  }}
                >
                  {role.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Register Button */}
        <TouchableOpacity style={authStyles.primaryButton} onPress={handleRegister}>
          <Text style={authStyles.primaryButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>

      {/* Login Link */}
      <TouchableOpacity onPress={() => router.push('./login')}>
        <Text style={{ color: Colors.light.primary, textAlign: 'center', marginTop: 16 }}>
          Already have an account? <Text style={{ fontWeight: '600' }}>Login</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
