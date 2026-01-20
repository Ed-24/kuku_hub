import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { useApp } from '../../context/AppContext';

const AccountScreen = () => {
  const navigation = useNavigation();
  const { user, userProfile, userType, logout } = useApp();

  const navigateTo = (screen) => {
    const parent = navigation.getParent();
    if (parent) {
      parent.navigate(screen);
    } else {
      navigation.navigate(screen);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out Kuku Hub - Your trusted partner for quality poultry! Download now: https://kukuhub.app',
        title: 'Share Kuku Hub',
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to share');
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            logout();
            const parent = navigation.getParent();
            (parent || navigation).reset({
              index: 0,
              routes: [{ name: 'Welcome' }],
            });
          },
        },
      ]
    );
  };

  const menuItems = [
    {
      id: 'profile',
      title: 'My Profile',
      subtitle: 'Edit your profile information',
      icon: 'person-outline',
      onPress: () => navigateTo('ProfileEdit'),
    },
    {
      id: 'orders',
      title: 'Orders',
      subtitle: 'View your order history',
      icon: 'receipt-outline',
      onPress: () => navigateTo('MyOrders'),
    },
    {
      id: 'terms',
      title: 'Terms and Conditions',
      subtitle: 'Read our terms of service',
      icon: 'document-text-outline',
      onPress: () => navigateTo('Terms'),
    },
    {
      id: 'share',
      title: 'Share App',
      subtitle: 'Share with friends and family',
      icon: 'share-social-outline',
      onPress: handleShare,
    },
    {
      id: 'password',
      title: 'Change Password',
      subtitle: 'Update your password',
      icon: 'lock-closed-outline',
      onPress: () => navigateTo('ChangePassword'),
    },
    {
      id: 'delete',
      title: 'Delete Account',
      subtitle: 'Permanently delete your account',
      icon: 'trash-outline',
      danger: true,
      onPress: handleDeleteAccount,
    },
  ];

  const handleLogout = () => {
    logout();
    const parent = navigation.getParent();
    (parent || navigation).reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Account</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {(userProfile?.displayName || user?.displayName || 'U')?.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userProfile?.displayName || user?.displayName || 'User'}</Text>
            <Text style={styles.profileEmail}>{user?.email || 'user@email.com'}</Text>
            <View style={styles.userTypeBadge}>
              <Text style={styles.userTypeText}>
                {userType === 'supplier' ? 'Supplier' : 'Buyer'}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigateTo('ProfileEdit')}
          >
            <Ionicons name="create-outline" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View
                style={[
                  styles.menuIconContainer,
                  item.danger && styles.menuIconDanger,
                ]}
              >
                <Ionicons
                  name={item.icon}
                  size={22}
                  color={item.danger ? COLORS.error : COLORS.primary}
                />
              </View>
              <View style={styles.menuInfo}>
                <Text
                  style={[styles.menuTitle, item.danger && styles.menuTitleDanger]}
                >
                  {item.title}
                </Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color={COLORS.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Version 1.0.0</Text>
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
  headerTitle: {
    fontSize: SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding,
    paddingTop: SIZES.padding * 1.5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  profileEmail: {
    fontSize: SIZES.sm,
    color: COLORS.gray,
    marginTop: 2,
  },
  userTypeBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  userTypeText: {
    color: COLORS.white,
    fontSize: SIZES.xs,
    fontWeight: '600',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    padding: SIZES.padding,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.borderRadius,
    padding: 16,
    marginBottom: 10,
  },
  menuIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIconDanger: {
    backgroundColor: '#FFEBEE',
  },
  menuInfo: {
    flex: 1,
    marginLeft: 12,
  },
  menuTitle: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  menuTitleDanger: {
    color: COLORS.error,
  },
  menuSubtitle: {
    fontSize: SIZES.sm,
    color: COLORS.gray,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SIZES.padding,
    marginTop: 8,
    marginBottom: SIZES.padding,
    backgroundColor: '#FFEBEE',
    paddingVertical: 16,
    borderRadius: SIZES.borderRadius,
  },
  logoutText: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.error,
    marginLeft: 8,
  },
  version: {
    textAlign: 'center',
    fontSize: SIZES.sm,
    color: COLORS.gray,
    marginBottom: SIZES.padding * 2,
  },
});

export default AccountScreen;
