import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors, Sizes } from '../../constants/colors';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'available' | 'low' | 'out';
  expandedId: string | null;
}

const mockItems: MenuItem[] = [
  { id: '1', name: 'Chicken Adobo', category: 'Main Dishes', price: 250, stock: 45, status: 'available', expandedId: null },
  { id: '2', name: 'Beef Sinigang', category: 'Main Dishes', price: 280, stock: 8, status: 'low', expandedId: null },
  { id: '3', name: 'Iced Tea', category: 'Beverages', price: 75, stock: 0, status: 'out', expandedId: null },
  { id: '4', name: 'Turon', category: 'Desserts', price: 50, stock: 25, status: 'available', expandedId: null },
];

const statusColors = {
  available: '#10B981',
  low: '#F59E0B',
  out: '#EF4444',
};

export function MenuInventoryNative() {
  const [items, setItems] = useState<MenuItem[]>(mockItems);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  const updateStock = (id: string, newStock: number) => {
    setItems(
      items.map(item => {
        if (item.id === id) {
          const status = newStock === 0 ? 'out' : newStock < 10 ? 'low' : 'available';
          return { ...item, stock: newStock, status };
        }
        return item;
      })
    );
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.light.background }}
      contentContainerStyle={{ padding: Sizes.spacing.lg }}
    >
      <Text style={{ fontSize: Sizes.typography.lg, fontWeight: '700', marginBottom: Sizes.spacing.lg }}>
        Menu Inventory
      </Text>

      {/* Search */}
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: Colors.light.border,
          borderRadius: Sizes.radius.md,
          padding: Sizes.spacing.md,
          color: Colors.light.foreground,
          marginBottom: Sizes.spacing.lg,
          fontSize: Sizes.typography.base,
        }}
        placeholder="Search menu items..."
        placeholderTextColor={Colors.light.mutedForeground}
        value={search}
        onChangeText={setSearch}
      />

      {/* Summary Stats */}
      <View style={{ flexDirection: 'row', gap: Sizes.spacing.md, marginBottom: Sizes.spacing.lg }}>
        <View style={{ flex: 1, backgroundColor: Colors.light.card, borderRadius: Sizes.radius.md, padding: Sizes.spacing.md, alignItems: 'center' }}>
          <Text style={{ fontSize: Sizes.typography.lg, fontWeight: '700', color: '#10B981' }}>
            {items.filter(i => i.status === 'available').length}
          </Text>
          <Text style={{ color: Colors.light.mutedForeground, fontSize: Sizes.typography.sm }}>
            Available
          </Text>
        </View>
        <View style={{ flex: 1, backgroundColor: Colors.light.card, borderRadius: Sizes.radius.md, padding: Sizes.spacing.md, alignItems: 'center' }}>
          <Text style={{ fontSize: Sizes.typography.lg, fontWeight: '700', color: '#F59E0B' }}>
            {items.filter(i => i.status === 'low').length}
          </Text>
          <Text style={{ color: Colors.light.mutedForeground, fontSize: Sizes.typography.sm }}>
            Low Stock
          </Text>
        </View>
        <View style={{ flex: 1, backgroundColor: Colors.light.card, borderRadius: Sizes.radius.md, padding: Sizes.spacing.md, alignItems: 'center' }}>
          <Text style={{ fontSize: Sizes.typography.lg, fontWeight: '700', color: '#EF4444' }}>
            {items.filter(i => i.status === 'out').length}
          </Text>
          <Text style={{ color: Colors.light.mutedForeground, fontSize: Sizes.typography.sm }}>
            Out of Stock
          </Text>
        </View>
      </View>

      {/* Items List */}
      {filteredItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={{
            backgroundColor: Colors.light.card,
            borderRadius: Sizes.radius.md,
            padding: Sizes.spacing.md,
            marginBottom: Sizes.spacing.md,
            borderLeftWidth: 4,
            borderLeftColor: statusColors[item.status],
          }}
          onPress={() => toggleExpand(item.id)}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Sizes.spacing.sm }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: Sizes.typography.base, fontWeight: '700' }}>
                {item.name}
              </Text>
              <Text style={{ color: Colors.light.mutedForeground, fontSize: Sizes.typography.sm }}>
                {item.category}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: statusColors[item.status],
                paddingHorizontal: Sizes.spacing.sm,
                paddingVertical: 4,
                borderRadius: Sizes.radius.sm,
              }}
            >
              <Text style={{ color: '#fff', fontWeight: '600', fontSize: Sizes.typography.xs }}>
                {item.stock} qty
              </Text>
            </View>
          </View>

          <Text style={{ fontSize: Sizes.typography.base, fontWeight: '700', color: Colors.light.primary }}>
            ₱{item.price.toFixed(2)}
          </Text>

          {expanded === item.id && (
            <View style={{ marginTop: Sizes.spacing.md, paddingTop: Sizes.spacing.md, borderTopWidth: 1, borderTopColor: Colors.light.border }}>
              <Text style={{ color: Colors.light.mutedForeground, marginBottom: Sizes.spacing.sm, fontSize: Sizes.typography.sm }}>
                Adjust Stock
              </Text>
              <View style={{ flexDirection: 'row', gap: Sizes.spacing.sm }}>
                {[-5, -1, 0, 1, 5].map((delta) => (
                  <TouchableOpacity
                    key={delta}
                    style={{
                      flex: 1,
                      paddingVertical: Sizes.spacing.sm,
                      backgroundColor: delta === 0 ? Colors.light.muted : Colors.light.primary,
                      borderRadius: Sizes.radius.sm,
                      alignItems: 'center',
                    }}
                    onPress={() => updateStock(item.id, Math.max(0, item.stock + delta))}
                  >
                    <Text style={{ color: delta === 0 ? Colors.light.mutedForeground : '#fff', fontWeight: '600', fontSize: Sizes.typography.sm }}>
                      {delta > 0 ? '+' : ''}{delta || 'Reset'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={{ marginTop: Sizes.spacing.md }}>
                <Text style={{ color: Colors.light.mutedForeground, marginBottom: Sizes.spacing.sm, fontSize: Sizes.typography.sm }}>
                  Current: {item.stock} units
                </Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
