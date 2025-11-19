// app/(auth)/registration.tsx
import { Link, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { authStyles } from '../../styles/authStyles';

export default function RegistrationScreen() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'admin',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      // Simulate registration
      setTimeout(() => {
        setLoading(false);
        router.replace('/auth/login' as any);
      }, 1000);
    }
  };

  return (
    <ScrollView style={authStyles.container} contentContainerStyle={authStyles.content}>
      <TouchableOpacity
        style={authStyles.backButton}
        onPress={() => router.back()}
      >
        <ChevronLeft size={20} color="#000000" />
        <Text style={authStyles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Image
        source={require('../../assets/images/logo.jpg')}
        style={[authStyles.logo, { alignSelf: 'center' }] as any}
        resizeMode="contain"
      />

      <Text style={authStyles.title}>Create Your Account</Text>
      <Text style={authStyles.subtitle}>
        Get started with JAPZ MobilePOS
      </Text>

      <View style={authStyles.form}>
        <View style={authStyles.inputGroup}>
          <Text style={authStyles.label}>Full Name</Text>
          <TextInput
            style={[
              authStyles.input,
              errors.fullName && authStyles.inputError
            ]}
            placeholder="Enter your full name"
            placeholderTextColor="#C3C3C3"
            value={formData.fullName}
            onChangeText={(text) => setFormData({ ...formData, fullName: text })}
          />
          {errors.fullName && (
            <Text style={authStyles.errorText}>{errors.fullName}</Text>
          )}
        </View>

        <View style={authStyles.inputGroup}>
          <Text style={authStyles.label}>Email Address</Text>
          <TextInput
            style={[
              authStyles.input,
              errors.email && authStyles.inputError
            ]}
            placeholder="Enter your email"
            placeholderTextColor="#C3C3C3"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && (
            <Text style={authStyles.errorText}>{errors.email}</Text>
          )}
        </View>

        <View style={authStyles.inputGroup}>
          <Text style={authStyles.label}>Role</Text>
          <View style={authStyles.roleContainer}>
            {['admin', 'cashier', 'kitchen'].map((role) => (
              <TouchableOpacity
                key={role}
                style={[
                  authStyles.roleButton,
                  formData.role === role && authStyles.roleButtonSelected
                ]}
                onPress={() => setFormData({ ...formData, role })}
              >
                <Text style={[
                  authStyles.roleButtonText,
                  formData.role === role && authStyles.roleButtonTextSelected
                ]}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={authStyles.inputGroup}>
          <Text style={authStyles.label}>Password</Text>
          <TextInput
            style={[
              authStyles.input,
              errors.password && authStyles.inputError
            ]}
            placeholder="Enter password"
            placeholderTextColor="#C3C3C3"
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            secureTextEntry
          />
          {errors.password && (
            <Text style={authStyles.errorText}>{errors.password}</Text>
          )}
        </View>

        <View style={authStyles.inputGroup}>
          <Text style={authStyles.label}>Confirm Password</Text>
          <TextInput
            style={[
              authStyles.input,
              errors.confirmPassword && authStyles.inputError
            ]}
            placeholder="Confirm password"
            placeholderTextColor="#C3C3C3"
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
            secureTextEntry
          />
          {errors.confirmPassword && (
            <Text style={authStyles.errorText}>{errors.confirmPassword}</Text>
          )}
        </View>

        <TouchableOpacity 
          style={[
            authStyles.primaryButton,
            loading && authStyles.buttonDisabled
          ]} 
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={authStyles.primaryButtonText}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </Text>
        </TouchableOpacity>
      </View>

      <Link href="./login" asChild>
        <TouchableOpacity style={authStyles.linkButton}>
          <Text style={authStyles.linkText}>
            Already have an account? <Text style={authStyles.linkHighlight}>Login</Text>
          </Text>
        </TouchableOpacity>
      </Link>
    </ScrollView>
  );
}
