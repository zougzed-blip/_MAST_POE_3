import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useMenu } from '../context/MenuContext';
import Header from '../components/Header';
import { Course } from '../types';

const PREDEFINED_ITEMS = [
  // Breakfast
  { name: 'French Toast', description: 'Golden brown toast with maple syrup', course: 'Breakfast' as Course, price: '79.90' },
  { name: 'Pancake', description: 'Fluffy pancakes with butter and syrup', course: 'Breakfast' as Course, price: '129.99' },
  { name: 'Omelette', description: 'Three-egg omelette with cheese and herbs', course: 'Breakfast' as Course, price: '150.00' },
  { name: 'Casserole', description: 'Breakfast casserole with eggs and sausage', course: 'Breakfast' as Course, price: '149.99' },

  // Mains
  { name: 'Filet Mignon', description: '8oz beef tenderloin with red wine sauce', course: 'Mains' as Course, price: '380' },
  { name: 'Lobster Ravioli', description: 'Homemade pasta with lobster filling', course: 'Mains' as Course, price: '290' },
  { name: 'Duck Confit', description: 'Slow-cooked duck with potato gratin', course: 'Mains' as Course, price: '320' },
  { name: 'Sea Bass', description: 'Pan-seared with lemon butter', course: 'Mains' as Course, price: '340' },

  // Desserts
  { name: 'Molten Lava Cake', description: 'Warm chocolate cake with vanilla ice cream', course: 'Desserts' as Course, price: '110' },
  { name: 'Tiramisu', description: 'Classic Italian coffee dessert', course: 'Desserts' as Course, price: '90' },
  { name: 'Berry Cheesecake', description: 'New York style with mixed berries', course: 'Desserts' as Course, price: '120' },
  { name: 'Crème Brûlée', description: 'Vanilla custard with caramelized sugar', course: 'Desserts' as Course, price: '100' },
];

export default function ManageMenuScreen({ navigation }: any) {
  const { items, addItem, removeItem, getTotalItems } = useMenu();
  const [activeTab, setActiveTab] = useState<'Available' | 'MyMenu'>('Available');

  const handleAddItem = (item: any) => {
    addItem(item);
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  const isItemAdded = (itemName: string) => {
    return items.some(item => item.name === itemName);
  };

  return (
    <View style={styles.container}>
      <Header />
      
      <View style={styles.header}>
        <Text style={styles.title}>Manage Menu</Text>
        <Text style={styles.count}>{getTotalItems()} items in menu</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Available' && styles.tabActive]}
          onPress={() => setActiveTab('Available')}
        >
          <Text style={[styles.tabText, activeTab === 'Available' && styles.tabTextActive]}>
            Available
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'MyMenu' && styles.tabActive]}
          onPress={() => setActiveTab('MyMenu')}
        >
          <Text style={[styles.tabText, activeTab === 'MyMenu' && styles.tabTextActive]}>
            My Menu
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {activeTab === 'Available' ? (
          /* Available Items */
          PREDEFINED_ITEMS.map((item, index) => (
            <View key={index} style={styles.itemCard}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <View style={styles.itemMeta}>
                  <Text style={styles.itemCourse}>{item.course}</Text>
                  <Text style={styles.itemPrice}>R {item.price}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  isItemAdded(item.name) && styles.addedButton
                ]}
                onPress={() => handleAddItem(item)}
                disabled={isItemAdded(item.name)}
              >
                <Text style={styles.actionButtonText}>
                  {isItemAdded(item.name) ? '✓' : '+'}
                </Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          /* My Menu Items */
          items.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No items in your menu yet</Text>
            </View>
          ) : (
            items.map((item) => (
              <View key={item.id} style={styles.itemCard}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                  <View style={styles.itemMeta}>
                    <Text style={styles.itemCourse}>{item.course}</Text>
                    <Text style={styles.itemPrice}>R {item.price}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveItem(item.id)}
                >
                  <Text style={styles.actionButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            ))
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    backgroundColor: '#FFD700',
    padding: 20,
    alignItems: 'center',
    margin: 15,
    borderRadius: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 5,
  },
  count: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginHorizontal: 5,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  tabActive: {
    backgroundColor: '#FFD700',
    borderColor: '#000000',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666666',
  },
  tabTextActive: {
    color: '#000000',
  },
  scrollView: {
    flex: 1,
    padding: 15,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#FFD700',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 8,
  },
  itemMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemCourse: {
    fontSize: 11,
    fontWeight: '700',
    color: '#000000',
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#000000',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  addedButton: {
    backgroundColor: '#00AA00',
  },
  removeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999999',
  },
});