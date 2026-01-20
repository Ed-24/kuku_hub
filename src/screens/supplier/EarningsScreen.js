import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';

const { width } = Dimensions.get('window');

const EARNINGS_DATA = {
  totalEarnings: 2500000,
  pendingPayout: 350000,
  thisMonth: 850000,
  lastMonth: 720000,
  transactions: [
    {
      id: '1',
      orderId: '#1045',
      customer: 'Samuel Mulungi',
      amount: 150000,
      status: 'completed',
      date: 'Jan 18, 2026',
    },
    {
      id: '2',
      orderId: '#1044',
      customer: 'Naluwooza Zion',
      amount: 200000,
      status: 'completed',
      date: 'Jan 17, 2026',
    },
    {
      id: '3',
      orderId: '#1043',
      customer: 'Edith Musasizi',
      amount: 75000,
      status: 'pending',
      date: 'Jan 16, 2026',
    },
    {
      id: '4',
      orderId: '#1042',
      customer: 'Mirembe Dorcus',
      amount: 125000,
      status: 'completed',
      date: 'Jan 15, 2026',
    },
    {
      id: '5',
      orderId: '#1041',
      customer: 'Kihumuro Annah',
      amount: 300000,
      status: 'completed',
      date: 'Jan 14, 2026',
    },
  ],
  monthlyData: [
    { month: 'Aug', amount: 450000 },
    { month: 'Sep', amount: 520000 },
    { month: 'Oct', amount: 380000 },
    { month: 'Nov', amount: 650000 },
    { month: 'Dec', amount: 720000 },
    { month: 'Jan', amount: 850000 },
  ],
};

const EarningsScreen = ({ navigation }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const periods = [
    { id: 'week', name: 'Week' },
    { id: 'month', name: 'Month' },
    { id: 'year', name: 'Year' },
  ];

  const maxAmount = Math.max(...EARNINGS_DATA.monthlyData.map((d) => d.amount));

  const renderTransaction = (transaction) => (
    <View key={transaction.id} style={styles.transactionItem}>
      <View style={styles.transactionIcon}>
        <Ionicons
          name={transaction.status === 'completed' ? 'checkmark-circle' : 'time'}
          size={24}
          color={
            transaction.status === 'completed' ? COLORS.success : COLORS.warning
          }
        />
      </View>
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionOrderId}>{transaction.orderId}</Text>
        <Text style={styles.transactionCustomer}>{transaction.customer}</Text>
        <Text style={styles.transactionDate}>{transaction.date}</Text>
      </View>
      <View style={styles.transactionAmountContainer}>
        <Text style={styles.transactionAmount}>
          UGX {transaction.amount.toLocaleString()}
        </Text>
        <View
          style={[
            styles.statusBadge,
            transaction.status === 'completed'
              ? styles.statusCompleted
              : styles.statusPending,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              transaction.status === 'completed'
                ? styles.statusTextCompleted
                : styles.statusTextPending,
            ]}
          >
            {transaction.status === 'completed' ? 'Paid' : 'Pending'}
          </Text>
        </View>
      </View>
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
        <Text style={styles.headerTitle}>Earnings</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.earningsCard}>
          <Text style={styles.earningsLabel}>Total Earnings</Text>
          <Text style={styles.earningsAmount}>
            UGX {EARNINGS_DATA.totalEarnings.toLocaleString()}
          </Text>
          <View style={styles.earningsStats}>
            <View style={styles.earningStat}>
              <Ionicons name="time-outline" size={18} color={COLORS.white} />
              <Text style={styles.earningStatLabel}>Pending</Text>
              <Text style={styles.earningStatValue}>
                UGX {EARNINGS_DATA.pendingPayout.toLocaleString()}
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.earningStat}>
              <Ionicons name="trending-up" size={18} color={COLORS.white} />
              <Text style={styles.earningStatLabel}>This Month</Text>
              <Text style={styles.earningStatValue}>
                UGX {EARNINGS_DATA.thisMonth.toLocaleString()}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.withdrawButton}>
            <Text style={styles.withdrawButtonText}>Withdraw Funds</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.chartSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Earnings Overview</Text>
            <View style={styles.periodSelector}>
              {periods.map((period) => (
                <TouchableOpacity
                  key={period.id}
                  style={[
                    styles.periodButton,
                    selectedPeriod === period.id && styles.periodButtonActive,
                  ]}
                  onPress={() => setSelectedPeriod(period.id)}
                >
                  <Text
                    style={[
                      styles.periodText,
                      selectedPeriod === period.id && styles.periodTextActive,
                    ]}
                  >
                    {period.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.chartContainer}>
            {EARNINGS_DATA.monthlyData.map((data, index) => (
              <View key={index} style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: (data.amount / maxAmount) * 120,
                      backgroundColor:
                        index === EARNINGS_DATA.monthlyData.length - 1
                          ? COLORS.primary
                          : COLORS.secondary,
                    },
                  ]}
                />
                <Text style={styles.barLabel}>{data.month}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.transactionsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {EARNINGS_DATA.transactions.map(renderTransaction)}
        </View>

        <View style={styles.payoutInfo}>
          <Ionicons name="information-circle" size={24} color={COLORS.primary} />
          <View style={styles.payoutInfoContent}>
            <Text style={styles.payoutInfoTitle}>Next Payout</Text>
            <Text style={styles.payoutInfoText}>
              Your next payout of UGX {EARNINGS_DATA.pendingPayout.toLocaleString()}{' '}
              will be processed on January 25, 2026
            </Text>
          </View>
        </View>
      </ScrollView>
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
  filterButton: {
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
  earningsCard: {
    backgroundColor: COLORS.primary,
    margin: SIZES.padding,
    borderRadius: SIZES.borderRadiusLarge,
    padding: SIZES.padding * 1.5,
    alignItems: 'center',
  },
  earningsLabel: {
    fontSize: SIZES.md,
    color: COLORS.white,
    opacity: 0.8,
  },
  earningsAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.white,
    marginVertical: 8,
  },
  earningsStats: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 16,
    marginBottom: 20,
  },
  earningStat: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  earningStatLabel: {
    fontSize: SIZES.sm,
    color: COLORS.white,
    opacity: 0.8,
    marginTop: 4,
  },
  earningStatValue: {
    fontSize: SIZES.md,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: 2,
  },
  withdrawButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: SIZES.borderRadius,
  },
  withdrawButtonText: {
    color: COLORS.primary,
    fontSize: SIZES.md,
    fontWeight: 'bold',
  },
  chartSection: {
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.padding,
  },
  sectionHeader: {
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
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.borderRadius,
    padding: 2,
  },
  periodButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: SIZES.borderRadius - 2,
  },
  periodButtonActive: {
    backgroundColor: COLORS.primary,
  },
  periodText: {
    fontSize: SIZES.sm,
    color: COLORS.gray,
  },
  periodTextActive: {
    color: COLORS.white,
    fontWeight: '600',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.padding,
  },
  barContainer: {
    alignItems: 'center',
  },
  bar: {
    width: 30,
    borderRadius: 4,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: SIZES.xs,
    color: COLORS.gray,
  },
  transactionsSection: {
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.padding,
  },
  seeAllText: {
    fontSize: SIZES.sm,
    color: COLORS.primary,
    fontWeight: '600',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.borderRadius,
    padding: 12,
    marginBottom: 8,
  },
  transactionIcon: {
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionOrderId: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  transactionCustomer: {
    fontSize: SIZES.sm,
    color: COLORS.gray,
  },
  transactionDate: {
    fontSize: SIZES.xs,
    color: COLORS.gray,
    marginTop: 2,
  },
  transactionAmountContainer: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: SIZES.md,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  statusBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  statusCompleted: {
    backgroundColor: '#E8F5E9',
  },
  statusPending: {
    backgroundColor: '#FFF3E0',
  },
  statusText: {
    fontSize: SIZES.xs,
    fontWeight: '600',
  },
  statusTextCompleted: {
    color: COLORS.success,
  },
  statusTextPending: {
    color: '#FF9800',
  },
  payoutInfo: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.padding * 2,
    padding: SIZES.padding,
    borderRadius: SIZES.borderRadius,
  },
  payoutInfoContent: {
    flex: 1,
    marginLeft: 12,
  },
  payoutInfoTitle: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.primary,
  },
  payoutInfoText: {
    fontSize: SIZES.sm,
    color: COLORS.gray,
    marginTop: 4,
    lineHeight: 20,
  },
});

export default EarningsScreen;
