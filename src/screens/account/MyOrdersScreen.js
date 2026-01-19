import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { useApp } from '../../context/AppContext';

const MyOrdersScreen = ({ navigation }) => {
  const { orders } = useApp();

  const defaultOrders = [
    {
      id: '1001',
      items: [{ name: 'Biyinzika Poultry', quantity: 10 }],
      total: 50000,
      status: 'delivered',
      createdAt: new Date(Date.now() - 604800000).toISOString(),
    },
    {
      id: '1002',
      items: [{ name: 'Kuroiler Chicks', quantity: 20 }],
      total: 70000,
      status: 'in_transit',
      createdAt: new Date(Date.now() - 259200000).toISOString(),
    },
    {
      id: '1003',
      items: [{ name: 'Ross 308 Broilers', quantity: 15 }],
      total: 75000,
      status: 'pending',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ];

  const allOrders = orders.length > 0 ? orders : defaultOrders;

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return COLORS.success;
      case 'in_transit':
        return COLORS.primary;
      case 'pending':
        return COLORS.warning;
      case 'cancelled':
        return COLORS.error;
      default:
        return COLORS.gray;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'in_transit':
        return 'In Transit';
      case 'pending':
        return 'Pending';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={() => navigation.navigate('TrackOrder', { order: item })}
    >
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Order #{item.id}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: `${getStatusColor(item.status)}15` },
          ]}
        >
          <Text
            style={[styles.statusText, { color: getStatusColor(item.status) }]}
          >
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>

      <View style={styles.orderContent}>
        <View style={styles.orderIconContainer}>
          <Text style={styles.orderEmoji}>🐔</Text>
        </View>
        <View style={styles.orderInfo}>
          {item.items.map((orderItem, index) => (
            <Text key={index} style={styles.itemName}>
              {orderItem.name} x {orderItem.quantity}
            </Text>
          ))}
          <Text style={styles.orderDate}>{formatDate(item.createdAt)}</Text>
        </View>
        <Text style={styles.orderTotal}>
          UGX {item.total.toLocaleString()}
        </Text>
      </View>

      <View style={styles.orderFooter}>
        <TouchableOpacity
          style={styles.trackButton}
          onPress={() => navigation.navigate('TrackOrder', { order: item })}
        >
          <Ionicons name="location" size={16} color={COLORS.primary} />
          <Text style={styles.trackButtonText}>Track Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reorderButton}>
          <Ionicons name="refresh" size={16} color={COLORS.white} />
          <Text style={styles.reorderButtonText}>Reorder</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        {allOrders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={80} color={COLORS.gray} />
            <Text style={styles.emptyTitle}>No Orders Yet</Text>
            <Text style={styles.emptyText}>
              You haven't placed any orders yet
            </Text>
            <TouchableOpacity
              style={styles.shopButton}
              onPress={() => navigation.navigate('OrderChicks')}
            >
              <Text style={styles.shopButtonText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={allOrders}
            renderItem={renderOrderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.ordersList}
            showsVerticalScrollIndicator={false}
          />
        )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding * 2,
  },
  emptyTitle: {
    fontSize: SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginTop: 16,
  },
  emptyText: {
    fontSize: SIZES.md,
    color: COLORS.gray,
    marginTop: 8,
    marginBottom: 24,
  },
  shopButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: SIZES.borderRadius,
  },
  shopButtonText: {
    color: COLORS.white,
    fontSize: SIZES.md,
    fontWeight: 'bold',
  },
  ordersList: {
    padding: SIZES.padding,
  },
  orderCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadiusLarge,
    padding: SIZES.padding,
    marginBottom: SIZES.margin,
    ...SHADOWS.medium,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: SIZES.md,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: SIZES.xs,
    fontWeight: '600',
  },
  orderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  orderIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderEmoji: {
    fontSize: 28,
  },
  orderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: SIZES.md,
    color: COLORS.darkGray,
    fontWeight: '500',
  },
  orderDate: {
    fontSize: SIZES.sm,
    color: COLORS.gray,
    marginTop: 4,
  },
  orderTotal: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: SIZES.borderRadius,
  },
  trackButtonText: {
    color: COLORS.primary,
    fontSize: SIZES.sm,
    fontWeight: '600',
    marginLeft: 6,
  },
  reorderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: SIZES.borderRadius,
  },
  reorderButtonText: {
    color: COLORS.white,
    fontSize: SIZES.sm,
    fontWeight: '600',
    marginLeft: 6,
  },
});

export default MyOrdersScreen;
