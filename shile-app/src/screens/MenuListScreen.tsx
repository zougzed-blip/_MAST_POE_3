import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useMenu } from '../context/MenuContext';
import Header from '../components/Header';
import { Course } from '../types';

export default function MenuListScreen({ navigation }: any) {
  const { items, getTotalItems, getItemsByCourse } = useMenu();
  const [selectedCourse, setSelectedCourse] = useState<Course | 'All'>('All');

  const COURSES: Course[] = ['Breakfast', 'Mains', 'Desserts'];

  const displayItems = selectedCourse === 'All' ? items : getItemsByCourse(selectedCourse);

  return (
    <View style={styles.container}>
      <Header />
      
      <View style={styles.header}>
        <Text style={styles.title}>Your Menu</Text>
        <Text style={styles.count}>{getTotalItems()} dishes</Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.filterTab, selectedCourse === 'All' && styles.filterTabActive]}
            onPress={() => setSelectedCourse('All')}
          >
            <Text style={[styles.filterText, selectedCourse === 'All' && styles.filterTextActive]}>
              All
            </Text>
          </TouchableOpacity>
          {COURSES.map((course) => (
            <TouchableOpacity
              key={course}
              style={[styles.filterTab, selectedCourse === course && styles.filterTabActive]}
              onPress={() => setSelectedCourse(course)}
            >
              <Text style={[styles.filterText, selectedCourse === course && styles.filterTextActive]}>
                {course}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {displayItems.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No dishes found</Text>
          <Text style={styles.emptyText}>
            {selectedCourse === 'All' 
              ? 'Start by adding dishes from the manage screen!'
              : `No ${selectedCourse} dishes in your menu yet`
            }
          </Text>
        </View>
      ) : (
        <FlatList
          data={displayItems}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('ItemDetails', { item })}
            >
              <View style={styles.itemContent}>
                <View style={styles.itemMain}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                  <Text style={styles.itemCourse}>{item.course}</Text>
                </View>
                <Text style={styles.itemPrice}>R {item.price}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
  },
  filterContainer: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  filterTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  filterTabActive: {
    backgroundColor: '#FFD700',
    borderColor: '#000000',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666666',
  },
  filterTextActive: {
    color: '#000000',
  },
  listContent: {
    padding: 15,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#FFD700',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemMain: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 18,
    marginBottom: 6,
  },
  itemCourse: {
    fontSize: 11,
    fontWeight: '700',
    color: '#000000',
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000000',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#666666',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 22,
  },
});