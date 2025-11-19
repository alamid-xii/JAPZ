import { useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { authStyles } from '../../styles/authStyles';

export function WelcomeScreenNative() {
  const router = useRouter();

  return (
    <ScrollView style={{ backgroundColor: Colors.light.background }}>
      <View style={authStyles.welcomeContainer}>
        {/* Logo */}
        <View style={authStyles.logo}>
          <Text style={{ fontSize: 48, fontWeight: 'bold', color: Colors.light.primary }}>
            JAPZ
          </Text>
        </View>

        {/* Title and Subtitle */}
        <Text style={authStyles.title}>Welcome to JAPZ MobilePOS</Text>
        <Text style={authStyles.subtitle}>
          Complete POS and Communication System
        </Text>

        {/* Get Started Button */}
        <TouchableOpacity
          style={authStyles.primaryButton}
          onPress={() => router.push('./registration')}
        >
          <Text style={authStyles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>

        {/* Login Link */}
        <View style={{ marginTop: 16, alignItems: 'center' }}>
          <Text style={{ color: Colors.light.foreground }}>
            Already have an account?{' '}
            <Text
              style={authStyles.linkButton}
              onPress={() => router.push('./login')}
            >
              Login
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
