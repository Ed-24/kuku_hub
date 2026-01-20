import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import { signUp, testFirebaseConnection } from '../../firebase/authService';

const SignUpScreen = ({ navigation }) => {
  const { login } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('buyer');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successData, setSuccessData] = useState(null);

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return false;
    }
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email');
      return false;
    }
    if (!password) {
      Alert.alert('Error', 'Please enter a password');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    console.log('🔥 [SIGNUP] Starting signup process for:', email);
    
    const result = await signUp(email, password, name, userType);
    
    if (result.success) {
      console.log('✅ [SIGNUP] Account created successfully!');
      
      // Test Firebase connection
      console.log('🔥 [SIGNUP] Testing Firebase connectivity...');
      const connTest = await testFirebaseConnection();
      console.log('✅ [SIGNUP] Connection test result:', connTest);
      
      // Show success modal
      setSuccessData({
        name,
        email,
        userType,
        connTest,
      });
      setShowSuccessModal(true);
      setIsLoading(false);
    } else {
      console.error('❌ [SIGNUP] Account creation failed:', result.error);
      Alert.alert('Sign Up Failed', result.error);
      setIsLoading(false);
    }
  };

  const handleProceedToApp = () => {
    setShowSuccessModal(false);
    // The AppContext will handle navigation automatically
    // since the user is now authenticated
  };

  const handleGoToSignIn = () => {
    setShowSuccessModal(false);
    // Reset form
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    // Navigate to SignIn screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignIn' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>SIGN UP</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.userTypeContainer}>
              <TouchableOpacity
                style={[
                  styles.userTypeButton,
                  userType === 'buyer' && styles.userTypeButtonActive,
                ]}
                onPress={() => setUserType('buyer')}
              >
                <Text
                  style={[
                    styles.userTypeText,
                    userType === 'buyer' && styles.userTypeTextActive,
                  ]}
                >
                  Buyer
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.userTypeButton,
                  userType === 'supplier' && styles.userTypeButtonActive,
                ]}
                onPress={() => setUserType('supplier')}
              >
                <Text
                  style={[
                    styles.userTypeText,
                    userType === 'supplier' && styles.userTypeTextActive,
                  ]}
                >
                  Supplier
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={20}
                color={COLORS.gray}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor={COLORS.gray}
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={COLORS.gray}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={COLORS.gray}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="call-outline"
                size={20}
                color={COLORS.gray}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor={COLORS.gray}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={COLORS.gray}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={COLORS.gray}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={COLORS.gray}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={COLORS.gray}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor={COLORS.gray}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
              />
            </View>

            <TouchableOpacity 
              style={[styles.signUpButton, isLoading && styles.signUpButtonDisabled]} 
              onPress={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={COLORS.white} size="small" />
              ) : (
                <Text style={styles.signUpButtonText}>Create Account</Text>
              )}
            </TouchableOpacity>

            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.signInLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.successIconContainer}>
              <Ionicons name="checkmark-circle" size={80} color={COLORS.primary} />
            </View>

            <Text style={styles.successTitle}>Account Created Successfully! 🎉</Text>

            <View style={styles.successInfoContainer}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Name:</Text>
                <Text style={styles.infoValue}>{successData?.name}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Email:</Text>
                <Text style={styles.infoValue}>{successData?.email}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Account Type:</Text>
                <Text style={styles.infoValue}>
                  {successData?.userType.charAt(0).toUpperCase() + successData?.userType.slice(1)}
                </Text>
              </View>
            </View>

            {successData?.connTest && (
              <View style={styles.connectionStatus}>
                <Text style={styles.connectionTitle}>Firebase Status:</Text>
                {successData.connTest.success ? (
                  <>
                    <Text style={styles.connectionSuccess}>✅ {successData.connTest.message}</Text>
                    <View style={styles.connectionDetails}>
                      {successData.connTest.fullReport.map((report, idx) => (
                        <Text key={idx} style={styles.detailText}>{report}</Text>
                      ))}
                    </View>
                  </>
                ) : (
                  <>
                    <Text style={styles.connectionError}>⚠️ {successData.connTest.message}</Text>
                    <View style={styles.connectionDetails}>
                      {successData.connTest.fullReport.map((report, idx) => (
                        <Text key={idx} style={styles.detailText}>{report}</Text>
                      ))}
                    </View>
                  </>
                )}
              </View>
            )}

            <Text style={styles.successMessage}>
              Your account is now ready. You can proceed to the app or sign in again.
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.proceedButton}
                onPress={handleProceedToApp}
              >
                <Text style={styles.proceedButtonText}>Proceed to App</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.signinButton}
                onPress={handleGoToSignIn}
              >
                <Text style={styles.signinButtonText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  formContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: SIZES.padding * 1.5,
    paddingTop: 30,
  },
  userTypeContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.borderRadius,
    padding: 4,
  },
  userTypeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: SIZES.borderRadius - 2,
  },
  userTypeButtonActive: {
    backgroundColor: COLORS.primary,
  },
  userTypeText: {
    fontSize: SIZES.md,
    color: COLORS.gray,
    fontWeight: '600',
  },
  userTypeTextActive: {
    color: COLORS.white,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
  },
  signUpButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: SIZES.borderRadius,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  signUpButtonDisabled: {
    opacity: 0.6,
  },
  signUpButtonText: {
    color: COLORS.white,
    fontSize: SIZES.lg,
    fontWeight: 'bold',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  signInText: {
    color: COLORS.gray,
    fontSize: SIZES.md,
  },
  signInLink: {
    color: COLORS.primary,
    fontSize: SIZES.md,
    fontWeight: 'bold',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadius * 2,
    padding: 30,
    alignItems: 'center',
    maxHeight: '90%',
    width: '100%',
  },
  successIconContainer: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  successInfoContainer: {
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.borderRadius,
    padding: 15,
    marginBottom: 20,
    width: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: COLORS.darkGray,
    fontSize: SIZES.md,
  },
  infoValue: {
    color: COLORS.primary,
    fontSize: SIZES.md,
    fontWeight: '600',
  },
  connectionStatus: {
    backgroundColor: '#f0f8ff',
    borderRadius: SIZES.borderRadius,
    padding: 12,
    marginBottom: 15,
    width: '100%',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  connectionTitle: {
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: 8,
    fontSize: SIZES.sm,
  },
  connectionSuccess: {
    color: '#28a745',
    fontSize: SIZES.sm,
    marginBottom: 8,
    fontWeight: '600',
  },
  connectionError: {
    color: '#dc3545',
    fontSize: SIZES.sm,
    marginBottom: 8,
    fontWeight: '600',
  },
  connectionDetails: {
    marginTop: 8,
  },
  detailText: {
    fontSize: SIZES.xs,
    color: COLORS.darkGray,
    marginBottom: 4,
    paddingLeft: 8,
  },
  successMessage: {
    fontSize: SIZES.md,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  proceedButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: SIZES.borderRadius,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: COLORS.white,
    fontSize: SIZES.md,
    fontWeight: 'bold',
  },
  signinButton: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: SIZES.borderRadius,
    alignItems: 'center',
  },
  signinButtonText: {
    color: COLORS.primary,
    fontSize: SIZES.md,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
