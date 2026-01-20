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
import { useApp } from '../../context/AppContext';

const CheckoutScreen = ({ navigation }) => {
  const { cart, getCartTotal, clearCart, addOrder } = useApp();
  const [promoCode, setPromoCode] = useState('');

  const cartTotal = getCartTotal();
  const deliveryFee = 5000;
  const discount = 0;
  const grandTotal = cartTotal + deliveryFee - discount;

  const handlePlaceOrder = () => {
    const order = {
      items: cart,
      subtotal: cartTotal,
      deliveryFee,
      discount,
      total: grandTotal,
    };
    addOrder(order);
    clearCart();
    navigation.navigate('Notifications');
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
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="cube-outline" size={20} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Order Items</Text>
          </View>
          {cart.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <View style={styles.itemImageContainer}>
                <Text style={styles.itemEmoji}>{item.image || ''}</Text>
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDetails}>
                  {item.chickType || '1 day old'} x {item.quantity}
                </Text>
              </View>
              <Text style={styles.itemTotal}>
                UGX {(item.price * item.quantity).toLocaleString()}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.section}
          onPress={() => navigation.navigate('Address')}
        >
          <View style={styles.sectionHeader}>
            <Ionicons name="location-outline" size={20} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
          </View>
          <Text style={styles.addressText}>
            Please add your delivery address
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.section}
          onPress={() => navigation.navigate('PaymentMethod')}
        >
          <View style={styles.sectionHeader}>
            <Ionicons name="card-outline" size={20} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
          </View>
          <Text style={styles.paymentText}>Select payment method</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="pricetag-outline" size={20} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Promo Code</Text>
          </View>
          <View style={styles.promoContainer}>
            <TextInput
              style={styles.promoInput}
              placeholder="Enter promo code"
              placeholderTextColor={COLORS.gray}
              value={promoCode}
              onChangeText={setPromoCode}
            />
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="calendar-outline" size={20} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Delivery Date</Text>
          </View>
          <Text style={styles.deliveryDate}>
            Estimated: 3-5 Business Days
          </Text>
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>
              UGX {cartTotal.toLocaleString()}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>
              UGX {deliveryFee.toLocaleString()}
            </Text>
          </View>
          {discount > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount</Text>
              <Text style={[styles.summaryValue, styles.discountValue]}>
                -UGX {discount.toLocaleString()}
              </Text>
            </View>
          )}
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              UGX {grandTotal.toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerTotal}>
          <Text style={styles.footerTotalLabel}>Total</Text>
          <Text style={styles.footerTotalValue}>
            UGX {grandTotal.toLocaleString()}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.placeOrderText}>Place Order</Text>
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
    paddingTop: SIZES.padding,
  },
  section: {
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.padding,
    marginBottom: 12,
    padding: SIZES.padding,
    borderRadius: SIZES.borderRadius,
    ...SHADOWS.small,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    flex: 1,
    fontSize: SIZES.md,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginLeft: 8,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  itemImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemEmoji: {
    fontSize: 28,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  itemDetails: {
    fontSize: SIZES.sm,
    color: COLORS.gray,
  },
  itemTotal: {
    fontSize: SIZES.md,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  addressText: {
    fontSize: SIZES.sm,
    color: COLORS.gray,
  },
  paymentText: {
    fontSize: SIZES.sm,
    color: COLORS.gray,
  },
  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoInput: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: SIZES.md,
    marginRight: 8,
  },
  applyButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: SIZES.borderRadius,
  },
  applyButtonText: {
    color: COLORS.white,
    fontSize: SIZES.sm,
    fontWeight: 'bold',
  },
  deliveryDate: {
    fontSize: SIZES.sm,
    color: COLORS.gray,
  },
  summarySection: {
    backgroundColor: COLORS.lightGray,
    marginHorizontal: SIZES.padding,
    marginTop: 8,
    padding: SIZES.padding,
    borderRadius: SIZES.borderRadius,
  },
  summaryTitle: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: SIZES.md,
    color: COLORS.gray,
  },
  summaryValue: {
    fontSize: SIZES.md,
    color: COLORS.darkGray,
  },
  discountValue: {
    color: COLORS.success,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 12,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  totalValue: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  bottomPadding: {
    height: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...SHADOWS.medium,
  },
  footerTotal: {
    flex: 1,
  },
  footerTotalLabel: {
    fontSize: SIZES.sm,
    color: COLORS.gray,
  },
  footerTotalValue: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  placeOrderButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: SIZES.borderRadius,
  },
  placeOrderText: {
    color: COLORS.white,
    fontSize: SIZES.md,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;
