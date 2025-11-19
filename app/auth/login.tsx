// app/auth/login.tsx
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { authStyles } from '../../styles/authStyles';

export default function LoginScreen() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setLoading(true);
    try {
      // Mock login - determine role based on email
      let role: 'admin' | 'cashier' | 'kitchen' = 'admin';
      let station = undefined;

      if (email.includes('cashier')) {
        role = 'cashier';
      } else if (email.includes('kitchen')) {
        role = 'kitchen';
        station = 'Burger Station';
      }

      const user = {
        id: '1',
        name: email.split('@')[0],
        email,
        role,
        station,
      };

      setUser(user);

      // Navigate based on role
      if (role === 'admin') {
        router.replace('/admin/dashboard' as any);
      } else if (role === 'cashier') {
        router.replace('/cashier/pos' as any);
      } else {
        router.replace('/kitchen/display' as any);
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
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

      <Text style={authStyles.title}>Login</Text>
      <Text style={authStyles.subtitle}>Welcome back to JAPZ MobilePOS</Text>

      {error && (
        <View style={authStyles.demoBox}>
          <Text style={{ color: '#ff4444' }}>{error}</Text>
        </View>
      )}

      <View style={authStyles.form}>
        <View style={authStyles.inputGroup}>
          <Text style={authStyles.label}>Email</Text>
          <TextInput
            style={authStyles.input}
            placeholder="Enter your email"
            placeholderTextColor="#C3C3C3"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={authStyles.inputGroup}>
          <Text style={authStyles.label}>Password</Text>
          <TextInput
            style={authStyles.input}
            placeholder="Enter your password"
            placeholderTextColor="#C3C3C3"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={[
            authStyles.primaryButton,
            loading && authStyles.buttonDisabled
          ]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={authStyles.primaryButtonText}>
            {loading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Demo Accounts */}
      <View style={authStyles.demoBox}>
        <Text style={authStyles.demoTitle}>Demo Accounts</Text>
        <Text style={authStyles.demoText}>Admin: admin@japz.com / password123</Text>
        <Text style={authStyles.demoText}>Cashier: cashier@japz.com / password123</Text>
        <Text style={authStyles.demoText}>Kitchen: kitchen@japz.com / password123</Text>
      </View>

      <TouchableOpacity style={authStyles.linkButton} onPress={() => router.push('./welcome')}>
        <Text style={authStyles.linkText}>
          Back to Welcome
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}