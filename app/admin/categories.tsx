import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AdminBottomNav } from '../../components/shared/AdminBottomNav';
import { Colors, Sizes } from '../../constants/colors';

interface Category {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  icon: string;
}

const mockCategories: Category[] = [
  { id: '1', name: 'Main Dishes', description: 'Lunch and dinner main courses', itemCount: 12, icon: '🍽️' },
  { id: '2', name: 'Appetizers', description: 'Starters and side dishes', itemCount: 8, icon: '🥗' },
  { id: '3', name: 'Beverages', description: 'Drinks and smoothies', itemCount: 15, icon: '🥤' },
  { id: '4', name: 'Desserts', description: 'Sweet treats and pastries', itemCount: 10, icon: '🍰' },
];

export default function CategoriesScreen() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDesc, setNewCategoryDesc] = useState('');

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: Colors.light.background }}
        contentContainerStyle={{ padding: Sizes.spacing.lg }}
      >
        <Text style={{ fontSize: Sizes.typography.lg, fontWeight: '700', marginBottom: Sizes.spacing.lg }}>
          Category Management
        </Text>

        {/* Add New Category */}
        <View style={{ backgroundColor: Colors.light.card, borderRadius: Sizes.radius.md, padding: Sizes.spacing.md, marginBottom: Sizes.spacing.lg }}>
          <Text style={{ fontWeight: '700', marginBottom: Sizes.spacing.md }}>
            Add New Category
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: Colors.light.border,
              borderRadius: Sizes.radius.sm,
              padding: Sizes.spacing.sm,
              color: Colors.light.foreground,
              marginBottom: Sizes.spacing.sm,
              fontSize: Sizes.typography.base,
            }}
            placeholder="Category name..."
            placeholderTextColor={Colors.light.mutedForeground}
            value={newCategoryName}
            onChangeText={setNewCategoryName}
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: Colors.light.border,
              borderRadius: Sizes.radius.sm,
              padding: Sizes.spacing.sm,
              color: Colors.light.foreground,
              marginBottom: Sizes.spacing.md,
              minHeight: 60,
              fontSize: Sizes.typography.base,
            }}
            placeholder="Description..."
            placeholderTextColor={Colors.light.mutedForeground}
            value={newCategoryDesc}
            onChangeText={setNewCategoryDesc}
            multiline
          />
          <TouchableOpacity
            style={{
              backgroundColor: Colors.light.primary,
              paddingVertical: Sizes.spacing.sm,
              borderRadius: Sizes.radius.sm,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '600' }}>
              Add Category
            </Text>
          </TouchableOpacity>
        </View>

        {/* Categories List */}
        <Text style={{ fontSize: Sizes.typography.base, fontWeight: '700', marginBottom: Sizes.spacing.md }}>
          Existing Categories
        </Text>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={{
              backgroundColor: Colors.light.card,
              borderRadius: Sizes.radius.md,
              padding: Sizes.spacing.md,
              marginBottom: Sizes.spacing.md,
              borderLeftWidth: 4,
              borderLeftColor: Colors.light.primary,
            }}
            onPress={() => toggleExpand(category.id)}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Sizes.spacing.sm }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: Sizes.spacing.md, flex: 1 }}>
                <Text style={{ fontSize: 28 }}>
                  {category.icon}
                </Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: Sizes.typography.base, fontWeight: '700' }}>
                    {category.name}
                  </Text>
                  <Text style={{ color: Colors.light.mutedForeground, fontSize: Sizes.typography.sm }}>
                    {category.itemCount} items
                  </Text>
                </View>
              </View>
              <Text style={{ fontSize: 18 }}>
                {expanded === category.id ? '▼' : '▶'}
              </Text>
            </View>

            <Text style={{ color: Colors.light.mutedForeground, fontSize: Sizes.typography.sm }}>
              {category.description}
            </Text>

            {expanded === category.id && (
              <View style={{ marginTop: Sizes.spacing.md, paddingTop: Sizes.spacing.md, borderTopWidth: 1, borderTopColor: Colors.light.border, gap: Sizes.spacing.sm }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.light.primary,
                    paddingVertical: Sizes.spacing.sm,
                    borderRadius: Sizes.radius.sm,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: '#fff', fontWeight: '600' }}>
                    Edit Category
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#FEE2E2',
                    paddingVertical: Sizes.spacing.sm,
                    borderRadius: Sizes.radius.sm,
                    alignItems: 'center',
                  }}
                  onPress={() => deleteCategory(category.id)}
                >
                  <Text style={{ color: '#991B1B', fontWeight: '600' }}>
                    Delete Category
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <AdminBottomNav currentScreen="menu" />
    </View>
  );
}