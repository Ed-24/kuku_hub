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
import { COLORS, SIZES } from '../../constants/theme';

const TERMS_SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing and using the Kuku Hub mobile application, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.

Kuku Hub reserves the right to modify these terms at any time. Continued use of the application after changes constitutes acceptance of the modified terms.`,
  },
  {
    title: '2. User Accounts',
    content: `To use certain features of Kuku Hub, you must create an account. You are responsible for:

• Maintaining the confidentiality of your account credentials
• All activities that occur under your account
• Providing accurate and current information
• Notifying us immediately of any unauthorized use

We reserve the right to suspend or terminate accounts that violate these terms.`,
  },
  {
    title: '3. Orders and Payments',
    content: `When placing orders through Kuku Hub:

• All prices are displayed in Ugandan Shillings (UGX)
• Prices are subject to change without notice
• Payment must be made through approved payment methods
• Orders are subject to availability and confirmation
• Delivery times are estimates and not guaranteed

Refunds are processed according to our refund policy, typically within 7-14 business days.`,
  },
  {
    title: '4. Product Quality',
    content: `Kuku Hub works with verified suppliers to ensure quality poultry products. However:

• Product images are representative and may vary
• Suppliers are responsible for product quality
• Health certifications are provided where applicable
• Users should inspect products upon delivery
• Claims must be made within 24 hours of delivery`,
  },
  {
    title: '5. User Conduct',
    content: `Users agree not to:

• Use the service for illegal purposes
• Harass, abuse, or harm other users
• Post false or misleading information
• Attempt to gain unauthorized access
• Interfere with the proper functioning of the service
• Use automated systems to access the service

Violation of these rules may result in account termination.`,
  },
  {
    title: '6. Intellectual Property',
    content: `All content on Kuku Hub, including but not limited to text, graphics, logos, and software, is the property of Kuku Hub or its licensors and is protected by intellectual property laws.

Users may not reproduce, distribute, or create derivative works without explicit permission.`,
  },
  {
    title: '7. Privacy Policy',
    content: `Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using Kuku Hub, you consent to our data practices as described in the Privacy Policy.

We do not sell your personal information to third parties.`,
  },
  {
    title: '8. Limitation of Liability',
    content: `Kuku Hub is provided "as is" without warranties of any kind. We are not liable for:

• Indirect, incidental, or consequential damages
• Loss of profits or data
• Service interruptions
• Third-party actions
• Force majeure events

Our maximum liability is limited to the amount paid for the specific order in question.`,
  },
  {
    title: '9. Contact Information',
    content: `For questions about these Terms and Conditions, contact us:

Email: legal@kukuhub.com
Phone: +256 800 123 456
Address: Plot 123, Kampala Road, Kampala, Uganda

Office Hours: Monday - Friday, 8:00 AM - 5:00 PM EAT`,
  },
];

const TermsScreen = ({ navigation }) => {
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
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.introSection}>
          <Text style={styles.lastUpdated}>Last Updated: January 15, 2026</Text>
          <Text style={styles.introText}>
            Welcome to Kuku Hub. These Terms and Conditions govern your use of our
            mobile application and services. Please read them carefully.
          </Text>
        </View>

        {TERMS_SECTIONS.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionContent}>{section.content}</Text>
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By using Kuku Hub, you acknowledge that you have read, understood, and
            agree to be bound by these Terms and Conditions.
          </Text>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.acceptButtonText}>I Understand</Text>
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
    fontSize: SIZES.lg,
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
  introSection: {
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  lastUpdated: {
    fontSize: SIZES.sm,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: 12,
  },
  introText: {
    fontSize: SIZES.md,
    color: COLORS.gray,
    lineHeight: 22,
  },
  section: {
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: SIZES.md,
    color: COLORS.gray,
    lineHeight: 24,
  },
  footer: {
    padding: SIZES.padding,
    paddingBottom: SIZES.padding * 2,
  },
  footerText: {
    fontSize: SIZES.sm,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  acceptButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: SIZES.borderRadius,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: COLORS.white,
    fontSize: SIZES.lg,
    fontWeight: 'bold',
  },
});

export default TermsScreen;
