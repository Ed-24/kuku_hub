import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';

const SERVICES = [
  {
    id: '1',
    name: 'Vaccination Services',
    description: 'Professional poultry vaccination by certified veterinarians',
    price: 'From UGX 5,000',
    icon: 'medical',
    rating: 4.9,
    reviews: 234,
  },
  {
    id: '2',
    name: 'Feed Delivery',
    description: 'Quality poultry feed delivered to your doorstep',
    price: 'From UGX 50,000',
    icon: 'cube',
    rating: 4.7,
    reviews: 189,
  },
  {
    id: '3',
    name: 'Veterinary Consultation',
    description: 'Expert advice on poultry health and management',
    price: 'UGX 20,000/session',
    icon: 'chatbubbles',
    rating: 4.8,
    reviews: 156,
  },
  {
    id: '4',
    name: 'Farm Setup Assistance',
    description: 'Complete guidance for setting up your poultry farm',
    price: 'From UGX 100,000',
    icon: 'construct',
    rating: 4.6,
    reviews: 87,
  },
  {
    id: '5',
    name: 'Equipment Rental',
    description: 'Rent incubators, brooders, and other equipment',
    price: 'From UGX 30,000/day',
    icon: 'hardware-chip',
    rating: 4.5,
    reviews: 112,
  },
  {
    id: '6',
    name: 'Training & Workshops',
    description: 'Learn modern poultry farming techniques',
    price: 'UGX 50,000/session',
    icon: 'school',
    rating: 4.9,
    reviews: 298,
  },
];

const ServicesScreen = ({ navigation }) => {
  const renderServiceCard = (service) => (
    <TouchableOpacity key={service.id} style={styles.serviceCard}>
      <View style={styles.serviceIconContainer}>
        <Ionicons name={service.icon} size={32} color={COLORS.primary} />
      </View>
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{service.name}</Text>
        <Text style={styles.serviceDescription} numberOfLines={2}>
          {service.description}
        </Text>
        <View style={styles.serviceFooter}>
          <Text style={styles.servicePrice}>{service.price}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>
              {service.rating} ({service.reviews})
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book</Text>
      </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Services</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <Text style={styles.heroEmoji}>🐔</Text>
          <Text style={styles.heroTitle}>Professional Poultry Services</Text>
          <Text style={styles.heroSubtitle}>
            Everything you need for successful poultry farming
          </Text>
        </View>

        <View style={styles.servicesContainer}>
          <Text style={styles.sectionTitle}>Available Services</Text>
          {SERVICES.map(renderServiceCard)}
        </View>

        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Need Custom Services?</Text>
          <Text style={styles.contactText}>
            Contact us for personalized poultry farming solutions
          </Text>
          <TouchableOpacity style={styles.contactButton}>
            <Ionicons name="call" size={20} color={COLORS.white} />
            <Text style={styles.contactButtonText}>Contact Us</Text>
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
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: SIZES.padding * 1.5,
    paddingHorizontal: SIZES.padding,
  },
  heroEmoji: {
    fontSize: 60,
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: SIZES.md,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 8,
  },
  servicesContainer: {
    paddingHorizontal: SIZES.padding,
  },
  sectionTitle: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: 16,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.padding,
    marginBottom: 12,
    ...SHADOWS.medium,
  },
  serviceIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceInfo: {
    flex: 1,
    marginLeft: 12,
  },
  serviceName: {
    fontSize: SIZES.md,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  serviceDescription: {
    fontSize: SIZES.sm,
    color: COLORS.gray,
    marginTop: 4,
    lineHeight: 18,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  servicePrice: {
    fontSize: SIZES.sm,
    fontWeight: '600',
    color: COLORS.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: SIZES.xs,
    color: COLORS.gray,
    marginLeft: 4,
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: SIZES.borderRadius,
  },
  bookButtonText: {
    color: COLORS.white,
    fontSize: SIZES.sm,
    fontWeight: '600',
  },
  contactSection: {
    backgroundColor: COLORS.lightGray,
    margin: SIZES.padding,
    padding: SIZES.padding,
    borderRadius: SIZES.borderRadiusLarge,
    alignItems: 'center',
    marginBottom: SIZES.padding * 2,
  },
  contactTitle: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  contactText: {
    fontSize: SIZES.sm,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: SIZES.borderRadius,
  },
  contactButtonText: {
    color: COLORS.white,
    fontSize: SIZES.md,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default ServicesScreen;
