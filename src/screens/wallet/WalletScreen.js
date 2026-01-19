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
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';

const TRANSACTIONS = [
  {
    id: '1',
    type: 'credit',
    title: 'Wallet Top Up',
    description: 'Via MTN Mobile Money',
    amount: 100000,
    date: 'Jan 18, 2026',
    time: '10:30 AM',
  },
  {
    id: '2',
    type: 'debit',
    title: 'Order Payment',
    description: 'Order #1003 - Biyinzika Poultry',
    amount: 50000,
    date: 'Jan 17, 2026',
    time: '02:15 PM',
  },
  {
    id: '3',
    type: 'credit',
    title: 'Refund',
    description: 'Order #1001 cancelled',
    amount: 25000,
    date: 'Jan 15, 2026',
    time: '11:45 AM',
  },
  {
    id: '4',
    type: 'debit',
    title: 'Service Payment',
    description: 'Vaccination Service',
    amount: 15000,
    date: 'Jan 12, 2026',
    time: '09:00 AM',
  },
  {
    id: '5',
    type: 'credit',
    title: 'Wallet Top Up',
    description: 'Via Airtel Money',
    amount: 200000,
    date: 'Jan 10, 2026',
    time: '04:30 PM',
  },
];

const WalletScreen = ({ navigation }) => {
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');
  const walletBalance = 260000;

  const quickAmounts = [50000, 100000, 200000, 500000];

  const renderTransaction = (transaction) => (
    <View key={transaction.id} style={styles.transactionItem}>
      <View
        style={[
          styles.transactionIcon,
          transaction.type === 'credit'
            ? styles.creditIcon
            : styles.debitIcon,
        ]}
      >
        <Ionicons
          name={transaction.type === 'credit' ? 'arrow-down' : 'arrow-up'}
          size={20}
          color={transaction.type === 'credit' ? COLORS.success : COLORS.error}
        />
      </View>
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionTitle}>{transaction.title}</Text>
        <Text style={styles.transactionDescription}>
          {transaction.description}
        </Text>
        <Text style={styles.transactionDate}>
          {transaction.date} at {transaction.time}
        </Text>
      </View>
      <Text
        style={[
          styles.transactionAmount,
          transaction.type === 'credit'
            ? styles.creditAmount
            : styles.debitAmount,
        ]}
      >
        {transaction.type === 'credit' ? '+' : '-'}UGX{' '}
        {transaction.amount.toLocaleString()}
      </Text>
    </View>
  );

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
        <Text style={styles.headerTitle}>Wallet</Text>
        <TouchableOpacity style={styles.historyButton}>
          <Ionicons name="time-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>
            UGX {walletBalance.toLocaleString()}
          </Text>
          <View style={styles.balanceActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setShowTopUpModal(true)}
            >
              <View style={styles.actionIcon}>
                <Ionicons name="add" size={24} color={COLORS.primary} />
              </View>
              <Text style={styles.actionText}>Top Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <Ionicons name="send" size={24} color={COLORS.primary} />
              </View>
              <Text style={styles.actionText}>Transfer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <Ionicons name="card" size={24} color={COLORS.primary} />
              </View>
              <Text style={styles.actionText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="trending-up" size={24} color={COLORS.success} />
            <Text style={styles.statValue}>UGX 325,000</Text>
            <Text style={styles.statLabel}>Total Income</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Ionicons name="trending-down" size={24} color={COLORS.error} />
            <Text style={styles.statValue}>UGX 65,000</Text>
            <Text style={styles.statLabel}>Total Spent</Text>
          </View>
        </View>

        <View style={styles.transactionsContainer}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {TRANSACTIONS.map(renderTransaction)}
        </View>
      </ScrollView>

      {/* Top Up Modal */}
      <Modal
        visible={showTopUpModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowTopUpModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Top Up Wallet</Text>
              <TouchableOpacity onPress={() => setShowTopUpModal(false)}>
                <Ionicons name="close" size={24} color={COLORS.darkGray} />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Enter Amount</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0"
              placeholderTextColor={COLORS.gray}
              keyboardType="numeric"
              value={topUpAmount}
              onChangeText={setTopUpAmount}
            />

            <Text style={styles.quickAmountLabel}>Quick Select</Text>
            <View style={styles.quickAmounts}>
              {quickAmounts.map((amount) => (
                <TouchableOpacity
                  key={amount}
                  style={[
                    styles.quickAmountButton,
                    topUpAmount === amount.toString() &&
                      styles.quickAmountButtonActive,
                  ]}
                  onPress={() => setTopUpAmount(amount.toString())}
                >
                  <Text
                    style={[
                      styles.quickAmountText,
                      topUpAmount === amount.toString() &&
                        styles.quickAmountTextActive,
                    ]}
                  >
                    {amount.toLocaleString()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.paymentMethodLabel}>Payment Method</Text>
            <TouchableOpacity style={styles.paymentMethod}>
              <View style={[styles.paymentIcon, { backgroundColor: '#FFCC00' }]}>
                <Ionicons name="phone-portrait" size={20} color={COLORS.white} />
              </View>
              <Text style={styles.paymentMethodText}>MTN Mobile Money</Text>
              <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.topUpButton}
              onPress={() => setShowTopUpModal(false)}
            >
              <Text style={styles.topUpButtonText}>Top Up</Text>
            </TouchableOpacity>
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
  historyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  balanceCard: {
    backgroundColor: COLORS.primary,
    margin: SIZES.padding,
    borderRadius: SIZES.borderRadiusLarge,
    padding: SIZES.padding * 1.5,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: SIZES.md,
    color: COLORS.white,
    opacity: 0.8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.white,
    marginVertical: 8,
  },
  balanceActions: {
    flexDirection: 'row',
    marginTop: 16,
  },
  actionButton: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: SIZES.sm,
    color: COLORS.white,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    marginHorizontal: SIZES.padding,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.padding,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 16,
  },
  statValue: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginTop: 8,
  },
  statLabel: {
    fontSize: SIZES.sm,
    color: COLORS.gray,
    marginTop: 4,
  },
  transactionsContainer: {
    padding: SIZES.padding,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  seeAllText: {
    fontSize: SIZES.sm,
    color: COLORS.primary,
    fontWeight: '600',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  creditIcon: {
    backgroundColor: '#E8F5E9',
  },
  debitIcon: {
    backgroundColor: '#FFEBEE',
  },
  transactionInfo: {
    flex: 1,
    marginLeft: 12,
  },
  transactionTitle: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  transactionDescription: {
    fontSize: SIZES.sm,
    color: COLORS.gray,
  },
  transactionDate: {
    fontSize: SIZES.xs,
    color: COLORS.gray,
    marginTop: 4,
  },
  transactionAmount: {
    fontSize: SIZES.md,
    fontWeight: 'bold',
  },
  creditAmount: {
    color: COLORS.success,
  },
  debitAmount: {
    color: COLORS.error,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: SIZES.padding * 1.5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  inputLabel: {
    fontSize: SIZES.sm,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 8,
  },
  amountInput: {
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.darkGray,
    marginBottom: 16,
  },
  quickAmountLabel: {
    fontSize: SIZES.sm,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 8,
  },
  quickAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  quickAmountButton: {
    backgroundColor: COLORS.lightGray,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: SIZES.borderRadius,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  quickAmountButtonActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  quickAmountText: {
    fontSize: SIZES.sm,
    color: COLORS.darkGray,
  },
  quickAmountTextActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  paymentMethodLabel: {
    fontSize: SIZES.sm,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 8,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    padding: 16,
    borderRadius: SIZES.borderRadius,
    marginBottom: 24,
  },
  paymentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentMethodText: {
    flex: 1,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
    marginLeft: 12,
  },
  topUpButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: SIZES.borderRadius,
    alignItems: 'center',
    marginBottom: 16,
  },
  topUpButtonText: {
    color: COLORS.white,
    fontSize: SIZES.lg,
    fontWeight: 'bold',
  },
});

export default WalletScreen;
