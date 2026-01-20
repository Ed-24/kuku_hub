import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';
import { testFirebaseConnection } from '../../firebase/authService';

const WelcomeScreen = ({ navigation }) => {
  const [isTesting, setIsTesting] = useState(false);

  const handleTestConnection = async () => {
    setIsTesting(true);
    try {
      console.log('[WELCOME] Running Firebase connectivity test...');
      const result = await testFirebaseConnection();
      console.log('[WELCOME] Test result:', result);
      
      let message = result.message + '\n\n';
      message += result.fullReport.join('\n');
      
      Alert.alert('Firebase Connection Test', message);
    } catch (error) {
      Alert.alert('Test Error', 'Failed to run connection test: ' + error.message);
    } finally {
      setIsTesting(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Image 
              source={require('../../../assets/chicken.jpg')}
              style={styles.chickenImage}
              resizeMode="cover"
            />
          </View>
        </View>

        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.brandName}>Young4Chick</Text>

        <Text style={styles.tagline}>
          Your trusted partner for quality poultry
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.testButton}
          onPress={handleTestConnection}
          disabled={isTesting}
        >
          {isTesting ? (
            <ActivityIndicator size="small" color={COLORS.primary} />
          ) : (
            <>
              <Ionicons name="checkmark-circle" size={18} color={COLORS.primary} style={{ marginRight: 8 }} />
              <Text style={styles.testButtonText}>Test Connection</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding * 2,
  },
  logoContainer: {
    marginBottom: 30,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  chickenImage: {
    width: '100%',
    height: '100%',
  },
  welcomeText: {
    fontSize: SIZES.xl,
    color: COLORS.white,
    marginBottom: 8,
  },
  brandName: {
    fontSize: SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 16,
  },
  tagline: {
    fontSize: SIZES.md,
    color: COLORS.white,
    opacity: 0.9,
    textAlign: 'center',
  },
  bottomContainer: {
    paddingHorizontal: SIZES.padding * 2,
    paddingBottom: SIZES.padding * 3,
  },
  getStartedButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 16,
    borderRadius: SIZES.borderRadius,
    alignItems: 'center',
  },
  getStartedText: {
    color: COLORS.primary,
    fontSize: SIZES.lg,
    fontWeight: 'bold',
  },
  testButton: {
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: SIZES.borderRadius,
    borderWidth: 2,
    borderColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  testButtonText: {
    color: COLORS.primary,
    fontSize: SIZES.md,
    fontWeight: '600',
  },
});

export default WelcomeScreen;
