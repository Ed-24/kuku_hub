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

const BuyerDashboard = () => {
  const navigation = useNavigation();
  const { user, userProfile } = useApp();
  
  // Get display name from userProfile or user's displayName
  const userName = userProfile?.displayName || user?.displayName || 'Guest';

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
      id: 'order',
      title: 'Order Chicks',
      icon: 'cart-outline',
      description: 'Browse and order chicks',
      onPress: () => navigateTo('OrderChicks'),
    },
    {
      id: 'orders',
      title: 'My Orders',
      icon: 'list-outline',
      description: 'View your order history',
      onPress: () => navigateTo('MyOrders'),
    },
    {
      id: 'services',
      title: 'Services',
      icon: 'construct-outline',
      description: 'Explore our services',
      onPress: () => navigateTo('Services'),
    },
    {
      id: 'wallet',
      title: 'Wallet',
      icon: 'wallet-outline',
      description: 'Manage your wallet',
      onPress: () => navigateTo('Wallet'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Hello {userName},</Text>
            <Text style={styles.welcomeBack}>Welcome back!</Text>
          </View>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {}}
          >
            <Ionicons name="search" size={24} color={COLORS.white} />
          </TouchableOpacity>
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

        <View style={styles.promoSection}>
          <Text style={styles.sectionTitle}>Special Offers</Text>
          <View style={styles.promoCard}>
            <View style={styles.promoContent}>
              <Text style={styles.promoTitle}>First Order Discount!</Text>
              <Text style={styles.promoText}>
                Get 10% off on your first order
              </Text>
              <TouchableOpacity
                style={styles.promoButton}
                onPress={() => navigateTo('OrderChicks')}
              >
                <Text style={styles.promoButtonText}>Order Now</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.promoEmoji}>🐔</Text>
          </View>
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsRow}>
            <TouchableOpacity
              style={styles.quickActionItem}
              onPress={() => navigateTo('OrderChicks')}
            >
              <Ionicons name="flash" size={24} color={COLORS.primary} />
              <Text style={styles.quickActionText}>Quick Order</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickActionItem}
              onPress={() => navigateTo('TrackOrder')}
            >
              <Ionicons name="location" size={24} color={COLORS.primary} />
              <Text style={styles.quickActionText}>Track Order</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickActionItem}
              onPress={() => navigateTo('Notifications')}
            >
              <Ionicons name="notifications" size={24} color={COLORS.primary} />
              <Text style={styles.quickActionText}>Notifications</Text>
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
    paddingVertical: SIZES.padding,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  searchButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
  promoSection: {
    paddingHorizontal: SIZES.padding,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: 12,
  },
  promoCard: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.borderRadiusLarge,
    padding: SIZES.padding,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  promoText: {
    fontSize: SIZES.sm,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: 12,
  },
  promoButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: SIZES.borderRadius,
    alignSelf: 'flex-start',
  },
  promoButtonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: SIZES.sm,
  },
  promoEmoji: {
    fontSize: 60,
  },
  quickActions: {
    paddingHorizontal: SIZES.padding,
    marginTop: SIZES.margin,
    marginBottom: SIZES.margin * 2,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export default BuyerDashboard;
