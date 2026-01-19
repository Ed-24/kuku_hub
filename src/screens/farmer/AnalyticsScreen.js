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

const ANALYTICS_DATA = {
  summary: {
    totalOrders: 156,
    ordersChange: 12,
    totalRevenue: 2500000,
    revenueChange: 18,
    avgOrderValue: 16025,
    avgChange: 5,
    customerCount: 89,
    customerChange: 15,
  },
  topProducts: [
    { name: 'Layer Chicks (1 day)', sales: 450, percentage: 35 },
    { name: 'Broiler Chicks (1 day)', sales: 320, percentage: 25 },
    { name: 'Kuroiler Chicks', sales: 256, percentage: 20 },
    { name: 'Layer Chicks (1 week)', sales: 154, percentage: 12 },
    { name: 'Other Products', sales: 102, percentage: 8 },
  ],
  recentActivity: [
    { type: 'order', message: 'New order #1046 received', time: '5 min ago' },
    { type: 'review', message: 'New 5-star review from John M.', time: '1 hour ago' },
    { type: 'stock', message: 'Low stock alert: Kuroiler Chicks', time: '2 hours ago' },
    { type: 'order', message: 'Order #1045 delivered', time: '3 hours ago' },
    { type: 'payout', message: 'Payout of UGX 150,000 processed', time: '1 day ago' },
  ],
  salesByCategory: [
    { category: 'Layers', sales: 1200000, color: COLORS.primary },
    { category: 'Broilers', sales: 850000, color: '#4CAF50' },
    { category: 'Local', sales: 450000, color: '#FF9800' },
  ],
};

const AnalyticsScreen = ({ navigation }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const periods = [
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' },
    { id: 'year', name: 'This Year' },
  ];

  const StatCard = ({ title, value, change, icon, format = 'number' }) => (
    <View style={styles.statCard}>
      <View style={styles.statIconContainer}>
        <Ionicons name={icon} size={24} color={COLORS.primary} />
      </View>
      <Text style={styles.statValue}>
        {format === 'currency'
          ? `UGX ${(value / 1000).toFixed(0)}K`
          : value.toLocaleString()}
      </Text>
      <Text style={styles.statTitle}>{title}</Text>
      <View style={styles.changeContainer}>
        <Ionicons
          name={change >= 0 ? 'trending-up' : 'trending-down'}
          size={14}
          color={change >= 0 ? COLORS.success : COLORS.error}
        />
        <Text
          style={[
            styles.changeText,
            { color: change >= 0 ? COLORS.success : COLORS.error },
          ]}
        >
          {Math.abs(change)}%
        </Text>
      </View>
    </View>
  );

  const getActivityIcon = (type) => {
    switch (type) {
      case 'order':
        return { name: 'cart', color: COLORS.primary };
      case 'review':
        return { name: 'star', color: '#FFD700' };
      case 'stock':
        return { name: 'alert-circle', color: COLORS.warning };
      case 'payout':
        return { name: 'cash', color: COLORS.success };
      default:
        return { name: 'ellipse', color: COLORS.gray };
    }
  };

  const totalSales = ANALYTICS_DATA.salesByCategory.reduce(
    (sum, cat) => sum + cat.sales,
    0
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
        <Text style={styles.headerTitle}>Analytics</Text>
        <TouchableOpacity style={styles.downloadButton}>
          <Ionicons name="download-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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

        <View style={styles.statsGrid}>
          <StatCard
            title="Total Orders"
            value={ANALYTICS_DATA.summary.totalOrders}
            change={ANALYTICS_DATA.summary.ordersChange}
            icon="cart"
          />
          <StatCard
            title="Revenue"
            value={ANALYTICS_DATA.summary.totalRevenue}
            change={ANALYTICS_DATA.summary.revenueChange}
            icon="cash"
            format="currency"
          />
          <StatCard
            title="Avg. Order"
            value={ANALYTICS_DATA.summary.avgOrderValue}
            change={ANALYTICS_DATA.summary.avgChange}
            icon="analytics"
            format="currency"
          />
          <StatCard
            title="Customers"
            value={ANALYTICS_DATA.summary.customerCount}
            change={ANALYTICS_DATA.summary.customerChange}
            icon="people"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sales by Category</Text>
          <View style={styles.categoryChart}>
            {ANALYTICS_DATA.salesByCategory.map((cat, index) => (
              <View key={index} style={styles.categoryItem}>
                <View style={styles.categoryHeader}>
                  <View
                    style={[styles.categoryDot, { backgroundColor: cat.color }]}
                  />
                  <Text style={styles.categoryName}>{cat.category}</Text>
                </View>
                <View style={styles.categoryBarContainer}>
                  <View
                    style={[
                      styles.categoryBar,
                      {
                        width: `${(cat.sales / totalSales) * 100}%`,
                        backgroundColor: cat.color,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.categoryValue}>
                  UGX {(cat.sales / 1000).toFixed(0)}K
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Products</Text>
          {ANALYTICS_DATA.topProducts.map((product, index) => (
            <View key={index} style={styles.productItem}>
              <View style={styles.productRank}>
                <Text style={styles.rankText}>{index + 1}</Text>
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <View style={styles.productBarContainer}>
                  <View
                    style={[
                      styles.productBar,
                      { width: `${product.percentage}%` },
                    ]}
                  />
                </View>
              </View>
              <Text style={styles.productSales}>{product.sales} sold</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {ANALYTICS_DATA.recentActivity.map((activity, index) => {
            const icon = getActivityIcon(activity.type);
            return (
              <View key={index} style={styles.activityItem}>
                <View
                  style={[
                    styles.activityIcon,
                    { backgroundColor: `${icon.color}20` },
                  ]}
                >
                  <Ionicons name={icon.name} size={18} color={icon.color} />
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityMessage}>{activity.message}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </View>
            );
          })}
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
  downloadButton: {
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
    paddingTop: SIZES.padding,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    marginHorizontal: SIZES.padding,
    borderRadius: SIZES.borderRadius,
    padding: 4,
    marginBottom: SIZES.padding,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: SIZES.borderRadius - 2,
  },
  periodButtonActive: {
    backgroundColor: COLORS.primary,
  },
  periodText: {
    fontSize: SIZES.sm,
    color: COLORS.gray,
    fontWeight: '600',
  },
  periodTextActive: {
    color: COLORS.white,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SIZES.padding - 4,
    marginBottom: SIZES.padding,
  },
  statCard: {
    width: '50%',
    padding: 4,
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  statTitle: {
    fontSize: SIZES.sm,
    color: COLORS.gray,
    marginBottom: 4,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: SIZES.sm,
    fontWeight: '600',
    marginLeft: 4,
  },
  section: {
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
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: SIZES.sm,
    color: COLORS.primary,
    fontWeight: '600',
  },
  categoryChart: {
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.padding,
  },
  categoryItem: {
    marginBottom: 12,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  categoryName: {
    fontSize: SIZES.sm,
    color: COLORS.darkGray,
    fontWeight: '500',
  },
  categoryBarContainer: {
    height: 8,
    backgroundColor: COLORS.white,
    borderRadius: 4,
    marginBottom: 4,
  },
  categoryBar: {
    height: '100%',
    borderRadius: 4,
  },
  categoryValue: {
    fontSize: SIZES.sm,
    color: COLORS.gray,
    textAlign: 'right',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  productRank: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankText: {
    fontSize: SIZES.sm,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: SIZES.sm,
    color: COLORS.darkGray,
    marginBottom: 4,
  },
  productBarContainer: {
    height: 6,
    backgroundColor: COLORS.lightGray,
    borderRadius: 3,
  },
  productBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  productSales: {
    fontSize: SIZES.sm,
    color: COLORS.gray,
    marginLeft: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityMessage: {
    fontSize: SIZES.sm,
    color: COLORS.darkGray,
  },
  activityTime: {
    fontSize: SIZES.xs,
    color: COLORS.gray,
    marginTop: 2,
  },
});

export default AnalyticsScreen;
