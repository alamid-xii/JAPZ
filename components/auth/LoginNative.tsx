import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { useAuth } from '../../hooks/useAuth';
import { authStyles } from '../../styles/authStyles';

export function LoginNative() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
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
    }
  };

  return (
    <ScrollView style={{ backgroundColor: Colors.light.background }}>
      <View style={authStyles.welcomeContainer}>
        
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
              placeholderTextColor={Colors.light.mutedForeground}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              editable={true}
            />
          </View>

          <View style={authStyles.inputGroup}>
            <Text style={authStyles.label}>Password</Text>
            <TextInput
              style={authStyles.input}
              placeholder="Enter your password"
              placeholderTextColor={Colors.light.mutedForeground}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </View>

          <TouchableOpacity
            style={authStyles.primaryButton}
            onPress={handleLogin}
          >
            <Text style={authStyles.primaryButtonText}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* Demo Accounts */}
        <View style={authStyles.demoBox}>
          <Text style={authStyles.demoTitle}>Demo Accounts</Text>
          <Text style={authStyles.demoText}>Admin: admin@japz.com / password123</Text>
          <Text style={authStyles.demoText}>Cashier: cashier@japz.com / password123</Text>
          <Text style={authStyles.demoText}>Kitchen: kitchen@japz.com / password123</Text>
        </View>

        <TouchableOpacity onPress={() => router.push('./welcome')}>
          <Text style={{ color: Colors.light.primary, textAlign: 'center', marginTop: 16 }}>
            Back to Welcome
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
