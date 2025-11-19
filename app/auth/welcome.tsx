// app/auth/welcome.tsx
import { useRouter } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { authStyles } from '../../styles/authStyles';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={authStyles.container} contentContainerStyle={authStyles.content}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 40 }}>
        <Image
          source={require('../../assets/images/logo.jpg')}
          style={[authStyles.logo, { alignSelf: 'center' }] as any}
          resizeMode="contain"
        />

        <Text style={authStyles.title}>Welcome to JAPZ MobilePOS</Text>
        <Text style={authStyles.subtitle}>
          Complete POS and Communication System
        </Text>

        <TouchableOpacity
          style={authStyles.primaryButton}
          onPress={() => router.push('./registration')}
        >
          <Text style={authStyles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity style={authStyles.linkButton}>
          <Text style={authStyles.linkText}>
            Already have an account? <Text style={authStyles.linkHighlight} onPress={() => router.push('./login')}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}