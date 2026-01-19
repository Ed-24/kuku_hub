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
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';

const TrackOrderScreen = ({ route, navigation }) => {
  const { order } = route.params || {};

  const orderDetails = {
    id: order?.id || '1003',
    status: order?.status || 'in_transit',
    total: order?.total || 75000,
    createdAt: order?.createdAt || new Date().toISOString(),
  };

  const trackingSteps = [
    {
      id: 1,
      title: 'Order Placed',
      subtitle: 'Your order has been received',
      time: '09:00 AM',
      date: 'Jan 15, 2026',
      completed: true,
    },
    {
      id: 2,
      title: 'Order Confirmed',
      subtitle: 'Seller confirmed your order',
      time: '10:30 AM',
      date: 'Jan 15, 2026',
      completed: true,
    },
    {
      id: 3,
      title: 'Order Processed',
      subtitle: 'Your order is being prepared',
      time: '02:00 PM',
      date: 'Jan 15, 2026',
      completed: true,
    },
    {
      id: 4,
      title: 'Out for Delivery',
      subtitle: 'Your order is on the way',
      time: '08:00 AM',
      date: 'Jan 16, 2026',
      completed: orderDetails.status === 'delivered',
      current: orderDetails.status === 'in_transit',
    },
    {
      id: 5,
      title: 'Delivered',
      subtitle: 'Order delivered successfully',
      time: '',
      date: '',
      completed: orderDetails.status === 'delivered',
    },
  ];

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
        <Text style={styles.headerTitle}>Track Order</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.orderInfoCard}>
          <View style={styles.orderInfoHeader}>
            <View>
              <Text style={styles.orderLabel}>Order ID</Text>
              <Text style={styles.orderId}>#{orderDetails.id}</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>
                {orderDetails.status === 'delivered'
                  ? 'Delivered'
                  : 'In Transit'}
              </Text>
            </View>
          </View>
          <View style={styles.orderInfoRow}>
            <View style={styles.orderInfoItem}>
              <Text style={styles.infoLabel}>Estimated Delivery</Text>
              <Text style={styles.infoValue}>Jan 17, 2026</Text>
            </View>
            <View style={styles.orderInfoItem}>
              <Text style={styles.infoLabel}>Total Amount</Text>
              <Text style={styles.infoValue}>
                UGX {orderDetails.total.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.trackingSection}>
          <Text style={styles.sectionTitle}>Order Status</Text>
          <View style={styles.trackingTimeline}>
            {trackingSteps.map((step, index) => (
              <View key={step.id} style={styles.trackingStep}>
                <View style={styles.stepIndicatorContainer}>
                  <View
                    style={[
                      styles.stepCircle,
                      step.completed && styles.stepCircleCompleted,
                      step.current && styles.stepCircleCurrent,
                    ]}
                  >
                    {step.completed ? (
                      <Ionicons
                        name="checkmark"
                        size={14}
                        color={COLORS.white}
                      />
                    ) : step.current ? (
                      <View style={styles.currentDot} />
                    ) : null}
                  </View>
                  {index < trackingSteps.length - 1 && (
                    <View
                      style={[
                        styles.stepLine,
                        step.completed && styles.stepLineCompleted,
                      ]}
                    />
                  )}
                </View>
                <View style={styles.stepContent}>
                  <Text
                    style={[
                      styles.stepTitle,
                      (step.completed || step.current) && styles.stepTitleActive,
                    ]}
                  >
                    {step.title}
                  </Text>
                  <Text style={styles.stepSubtitle}>{step.subtitle}</Text>
                  {step.time && (
                    <Text style={styles.stepTime}>
                      {step.date} at {step.time}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.deliverySection}>
          <Text style={styles.sectionTitle}>Delivery Information</Text>
          <View style={styles.deliveryCard}>
            <View style={styles.deliveryRow}>
              <View style={styles.deliveryIcon}>
                <Ionicons name="person" size={20} color={COLORS.primary} />
              </View>
              <View style={styles.deliveryInfo}>
                <Text style={styles.deliveryLabel}>Delivery Person</Text>
                <Text style={styles.deliveryValue}>John Mukasa</Text>
              </View>
              <TouchableOpacity style={styles.callButton}>
                <Ionicons name="call" size={20} color={COLORS.white} />
              </TouchableOpacity>
            </View>
            <View style={styles.deliveryRow}>
              <View style={styles.deliveryIcon}>
                <Ionicons name="location" size={20} color={COLORS.primary} />
              </View>
              <View style={styles.deliveryInfo}>
                <Text style={styles.deliveryLabel}>Delivery Address</Text>
                <Text style={styles.deliveryValue}>
                  123 Main Street, Kampala
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.supportButton}>
            <Ionicons name="chatbubbles" size={20} color={COLORS.primary} />
            <Text style={styles.supportButtonText}>Contact Support</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dashboardButton}
            onPress={() => navigation.navigate('Dashboard')}
          >
            <Text style={styles.dashboardButtonText}>Go to Dashboard</Text>
          </TouchableOpacity>
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
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: SIZES.padding,
  },
  orderInfoCard: {
    backgroundColor: COLORS.primary,
    marginHorizontal: SIZES.padding,
    borderRadius: SIZES.borderRadiusLarge,
    padding: SIZES.padding,
    marginBottom: SIZES.margin,
  },
  orderInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderLabel: {
    fontSize: SIZES.sm,
    color: COLORS.white,
    opacity: 0.8,
  },
  orderId: {
    fontSize: SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  statusBadge: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: COLORS.primary,
    fontSize: SIZES.sm,
    fontWeight: '600',
  },
  orderInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderInfoItem: {},
  infoLabel: {
    fontSize: SIZES.sm,
    color: COLORS.white,
    opacity: 0.8,
  },
  infoValue: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.white,
    marginTop: 2,
  },
  trackingSection: {
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.margin,
  },
  sectionTitle: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: 16,
  },
  trackingTimeline: {},
  trackingStep: {
    flexDirection: 'row',
    minHeight: 70,
  },
  stepIndicatorContainer: {
    alignItems: 'center',
    width: 30,
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.lightGray,
    borderWidth: 2,
    borderColor: COLORS.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleCompleted: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  stepCircleCurrent: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    borderWidth: 3,
  },
  currentDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  stepLine: {
    flex: 1,
    width: 2,
    backgroundColor: COLORS.lightGray,
    marginVertical: 4,
  },
  stepLineCompleted: {
    backgroundColor: COLORS.primary,
  },
  stepContent: {
    flex: 1,
    marginLeft: 12,
    paddingBottom: 20,
  },
  stepTitle: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.gray,
  },
  stepTitleActive: {
    color: COLORS.darkGray,
  },
  stepSubtitle: {
    fontSize: SIZES.sm,
    color: COLORS.gray,
    marginTop: 2,
  },
  stepTime: {
    fontSize: SIZES.xs,
    color: COLORS.gray,
    marginTop: 4,
  },
  deliverySection: {
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.margin,
  },
  deliveryCard: {
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.padding,
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  deliveryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryInfo: {
    flex: 1,
    marginLeft: 12,
  },
  deliveryLabel: {
    fontSize: SIZES.sm,
    color: COLORS.gray,
  },
  deliveryValue: {
    fontSize: SIZES.md,
    fontWeight: '500',
    color: COLORS.darkGray,
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsSection: {
    paddingHorizontal: SIZES.padding,
    paddingBottom: SIZES.padding * 2,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.lightGray,
    paddingVertical: 14,
    borderRadius: SIZES.borderRadius,
    marginBottom: 12,
  },
  supportButtonText: {
    color: COLORS.primary,
    fontSize: SIZES.md,
    fontWeight: '600',
    marginLeft: 8,
  },
  dashboardButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: SIZES.borderRadius,
    alignItems: 'center',
  },
  dashboardButtonText: {
    color: COLORS.white,
    fontSize: SIZES.lg,
    fontWeight: 'bold',
  },
});

export default TrackOrderScreen;
