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
import { COLORS, SIZES } from '../../constants/theme';
import { useApp } from '../../context/AppContext';

const ProfileEditScreen = ({ navigation }) => {
  const { user, userProfile, userType } = useApp();

  const [fullName, setFullName] = useState(userProfile?.displayName || user?.displayName || 'User');
  const [email, setEmail] = useState(user?.email || 'example@email.com');
  const [phone, setPhone] = useState('+256 700 123 456');
  const [location, setLocation] = useState('Kampala, Uganda');
  const [bio, setBio] = useState('Passionate about poultry farming and sustainable agriculture.');

  const handleSave = () => {
    // Save profile logic here
    navigation.goBack();
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
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {fullName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <TouchableOpacity style={styles.changePhotoButton}>
            <Ionicons name="camera" size={20} color={COLORS.primary} />
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor={COLORS.gray}
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={COLORS.gray}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              placeholderTextColor={COLORS.gray}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Location</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your location"
              placeholderTextColor={COLORS.gray}
              value={location}
              onChangeText={setLocation}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Bio</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Tell us about yourself"
              placeholderTextColor={COLORS.gray}
              value={bio}
              onChangeText={setBio}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.accountTypeSection}>
            <Text style={styles.inputLabel}>Account Type</Text>
            <View style={styles.accountTypeBadge}>
              <Ionicons
                name={userType === 'supplier' ? 'leaf' : 'cart'}
                size={24}
                color={COLORS.primary}
              />
              <Text style={styles.userTypeLabel}>
                {userType === 'supplier' ? 'Supplier Account' : 'Buyer Account'}
              </Text>
            </View>
            <Text style={styles.accountTypeHint}>
              Contact support to change your account type
            </Text>
          </View>
        </View>

        <View style={styles.dangerZone}>
          <Text style={styles.dangerTitle}>Danger Zone</Text>
          <TouchableOpacity style={styles.dangerButton}>
            <Ionicons name="trash-outline" size={20} color={COLORS.error} />
            <Text style={styles.dangerButtonText}>Delete Account</Text>
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
  saveButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: SIZES.borderRadius,
  },
  saveButtonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: SIZES.md,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: SIZES.padding * 1.5,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changePhotoText: {
    marginLeft: 8,
    fontSize: SIZES.md,
    color: COLORS.primary,
    fontWeight: '600',
  },
  formContainer: {
    paddingHorizontal: SIZES.padding,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: SIZES.sm,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 14,
  },
  accountTypeSection: {
    marginBottom: 20,
  },
  accountTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    padding: 16,
    borderRadius: SIZES.borderRadius,
  },
  accountTypeText: {
    marginLeft: 12,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
    fontWeight: '600',
  },
  accountTypeHint: {
    fontSize: SIZES.sm,
    color: COLORS.gray,
    marginTop: 8,
  },
  dangerZone: {
    margin: SIZES.padding,
    padding: SIZES.padding,
    backgroundColor: '#FFF5F5',
    borderRadius: SIZES.borderRadius,
    borderWidth: 1,
    borderColor: '#FFCDD2',
    marginBottom: SIZES.padding * 2,
  },
  dangerTitle: {
    fontSize: SIZES.md,
    fontWeight: 'bold',
    color: COLORS.error,
    marginBottom: 12,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dangerButtonText: {
    marginLeft: 8,
    fontSize: SIZES.md,
    color: COLORS.error,
    fontWeight: '600',
  },
});

export default ProfileEditScreen;
