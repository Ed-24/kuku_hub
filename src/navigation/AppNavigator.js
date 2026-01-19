import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '../constants/theme';
import { useApp } from '../context/AppContext';

// Auth Screens
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';

// Dashboard Screens
import BuyerDashboard from '../screens/dashboard/BuyerDashboard';
import FarmerDashboard from '../screens/dashboard/FarmerDashboard';

// Order Screens
import OrderChicksScreen from '../screens/order/OrderChicksScreen';
import ProductDetailScreen from '../screens/order/ProductDetailScreen';
import SupplierScreen from '../screens/order/SupplierScreen';

// Cart Screens
import CartScreen from '../screens/cart/CartScreen';
import CheckoutScreen from '../screens/cart/CheckoutScreen';

// Payment Screens
import AddressScreen from '../screens/payment/AddressScreen';
import PaymentMethodScreen from '../screens/payment/PaymentMethodScreen';

// Account Screens
import AccountScreen from '../screens/account/AccountScreen';
import NotificationsScreen from '../screens/account/NotificationsScreen';
import MyOrdersScreen from '../screens/account/MyOrdersScreen';
import ProfileEditScreen from '../screens/account/ProfileEditScreen';
import TermsScreen from '../screens/account/TermsScreen';
import ChangePasswordScreen from '../screens/account/ChangePasswordScreen';

// Services & Wallet Screens
import ServicesScreen from '../screens/services/ServicesScreen';
import WalletScreen from '../screens/wallet/WalletScreen';

// Farmer Screens
import InventoryScreen from '../screens/farmer/InventoryScreen';
import EarningsScreen from '../screens/farmer/EarningsScreen';
import AnalyticsScreen from '../screens/farmer/AnalyticsScreen';

// Messages Screen
import MessagesScreen from '../screens/messages/MessagesScreen';

// Tracking Screen
import TrackOrderScreen from '../screens/tracking/TrackOrderScreen';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const DashboardWrapper = () => {
  const { userType } = useApp();
  return userType === 'farmer' ? <FarmerDashboard /> : <BuyerDashboard />;
};

const TabNavigator = () => {
  const { getCartCount } = useApp();
  const cartCount = getCartCount();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Tab.Navigator
        tabBarPosition="bottom"
        screenOptions={({ route }) => ({
          swipeEnabled: true,
          tabBarScrollEnabled: false,
          tabBarStyle: {
            backgroundColor: COLORS.white,
            borderTopWidth: 1,
            borderTopColor: COLORS.border,
            paddingBottom: Math.max(insets.bottom, 8),
            height: 65 + insets.bottom,
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.gray,
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
            textTransform: 'none',
            marginTop: 4,
          },
          tabBarIndicatorStyle: {
            backgroundColor: COLORS.primary,
            height: 3,
            borderRadius: 2,
            position: 'absolute',
            top: 0,
          },
          tabBarIconStyle: {
            marginTop: 8,
          },
          tabBarShowIcon: true,
          tabBarIcon: ({ focused, color }) => {
            let iconName;

            if (route.name === 'Dashboard') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'OrderTab') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'OrdersTab') {
              iconName = focused ? 'receipt' : 'receipt-outline';
            } else if (route.name === 'AccountTab') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={22} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Dashboard"
          component={DashboardWrapper}
          options={{ tabBarLabel: 'Home' }}
        />
        <Tab.Screen
          name="OrderTab"
          component={OrderChicksScreen}
          options={{
            tabBarLabel: 'Order',
            tabBarBadge: cartCount > 0 ? () => (
              <View style={styles.badge}>
                <Ionicons name="ellipse" size={8} color={COLORS.primary} />
              </View>
            ) : undefined,
          }}
        />
        <Tab.Screen
          name="OrdersTab"
          component={MyOrdersScreen}
          options={{ tabBarLabel: 'Orders' }}
        />
        <Tab.Screen
          name="AccountTab"
          component={AccountScreen}
          options={{ tabBarLabel: 'Account' }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -6,
  },
});

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Auth Stack */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />

        {/* Main App with Bottom Tabs */}
        <Stack.Screen name="MainApp" component={TabNavigator} />

        {/* Order Flow */}
        <Stack.Screen name="OrderChicks" component={OrderChicksScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="Supplier" component={SupplierScreen} />

        {/* Cart Flow */}
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />

        {/* Payment Flow */}
        <Stack.Screen name="Address" component={AddressScreen} />
        <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />

        {/* Account Screens */}
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="MyOrders" component={MyOrdersScreen} />
        <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
        <Stack.Screen name="Terms" component={TermsScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />

        {/* Services & Wallet */}
        <Stack.Screen name="Services" component={ServicesScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />

        {/* Farmer Screens */}
        <Stack.Screen name="Inventory" component={InventoryScreen} />
        <Stack.Screen name="Earnings" component={EarningsScreen} />
        <Stack.Screen name="Analytics" component={AnalyticsScreen} />

        {/* Messages */}
        <Stack.Screen name="Messages" component={MessagesScreen} />

        {/* Tracking */}
        <Stack.Screen name="TrackOrder" component={TrackOrderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
