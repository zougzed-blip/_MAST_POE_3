import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { useMenu } from '../context/MenuContext';
import Header from '../components/Header';
import { Course } from '../types';

export default function HomeScreen({ navigation }: any) {
  const { items, getAveragePriceByCourse } = useMenu();
  const [activeTab, setActiveTab] = useState<'All' | 'Breakfast' | 'Mains' | 'Desserts'>('All');

  const isItemAdded = (itemName: string) => {
    return items.some(item => item.name === itemName);
  };

  const filteredItems = activeTab === 'All' 
    ? items 
    : items.filter(item => item.course === activeTab);

  const tabs = ['All', 'Breakfast', 'Mains', 'Desserts'];

  return (
    <View style={styles.container}>
      <Header />
      
      {/* Chef Section */}
      <View style={styles.chefSection}>
        <Image 
          source={require('../assets/images/chef.webp')}
          style={styles.chefImage}
        />
        <View style={styles.chefInfo}>
          <Text style={styles.chefName}>Executive Chef</Text>
          <Text style={styles.chefWelcome}>Welcome!</Text>
        </View>
      </View>

      {/* Average Prices by Course */}
      <View style={styles.priceSection}>
        <Text style={styles.priceTitle}>Average Prices</Text>
        <View style={styles.priceRow}>
          <View style={styles.priceBox}>
            <Text style={styles.priceLabel}>Breakfast</Text>
            <Text style={styles.priceValue}>R {getAveragePriceByCourse('Breakfast')}</Text>
          </View>
          <View style={styles.priceBox}>
            <Text style={styles.priceLabel}>Mains</Text>
            <Text style={styles.priceValue}>R {getAveragePriceByCourse('Mains')}</Text>
          </View>
          <View style={styles.priceBox}>
            <Text style={styles.priceLabel}>Desserts</Text>
            <Text style={styles.priceValue}>R {getAveragePriceByCourse('Desserts')}</Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScrollContent}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.tabActive
              ]}
              onPress={() => setActiveTab(tab as any)}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab && styles.tabTextActive
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Menu Items (now sourced from context) */}
      <ScrollView style={styles.itemsList} showsVerticalScrollIndicator={false}>
        {filteredItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No items in your menu yet</Text>
          </View>
        ) : (
          filteredItems.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemContent}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                  <View style={styles.itemMeta}>
                    <Text style={styles.itemCourse}>{item.course}</Text>
                    <Text style={styles.itemPrice}>R {item.price}</Text>
                  </View>
                </View>
                <View style={styles.addButton}>
                  <Text style={styles.addButtonText}>
                    {isItemAdded(item.name) ? '✓' : '→'}
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  chefSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    padding: 15,
    margin: 12,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  chefImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#000000',
  },
  chefInfo: {
    flex: 1,
    marginLeft: 12,
  },
  chefName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 2,
  },
  chefWelcome: {
    fontSize: 12,
    color: '#000000',
    opacity: 0.8,
  },
  priceSection: {
    backgroundColor: '#000000',
    margin: 12,
    padding: 15,
    borderRadius: 15,
  },
  priceTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFD700',
    marginBottom: 12,
    textAlign: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  priceBox: {
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 11,
    color: '#FFFFFF',
    marginBottom: 4,
    fontWeight: '600',
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFD700',
  },
  tabContainer: {
    height: 50,
    paddingHorizontal: 12,
  },
  tabScrollContent: {
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: 'transparent',
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: '#FFD700',
    borderColor: '#000000',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666666',
  },
  tabTextActive: {
    color: '#000000',
  },
  itemsList: {
    flex: 1,
    padding: 12,
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#FFD700',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
    lineHeight: 16,
  },
  itemMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  addButtonText: {
    color: '#FFD700',
    fontSize: 16,
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