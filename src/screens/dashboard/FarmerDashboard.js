import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { useApp } from '../../context/AppContext';

const FarmerDashboard = () => {
  const navigation = useNavigation();
  const { user } = useApp();
  const userName = user?.name || 'Paul';

  const navigateTo = (screen) => {
    const parent = navigation.getParent();
    if (parent) {
      parent.navigate(screen);
    } else {
      navigation.navigate(screen);
    }
  };

  const menuItems = [
    {
      id: 'inventory',
      title: 'My Inventory',
      icon: 'cube-outline',
      description: 'Manage your stock',
      onPress: () => navigateTo('Inventory'),
    },
    {
      id: 'orders',
      title: 'Orders',
      icon: 'receipt-outline',
      description: 'View incoming orders',
      onPress: () => navigateTo('MyOrders'),
    },
    {
      id: 'earnings',
      title: 'Earnings',
      icon: 'cash-outline',
      description: 'Track your earnings',
      onPress: () => navigateTo('Earnings'),
    },
    {
      id: 'analytics',
      title: 'Analytics',
      icon: 'bar-chart-outline',
      description: 'View sales analytics',
      onPress: () => navigateTo('Analytics'),
    },
  ];

  const stats = [
    { label: 'Total Sales', value: 'UGX 2.5M', icon: 'trending-up' },
    { label: 'Orders', value: '156', icon: 'cart' },
    { label: 'Rating', value: '4.8', icon: 'star' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Hello {userName},</Text>
            <Text style={styles.welcomeBack}>Welcome back!</Text>
            <Text style={styles.userType}>Farmer Account</Text>
          </View>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => navigateTo('Notifications')}
          >
            <Ionicons name="notifications" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Ionicons name={stat.icon} size={20} color={COLORS.white} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.menuGrid}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuIconContainer}>
                <Ionicons name={item.icon} size={32} color={COLORS.primary} />
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuDescription}>{item.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.recentOrders}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            <TouchableOpacity onPress={() => navigateTo('MyOrders')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {[1, 2, 3].map((order) => (
            <TouchableOpacity
              key={order}
              style={styles.orderItem}
              onPress={() => navigateTo('TrackOrder')}
            >
              <View style={styles.orderIcon}>
                <Ionicons name="receipt" size={24} color={COLORS.primary} />
              </View>
              <View style={styles.orderInfo}>
                <Text style={styles.orderTitle}>Order #{1000 + order}</Text>
                <Text style={styles.orderDate}>Jan {10 + order}, 2026</Text>
              </View>
              <View style={styles.orderStatus}>
                <Text style={styles.orderAmount}>UGX 50,000</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>Pending</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsRow}>
            <TouchableOpacity
              style={styles.quickActionItem}
              onPress={() => navigateTo('Inventory')}
            >
              <Ionicons name="add-circle" size={24} color={COLORS.primary} />
              <Text style={styles.quickActionText}>Add Stock</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickActionItem}
              onPress={() => navigateTo('Inventory')}
            >
              <Ionicons name="pricetag" size={24} color={COLORS.primary} />
              <Text style={styles.quickActionText}>Update Prices</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickActionItem}
              onPress={() => navigateTo('Messages')}
            >
              <Ionicons name="chatbubbles" size={24} color={COLORS.primary} />
              <Text style={styles.quickActionText}>Messages</Text>
            </TouchableOpacity>
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
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding,
    paddingBottom: SIZES.padding * 1.5,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: SIZES.lg,
    color: COLORS.white,
    opacity: 0.9,
  },
  welcomeBack: {
    fontSize: SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  userType: {
    fontSize: SIZES.sm,
    color: COLORS.white,
    opacity: 0.7,
    marginTop: 4,
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.margin,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: SIZES.borderRadiusLarge,
    padding: SIZES.padding,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: 4,
  },
  statLabel: {
    fontSize: SIZES.xs,
    color: COLORS.white,
    opacity: 0.8,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: SIZES.padding,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SIZES.padding,
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadiusLarge,
    padding: SIZES.padding,
    marginBottom: SIZES.margin,
    ...SHADOWS.medium,
  },
  menuIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  menuTitle: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: SIZES.sm,
    color: COLORS.gray,
  },
  recentOrders: {
    paddingHorizontal: SIZES.padding,
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.borderRadius,
    padding: 12,
    marginBottom: 8,
  },
  orderIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  orderTitle: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  orderDate: {
    fontSize: SIZES.sm,
    color: COLORS.gray,
  },
  orderStatus: {
    alignItems: 'flex-end',
  },
  orderAmount: {
    fontSize: SIZES.md,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  statusBadge: {
    backgroundColor: COLORS.warning,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  statusText: {
    fontSize: SIZES.xs,
    color: COLORS.white,
    fontWeight: '600',
  },
  quickActions: {
    paddingHorizontal: SIZES.padding,
    marginTop: SIZES.margin,
    marginBottom: SIZES.margin * 2,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  quickActionItem: {
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: SIZES.borderRadius,
    width: '31%',
  },
  quickActionText: {
    marginTop: 8,
    fontSize: SIZES.xs,
    color: COLORS.darkGray,
    textAlign: 'center',
  },
});

export default FarmerDashboard;
