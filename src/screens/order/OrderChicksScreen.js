import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';

const CATEGORIES = [
  { id: 'local', name: 'Local Chicks', icon: '🐤' },
  { id: 'layers', name: 'Layers', icon: '🐔' },
  { id: 'broilers', name: 'Broilers', icon: '🍗' },
];

const PRODUCTS = [
  {
    id: '1',
    name: 'Biyinzika Poultry',
    description: 'At Biyinzika we have the best breeds for layers and we have different types.',
    price: 4000,
    priceUnit: '1 day old',
    monthlyPrice: 10000,
    category: 'layers',
    rating: 4.8,
    image: '🐔',
  },
  {
    id: '2',
    name: 'Kuroiler Chicks',
    description: 'Local chickens are hardy birds specifically raised for meat production.',
    price: 3500,
    priceUnit: '1 day old',
    monthlyPrice: 8000,
    category: 'local',
    rating: 4.5,
    image: '🐤',
  },
  {
    id: '3',
    name: 'Ross 308 Broilers',
    description: 'Orders are hybrid chickens developed for meat production.',
    price: 5000,
    priceUnit: '1 day old',
    monthlyPrice: 12000,
    category: 'broilers',
    rating: 4.9,
    image: '🍗',
  },
  {
    id: '4',
    name: 'Isa Brown Layers',
    description: 'High-yield egg production breeds with excellent feed conversion.',
    price: 4500,
    priceUnit: '1 day old',
    monthlyPrice: 11000,
    category: 'layers',
    rating: 4.7,
    image: '🐔',
  },
];

const OrderChicksScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('local');

  const filteredProducts = PRODUCTS.filter(
    (p) => p.category === selectedCategory
  );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.categoryItemActive,
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Text style={styles.categoryEmoji}>{item.icon}</Text>
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.id && styles.categoryTextActive,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <View style={styles.productImageContainer}>
        <Text style={styles.productEmoji}>{item.image}</Text>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.productPrice}>
            Price: <Text style={styles.priceValue}>UGX {item.price.toLocaleString()}</Text> for {item.priceUnit}
          </Text>
        </View>
        <Text style={styles.monthlyPrice}>
          UGX {item.monthlyPrice.toLocaleString()} for a month
        </Text>
        <View style={styles.productFooter}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          >
            <Text style={styles.viewButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
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
        <Text style={styles.headerTitle}>ORDER CHICKS</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Ionicons name="cart-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.categoriesContainer}>
          <FlatList
            data={CATEGORIES}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.productsList}
          showsVerticalScrollIndicator={false}
        />
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
  cartButton: {
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
  categoriesContainer: {
    paddingVertical: SIZES.padding,
  },
  categoriesList: {
    paddingHorizontal: SIZES.padding,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: SIZES.borderRadius,
    marginRight: 12,
  },
  categoryItemActive: {
    backgroundColor: COLORS.primary,
  },
  categoryEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  categoryText: {
    fontSize: SIZES.md,
    color: COLORS.darkGray,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: COLORS.white,
  },
  productsList: {
    paddingHorizontal: SIZES.padding,
    paddingBottom: SIZES.padding * 2,
  },
  productCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadiusLarge,
    marginBottom: SIZES.margin,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  productImageContainer: {
    height: 150,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productEmoji: {
    fontSize: 80,
  },
  productInfo: {
    padding: SIZES.padding,
  },
  productName: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: 4,
  },
  productDescription: {
    fontSize: SIZES.sm,
    color: COLORS.gray,
    marginBottom: 8,
    lineHeight: 20,
  },
  priceRow: {
    marginBottom: 4,
  },
  productPrice: {
    fontSize: SIZES.sm,
    color: COLORS.darkGray,
  },
  priceValue: {
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  monthlyPrice: {
    fontSize: SIZES.sm,
    color: COLORS.gray,
    marginBottom: 12,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: SIZES.sm,
    color: COLORS.darkGray,
    fontWeight: '600',
  },
  viewButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: SIZES.borderRadius,
  },
  viewButtonText: {
    color: COLORS.white,
    fontSize: SIZES.sm,
    fontWeight: '600',
  },
});

export default OrderChicksScreen;
