import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { signUp, signIn } from '../firebase/authService';
import { useApp } from '../context/AppContext';

const AuthDebugScreen = ({ navigation }) => {
  const { user } = useApp();
  const [testEmail, setTestEmail] = useState('supplier.test@kukuhub.com');
  const [testPassword, setTestPassword] = useState('TestPassword123!');
  const [isLoading, setIsLoading] = useState(false);
  const [debugLog, setDebugLog] = useState([]);

  const log = (message) => {
    console.log(message);
    setDebugLog((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testSignUp = async () => {
    if (!testEmail || !testPassword) {
      Alert.alert('Error', 'Enter email and password');
      return;
    }

    setIsLoading(true);
    log('Starting sign up test...');

    const result = await signUp(testEmail, testPassword, 'Test User', 'buyer');
    
    if (result.success) {
      log('✅ Sign up successful!');
      Alert.alert('Success', 'Account created! Check console logs.');
    } else {
      log(`❌ Sign up failed: ${result.error}`);
      Alert.alert('Sign Up Failed', result.error);
    }
    setIsLoading(false);
  };

  const createTestSupplierAccount = async () => {
    setIsLoading(true);
    log('Creating test supplier account...');

    const result = await signUp('supplier.test@kukuhub.com', 'TestPassword123!', 'Test Supplier', 'supplier');
    
    if (result.success) {
      log('✅ Supplier account created!');
      setTestEmail('supplier.test@kukuhub.com');
      setTestPassword('TestPassword123!');
      Alert.alert('Success', 'Supplier test account ready!');
    } else {
      log(`❌ Supplier account creation failed: ${result.error}`);
      Alert.alert('Failed', result.error);
    }
    setIsLoading(false);
  };

  const createTestBuyerAccount = async () => {
    setIsLoading(true);
    log('Creating test buyer account...');

    const result = await signUp('buyer.test@kukuhub.com', 'TestPassword123!', 'Test Buyer', 'buyer');
    
    if (result.success) {
      log('✅ Buyer account created!');
      setTestEmail('buyer.test@kukuhub.com');
      setTestPassword('TestPassword123!');
      Alert.alert('Success', 'Buyer test account ready!');
    } else {
      log(`❌ Buyer account creation failed: ${result.error}`);
      Alert.alert('Failed', result.error);
    }
    setIsLoading(false);
  }

  const testSignIn = async () => {
    if (!testEmail || !testPassword) {
      Alert.alert('Error', 'Enter email and password');
      return;
    }

    setIsLoading(true);
    log('Starting sign in test...');

    const result = await signIn(testEmail, testPassword);
    
    if (result.success) {
      log('✅ Sign in successful!');
      Alert.alert('Success', 'Logged in! Check console logs.');
    } else {
      log(`❌ Sign in failed: ${result.error}`);
      Alert.alert('Sign In Failed', result.error);
    }
    setIsLoading(false);
  };

  const populateTestCredentials = () => {
    setTestEmail('buyer.test@kukuhub.com');
    setTestPassword('TestPassword123!');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🔧 Auth Debug Screen</Text>
        <Text style={styles.subtitle}>Test authentication flow</Text>
      </View>

      {user && (
        <View style={styles.successBox}>
          <Text style={styles.successText}>✅ You are logged in!</Text>
          <Text style={styles.successEmail}>{user.email}</Text>
        </View>
      )}

      <View style={styles.formContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="test@example.com"
          value={testEmail}
          onChangeText={setTestEmail}
          editable={!isLoading}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={testPassword}
          onChangeText={setTestPassword}
          secureTextEntry
          editable={!isLoading}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={testSignUp}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.buttonText}>Test Sign Up</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={testSignIn}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={COLORS.primary} />
          ) : (
            <Text style={styles.buttonTextSecondary}>Test Sign In</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={populateTestCredentials}
        >
          <Text style={styles.linkText}>📋 Use Demo Credentials</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <Text style={styles.setupTitle}>⚙️ Setup Test Accounts:</Text>
        
        <TouchableOpacity
          style={[styles.button, styles.setupButton]}
          onPress={createTestSupplierAccount}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.buttonText}>Create Supplier Account</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.setupButton]}
          onPress={createTestBuyerAccount}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.buttonText}>Create Buyer Account</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.logContainer}>
        <Text style={styles.logTitle}>📱 Debug Console:</Text>
        <View style={styles.log}>
          {debugLog.length === 0 ? (
            <Text style={styles.logEmpty}>Check browser console (F12) for logs...</Text>
          ) : (
            debugLog.map((log, index) => (
              <Text key={index} style={styles.logLine}>
                {log}
              </Text>
            ))
          )}
        </View>
      </View>

      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsTitle}>📖 Instructions:</Text>
        <Text style={styles.instructionText}>
          1. Check browser DevTools (F12) for detailed logs
        </Text>
        <Text style={styles.instructionText}>
          2. Click "Use Demo Credentials" to test with known account
        </Text>
        <Text style={styles.instructionText}>
          3. Watch for ✅ or ❌ indicators in console
        </Text>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    marginBottom: 24,
    marginTop: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.gray,
  },
  successBox: {
    backgroundColor: '#d4edda',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#28a745',
  },
  successText: {
    color: '#155724',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  successEmail: {
    color: '#155724',
    fontSize: 12,
  },
  formContainer: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    color: COLORS.darkGray,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginTop: 12,
  },
  buttonTextSecondary: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  linkButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 16,
  },
  setupTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 12,
    marginTop: 8,
  },
  setupButton: {
    marginTop: 10,
    backgroundColor: '#17a2b8',
  },
  logContainer: {
    backgroundColor: '#1e1e1e',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  logTitle: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  log: {
    maxHeight: 200,
  },
  logLine: {
    color: '#00ff00',
    fontSize: 11,
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  logEmpty: {
    color: '#666',
    fontSize: 12,
    fontStyle: 'italic',
  },
  instructionsContainer: {
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  instructionsTitle: {
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: 8,
  },
  instructionText: {
    color: COLORS.gray,
    fontSize: 12,
    marginBottom: 6,
  },
  backButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  backButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default AuthDebugScreen;
