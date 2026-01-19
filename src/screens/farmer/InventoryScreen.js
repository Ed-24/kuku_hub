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
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';

const INVENTORY_DATA = [
  {
    id: '1',
    name: 'Layer Chicks (1 day)',
    category: 'Layers',
    quantity: 500,
    price: 4000,
    status: 'in_stock',
    lastUpdated: 'Jan 18, 2026',
  },
  {
    id: '2',
    name: 'Broiler Chicks (1 day)',
    category: 'Broilers',
    quantity: 350,
    price: 5000,
    status: 'in_stock',
    lastUpdated: 'Jan 17, 2026',
  },
  {
    id: '3',
    name: 'Kuroiler Chicks (1 week)',
    category: 'Local',
    quantity: 45,
    price: 8000,
    status: 'low_stock',
    lastUpdated: 'Jan 16, 2026',
  },
  {
    id: '4',
    name: 'Layer Chicks (2 weeks)',
    category: 'Layers',
    quantity: 0,
    price: 12000,
    status: 'out_of_stock',
    lastUpdated: 'Jan 15, 2026',
  },
  {
    id: '5',
    name: 'Broiler Chicks (1 week)',
    category: 'Broilers',
    quantity: 200,
    price: 8500,
    status: 'in_stock',
    lastUpdated: 'Jan 18, 2026',
  },
];

const InventoryScreen = ({ navigation }) => {
  const [filter, setFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Layers',
    quantity: '',
    price: '',
  });

  const filters = [
    { id: 'all', name: 'All' },
    { id: 'in_stock', name: 'In Stock' },
    { id: 'low_stock', name: 'Low Stock' },
    { id: 'out_of_stock', name: 'Out of Stock' },
  ];

  const filteredInventory = INVENTORY_DATA.filter((item) => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'in_stock':
        return { bg: '#E8F5E9', text: COLORS.success, label: 'In Stock' };
      case 'low_stock':
        return { bg: '#FFF3E0', text: '#FF9800', label: 'Low Stock' };
      case 'out_of_stock':
        return { bg: '#FFEBEE', text: COLORS.error, label: 'Out of Stock' };
      default:
        return { bg: COLORS.lightGray, text: COLORS.gray, label: 'Unknown' };
    }
  };

  const totalItems = INVENTORY_DATA.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = INVENTORY_DATA.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const renderInventoryItem = ({ item }) => {
    const statusStyle = getStatusStyle(item.status);
    return (
      <TouchableOpacity style={styles.inventoryCard}>
        <View style={styles.cardHeader}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
            <Text style={[styles.statusText, { color: statusStyle.text }]}>
              {statusStyle.label}
            </Text>
          </View>
        </View>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.cardDetails}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Quantity</Text>
            <Text style={styles.detailValue}>{item.quantity}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Price</Text>
            <Text style={styles.detailValue}>
              UGX {item.price.toLocaleString()}
            </Text>
          </View>
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.lastUpdated}>Updated: {item.lastUpdated}</Text>
          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="create-outline" size={18} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton}>
              <Ionicons name="trash-outline" size={18} color={COLORS.error} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
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
        <Text style={styles.headerTitle}>My Inventory</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Ionicons name="add" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="cube" size={24} color={COLORS.primary} />
            <Text style={styles.statValue}>{totalItems}</Text>
            <Text style={styles.statLabel}>Total Items</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="cash" size={24} color={COLORS.success} />
            <Text style={styles.statValue}>
              {(totalValue / 1000000).toFixed(1)}M
            </Text>
            <Text style={styles.statLabel}>Total Value</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="alert-circle" size={24} color={COLORS.warning} />
            <Text style={styles.statValue}>
              {INVENTORY_DATA.filter((i) => i.status === 'low_stock').length}
            </Text>
            <Text style={styles.statLabel}>Low Stock</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
        >
          {filters.map((f) => (
            <TouchableOpacity
              key={f.id}
              style={[
                styles.filterButton,
                filter === f.id && styles.filterButtonActive,
              ]}
              onPress={() => setFilter(f.id)}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === f.id && styles.filterTextActive,
                ]}
              >
                {f.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          data={filteredInventory}
          renderItem={renderInventoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.inventoryList}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Add Item Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Item</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Ionicons name="close" size={24} color={COLORS.darkGray} />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Item Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter item name"
                placeholderTextColor={COLORS.gray}
                value={newItem.name}
                onChangeText={(text) => setNewItem({ ...newItem, name: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Category</Text>
              <View style={styles.categoryOptions}>
                {['Layers', 'Broilers', 'Local'].map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryOption,
                      newItem.category === cat && styles.categoryOptionActive,
                    ]}
                    onPress={() => setNewItem({ ...newItem, category: cat })}
                  >
                    <Text
                      style={[
                        styles.categoryOptionText,
                        newItem.category === cat &&
                          styles.categoryOptionTextActive,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfInput]}>
                <Text style={styles.inputLabel}>Quantity</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0"
                  placeholderTextColor={COLORS.gray}
                  keyboardType="numeric"
                  value={newItem.quantity}
                  onChangeText={(text) =>
                    setNewItem({ ...newItem, quantity: text })
                  }
                />
              </View>
              <View style={[styles.inputGroup, styles.halfInput]}>
                <Text style={styles.inputLabel}>Price (UGX)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0"
                  placeholderTextColor={COLORS.gray}
                  keyboardType="numeric"
                  value={newItem.price}
                  onChangeText={(text) =>
                    setNewItem({ ...newItem, price: text })
                  }
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => setShowAddModal(false)}
            >
              <Text style={styles.saveButtonText}>Add Item</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  addButton: {
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
    paddingTop: SIZES.padding,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.padding,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.borderRadius,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginTop: 4,
  },
  statLabel: {
    fontSize: SIZES.xs,
    color: COLORS.gray,
  },
  filtersContainer: {
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.padding,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: SIZES.borderRadius,
    backgroundColor: COLORS.lightGray,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontSize: SIZES.sm,
    color: COLORS.darkGray,
    fontWeight: '600',
  },
  filterTextActive: {
    color: COLORS.white,
  },
  inventoryList: {
    paddingHorizontal: SIZES.padding,
    paddingBottom: SIZES.padding * 2,
  },
  inventoryCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.padding,
    marginBottom: 12,
    ...SHADOWS.medium,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: COLORS.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: SIZES.xs,
    color: COLORS.white,
    fontWeight: '600',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: SIZES.xs,
    fontWeight: '600',
  },
  itemName: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: 12,
  },
  cardDetails: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: SIZES.sm,
    color: COLORS.gray,
  },
  detailValue: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 12,
  },
  lastUpdated: {
    fontSize: SIZES.sm,
    color: COLORS.gray,
  },
  cardActions: {
    flexDirection: 'row',
  },
  editButton: {
    padding: 8,
    marginRight: 8,
  },
  deleteButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: SIZES.padding * 1.5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  inputGroup: {
    marginBottom: 16,
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
  categoryOptions: {
    flexDirection: 'row',
  },
  categoryOption: {
    backgroundColor: COLORS.lightGray,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: SIZES.borderRadius,
    marginRight: 8,
  },
  categoryOptionActive: {
    backgroundColor: COLORS.primary,
  },
  categoryOptionText: {
    fontSize: SIZES.sm,
    color: COLORS.darkGray,
    fontWeight: '600',
  },
  categoryOptionTextActive: {
    color: COLORS.white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: SIZES.borderRadius,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: SIZES.lg,
    fontWeight: 'bold',
  },
});

export default InventoryScreen;
