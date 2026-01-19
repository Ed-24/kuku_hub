import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';

const PAYMENT_METHODS = [
  {
    id: 'wallet',
    name: 'Wallet OUDX',
    description: 'Pay with your wallet balance',
    icon: 'wallet',
    balance: 'UGX 50,000',
  },
  {
    id: 'pay_on_delivery',
    name: 'Pay on Delivery',
    description: 'Pay when you receive your order',
    icon: 'cash',
  },
  {
    id: 'mtn',
    name: 'MTN Mobile Money',
    description: 'Pay with MTN MoMo',
    icon: 'phone-portrait',
    color: '#FFCC00',
  },
  {
    id: 'airtel',
    name: 'Airtel Money',
    description: 'Pay with Airtel Money',
    icon: 'phone-portrait',
    color: '#FF0000',
  },
];

const PaymentMethodScreen = ({ navigation }) => {
  const [selectedMethod, setSelectedMethod] = useState('wallet');
  const [mobileNumber, setMobileNumber] = useState('');
  const [showMobileInput, setShowMobileInput] = useState(false);

  const handleSelectMethod = (methodId) => {
    setSelectedMethod(methodId);
    setShowMobileInput(methodId === 'mtn' || methodId === 'airtel');
  };

  const handleConfirm = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Method</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.methodsContainer}>
          <Text style={styles.sectionTitle}>Select Payment Method</Text>
          <Text style={styles.sectionSubtitle}>
            Choose how you want to pay for your order
          </Text>

          {PAYMENT_METHODS.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.methodItem,
                selectedMethod === method.id && styles.methodItemSelected,
              ]}
              onPress={() => handleSelectMethod(method.id)}
            >
              <View
                style={[
                  styles.methodIcon,
                  method.color && { backgroundColor: method.color },
                ]}
              >
                <Ionicons
                  name={method.icon}
                  size={24}
                  color={method.color ? COLORS.white : COLORS.primary}
                />
              </View>
              <View style={styles.methodInfo}>
                <Text style={styles.methodName}>{method.name}</Text>
                <Text style={styles.methodDescription}>{method.description}</Text>
                {method.balance && (
                  <Text style={styles.methodBalance}>Balance: {method.balance}</Text>
                )}
              </View>
              <View
                style={[
                  styles.radioButton,
                  selectedMethod !== method.id && styles.radioButtonInactive,
                ]}
              >
                {selectedMethod === method.id && (
                  <View style={styles.radioInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {showMobileInput && (
          <View style={styles.mobileInputContainer}>
            <Text style={styles.inputLabel}>Mobile Money Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your mobile number"
              placeholderTextColor={COLORS.gray}
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="phone-pad"
            />
            <Text style={styles.inputHint}>
              You will receive a prompt on your phone to confirm payment
            </Text>
          </View>
        )}

        <View style={styles.securityNote}>
          <Ionicons name="shield-checkmark" size={24} color={COLORS.success} />
          <View style={styles.securityNoteContent}>
            <Text style={styles.securityTitle}>Secure Payment</Text>
            <Text style={styles.securityText}>
              Your payment information is encrypted and secure
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirm Payment Method</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  methodsContainer: {
    padding: SIZES.padding,
  },
  sectionTitle: {
    fontSize: SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: SIZES.md,
    color: COLORS.gray,
    marginBottom: 24,
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.borderRadius,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  methodItemSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    ...SHADOWS.small,
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodInfo: {
    flex: 1,
    marginLeft: 12,
  },
  methodName: {
    fontSize: SIZES.md,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  methodDescription: {
    fontSize: SIZES.sm,
    color: COLORS.gray,
  },
  methodBalance: {
    fontSize: SIZES.sm,
    color: COLORS.primary,
    fontWeight: '600',
    marginTop: 2,
  },
  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInactive: {
    borderColor: COLORS.gray,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
  mobileInputContainer: {
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.padding,
  },
  inputLabel: {
    fontSize: SIZES.sm,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
  },
  inputHint: {
    fontSize: SIZES.sm,
    color: COLORS.gray,
    marginTop: 8,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.padding,
    padding: SIZES.padding,
    borderRadius: SIZES.borderRadius,
  },
  securityNoteContent: {
    flex: 1,
    marginLeft: 12,
  },
  securityTitle: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.success,
  },
  securityText: {
    fontSize: SIZES.sm,
    color: COLORS.gray,
  },
  footer: {
    backgroundColor: COLORS.white,
    padding: SIZES.padding,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: SIZES.borderRadius,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: COLORS.white,
    fontSize: SIZES.lg,
    fontWeight: 'bold',
  },
});

export default PaymentMethodScreen;
