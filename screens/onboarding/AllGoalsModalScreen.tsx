import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Fonts } from '../../utils/fonts';
import type { GoalItem, GoalTier } from '../../utils/goalsLibrary';

const MAX_GOALS = 3;

interface AllGoalsModalScreenProps {
  allGoals: GoalItem[];
  selectedGoalIds: string[];
  onToggleGoal: (goalId: string) => void;
  onClose: () => void;
  onSave: (goalIds: string[]) => void;
}

const AllGoalsModalScreen: React.FC<AllGoalsModalScreenProps> = ({
  allGoals,
  selectedGoalIds,
  onToggleGoal,
  onClose,
  onSave,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<GoalTier | 'all'>('all');

  const filteredGoals = useMemo(() => {
    let filtered = allGoals;

    // Filter by tier
    if (selectedTier !== 'all') {
      filtered = filtered.filter((goal) => goal.tier === selectedTier);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((goal) =>
        goal.title.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [allGoals, selectedTier, searchQuery]);

  const handleSave = () => {
    onSave(selectedGoalIds);
  };

  const canSelectMore = selectedGoalIds.length < MAX_GOALS;

  const renderGoalItem = ({ item }: { item: GoalItem }) => {
    const isSelected = selectedGoalIds.includes(item.id);
    const canToggle = isSelected || canSelectMore;

    return (
      <TouchableOpacity
        style={[
          styles.goalItem,
          isSelected && styles.goalItemSelected,
          !canToggle && !isSelected && styles.goalItemDisabled,
        ]}
        onPress={() => {
          if (canToggle) {
            onToggleGoal(item.id);
          }
        }}
        disabled={!canToggle && !isSelected}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.goalItemText,
            isSelected && styles.goalItemTextSelected,
          ]}
        >
          {item.title}
        </Text>
        <View
          style={[
            styles.checkbox,
            isSelected && styles.checkboxChecked,
          ]}
        >
          {isSelected && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Goals</Text>
        <TouchableOpacity onPress={onClose} style={styles.doneButton}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search goals..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filtersContainer}>
        {(['all', 'core', 'challenge', 'elite'] as const).map((tier) => (
          <TouchableOpacity
            key={tier}
            style={[
              styles.filterPill,
              selectedTier === tier && styles.filterPillSelected,
            ]}
            onPress={() => setSelectedTier(tier)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterPillText,
                selectedTier === tier && styles.filterPillTextSelected,
              ]}
            >
              {tier === 'all' ? 'All Goals' : `${tier.charAt(0).toUpperCase() + tier.slice(1)} Goals`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredGoals}
        renderItem={renderGoalItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No goals found</Text>
          </View>
        }
      />

      <View style={styles.footer}>
        <Text style={styles.footerCounter}>
          {selectedGoalIds.length}/{MAX_GOALS} Selected
        </Text>
        <TouchableOpacity
          style={[
            styles.addButton,
            selectedGoalIds.length === 0 && styles.addButtonDisabled,
          ]}
          onPress={handleSave}
          disabled={selectedGoalIds.length === 0}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>
            Add Selected ({selectedGoalIds.length}/{MAX_GOALS})
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: Fonts.Outfit.semiBold,
    color: '#1D2333',
  },
  doneButton: {
    padding: 8,
  },
  doneButtonText: {
    fontSize: 16,
    fontFamily: Fonts.InterTight.semiBold,
    color: '#4F46E5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    fontFamily: Fonts.InterTight.regular,
    color: '#1D2333',
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  filterPillSelected: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  filterPillText: {
    fontSize: 14,
    fontFamily: Fonts.InterTight.medium,
    color: '#6B7280',
  },
  filterPillTextSelected: {
    color: '#FFFFFF',
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
  },
  goalItemSelected: {
    backgroundColor: '#F5F3FF',
    borderColor: '#4F46E5',
  },
  goalItemDisabled: {
    opacity: 0.5,
  },
  goalItemText: {
    flex: 1,
    fontSize: 16,
    fontFamily: Fonts.InterTight.regular,
    color: '#1D2333',
  },
  goalItemTextSelected: {
    fontFamily: Fonts.InterTight.semiBold,
    color: '#4F46E5',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: Fonts.InterTight.regular,
    color: '#6B7280',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  footerCounter: {
    fontSize: 14,
    fontFamily: Fonts.InterTight.medium,
    color: '#6B7280',
    marginBottom: 12,
  },
  addButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#4F46E5',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  addButtonText: {
    fontSize: 16,
    fontFamily: Fonts.InterTight.semiBold,
    color: '#FFFFFF',
  },
});

export default AllGoalsModalScreen;

