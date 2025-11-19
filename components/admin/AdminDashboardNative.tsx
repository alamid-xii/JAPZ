import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Sizes } from '../../constants/colors';

const stats = [
  { label: 'Total Revenue', value: '₱45,230', icon: '💰', trend: '+12.5%' },
  { label: 'Total Orders', value: '1,234', icon: '📦', trend: '+8.2%' },
  { label: 'Active Employees', value: '24', icon: '👥', trend: '0%' },
  { label: 'Today\'s Sales', value: '₱8,450', icon: '📈', trend: '+15.3%' },
];

const quickActions = [
  { title: 'Manage Employees', icon: '👨‍💼' },
  { title: 'Menu Inventory', icon: '📋' },
  { title: 'View Feedback', icon: '⭐' },
  { title: 'Sales Forecast', icon: '📊' },
  { title: 'Categories', icon: '🏷️' },
  { title: 'Settings', icon: '⚙️' },
];

export function AdminDashboardNative() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.light.background }}
      contentContainerStyle={{ padding: Sizes.spacing.lg }}
    >
      {/* Header */}
      <View style={{ marginBottom: Sizes.spacing.xl }}>
        <Text style={{ fontSize: Sizes.typography.lg, fontWeight: '700', marginBottom: Sizes.spacing.sm }}>
          Welcome back, Admin
        </Text>
        <Text style={{ color: Colors.light.mutedForeground, fontSize: Sizes.typography.sm }}>
          Here's what's happening today
        </Text>
      </View>

      {/* Stats Grid */}
      <View style={{ gap: Sizes.spacing.md, marginBottom: Sizes.spacing.xl }}>
        {stats.map((stat, index) => (
          <View
            key={index}
            style={{
              backgroundColor: Colors.light.card,
              borderRadius: Sizes.radius.md,
              padding: Sizes.spacing.md,
              borderLeftWidth: 4,
              borderLeftColor: Colors.light.primary,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: Colors.light.mutedForeground, marginBottom: Sizes.spacing.sm, fontSize: Sizes.typography.sm }}>
                  {stat.label}
                </Text>
                <Text style={{ fontSize: Sizes.typography.lg, fontWeight: '700', marginBottom: Sizes.spacing.sm }}>
                  {stat.value}
                </Text>
                <Text style={{ color: '#10B981', fontSize: Sizes.typography.xs, fontWeight: '600' }}>
                  {stat.trend}
                </Text>
              </View>
              <Text style={{ fontSize: 32 }}>
                {stat.icon}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <Text style={{ fontSize: Sizes.typography.base, fontWeight: '700', marginBottom: Sizes.spacing.md }}>
        Quick Actions
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Sizes.spacing.md, marginBottom: Sizes.spacing.xl }}>
        {quickActions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flex: 1,
              minWidth: '47%',
              backgroundColor: Colors.light.card,
              borderRadius: Sizes.radius.md,
              padding: Sizes.spacing.lg,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: Colors.light.border,
            }}
          >
            <Text style={{ fontSize: 32, marginBottom: Sizes.spacing.sm }}>
              {action.icon}
            </Text>
            <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: Sizes.typography.sm }}>
              {action.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recent Activity */}
      <View style={{ backgroundColor: Colors.light.card, borderRadius: Sizes.radius.md, padding: Sizes.spacing.md }}>
        <Text style={{ fontSize: Sizes.typography.base, fontWeight: '700', marginBottom: Sizes.spacing.md }}>
          Recent Activity
        </Text>
        {[
          { time: '2 hours ago', activity: 'Juan Dela Cruz placed order #1234', icon: '📝' },
          { time: '4 hours ago', activity: 'Maria Santos logged in', icon: '👤' },
          { time: '6 hours ago', activity: 'New feedback received', icon: '⭐' },
        ].map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: Sizes.spacing.sm,
              borderBottomWidth: index < 2 ? 1 : 0,
              borderBottomColor: Colors.light.border,
            }}
          >
            <Text style={{ fontSize: 20, marginRight: Sizes.spacing.md }}>
              {item.icon}
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '500', marginBottom: 2 }}>
                {item.activity}
              </Text>
              <Text style={{ color: Colors.light.mutedForeground, fontSize: Sizes.typography.xs }}>
                {item.time}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
