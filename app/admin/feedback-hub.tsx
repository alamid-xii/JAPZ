import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { AdminBottomNav } from '../../components/shared/AdminBottomNav';
import { Colors, Sizes } from '../../constants/colors';

interface Feedback {
  id: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  date: string;
  status: 'new' | 'reviewed' | 'resolved';
}

const mockFeedback: Feedback[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    rating: 5,
    comment: 'Excellent service and delicious food! Highly recommend.',
    date: '2024-01-15',
    status: 'resolved',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    rating: 4,
    comment: 'Good food but the wait time was a bit long.',
    date: '2024-01-14',
    status: 'reviewed',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    rating: 3,
    comment: 'Average experience. Could improve portion sizes.',
    date: '2024-01-13',
    status: 'new',
  },
];

const statusColors = {
  new: '#F59E0B',
  reviewed: '#3B82F6',
  resolved: '#10B981',
};

const getRatingColor = (rating: number) => {
  if (rating >= 4) return '#10B981';
  if (rating >= 3) return '#F59E0B';
  return '#EF4444';
};

export default function FeedbackHubScreen() {
  const [feedback, setFeedback] = useState<Feedback[]>(mockFeedback);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | Feedback['status']>('all');

  const filteredFeedback = feedback.filter(f =>
    filterStatus === 'all' || f.status === filterStatus
  );

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  const updateStatus = (id: string, newStatus: Feedback['status']) => {
    setFeedback(feedback.map(f =>
      f.id === id ? { ...f, status: newStatus } : f
    ));
  };

  const avgRating = (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1);
  const totalFeedback = feedback.length;
  const newCount = feedback.filter(f => f.status === 'new').length;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: Colors.light.background }}
        contentContainerStyle={{ padding: Sizes.spacing.lg }}
      >
        <Text style={{ fontSize: Sizes.typography.lg, fontWeight: '700', marginBottom: Sizes.spacing.lg }}>
          Feedback Hub
        </Text>

        {/* Stats */}
        <View style={{ gap: Sizes.spacing.md, marginBottom: Sizes.spacing.xl }}>
          <View
            style={{
              backgroundColor: Colors.light.card,
              borderRadius: Sizes.radius.md,
              padding: Sizes.spacing.md,
              borderLeftWidth: 4,
              borderLeftColor: Colors.light.primary,
            }}
          >
            <Text style={{ color: Colors.light.mutedForeground, marginBottom: Sizes.spacing.sm, fontSize: Sizes.typography.sm }}>
              Average Rating
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: Sizes.spacing.sm }}>
              <Text style={{ fontSize: Sizes.typography.xl, fontWeight: '700' }}>
                {avgRating}
              </Text>
              <Text style={{ fontSize: Sizes.typography.lg }}>
                {'⭐'.repeat(Math.round(parseFloat(avgRating)))}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', gap: Sizes.spacing.md }}>
            <View
              style={{
                flex: 1,
                backgroundColor: Colors.light.card,
                borderRadius: Sizes.radius.md,
                padding: Sizes.spacing.md,
                borderLeftWidth: 4,
                borderLeftColor: '#F59E0B',
              }}
            >
              <Text style={{ color: Colors.light.mutedForeground, marginBottom: Sizes.spacing.sm, fontSize: Sizes.typography.xs }}>
                Total Feedback
              </Text>
              <Text style={{ fontSize: Sizes.typography.lg, fontWeight: '700' }}>
                {totalFeedback}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                backgroundColor: Colors.light.card,
                borderRadius: Sizes.radius.md,
                padding: Sizes.spacing.md,
                borderLeftWidth: 4,
                borderLeftColor: '#F59E0B',
              }}
            >
              <Text style={{ color: Colors.light.mutedForeground, marginBottom: Sizes.spacing.sm, fontSize: Sizes.typography.xs }}>
                Needs Review
              </Text>
              <Text style={{ fontSize: Sizes.typography.lg, fontWeight: '700', color: '#F59E0B' }}>
                {newCount}
              </Text>
            </View>
          </View>
        </View>

        {/* Filter */}
        <View style={{ flexDirection: 'row', gap: Sizes.spacing.sm, marginBottom: Sizes.spacing.lg }}>
          {(['all', 'new', 'reviewed', 'resolved'] as const).map((status) => (
            <TouchableOpacity
              key={status}
              style={{
                paddingVertical: Sizes.spacing.sm,
                paddingHorizontal: Sizes.spacing.md,
                borderRadius: Sizes.radius.sm,
                backgroundColor: filterStatus === status ? Colors.light.primary : Colors.light.card,
                borderWidth: 1,
                borderColor: filterStatus === status ? Colors.light.primary : Colors.light.border,
              }}
              onPress={() => setFilterStatus(status)}
            >
              <Text
                style={{
                  color: filterStatus === status ? '#fff' : Colors.light.foreground,
                  fontWeight: '600',
                  fontSize: Sizes.typography.xs,
                  textTransform: 'capitalize',
                }}
              >
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Feedback List */}
        {filteredFeedback.map((item) => (
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Sizes.spacing.sm }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: Sizes.typography.base, fontWeight: '700', marginBottom: 4 }}>
                  {item.name}
                </Text>
                <Text style={{ color: Colors.light.mutedForeground, fontSize: Sizes.typography.sm }}>
                  {item.email}
                </Text>
              </View>
              <View
                style={{
                  paddingHorizontal: Sizes.spacing.sm,
                  paddingVertical: 4,
                  borderRadius: Sizes.radius.sm,
                  backgroundColor: statusColors[item.status] + '20',
                }}
              >
                <Text style={{ color: statusColors[item.status], fontWeight: '600', fontSize: Sizes.typography.xs }}>
                  {item.status.toUpperCase()}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: Sizes.typography.sm }}>
                {'⭐'.repeat(item.rating)}
              </Text>
              <Text style={{ color: Colors.light.mutedForeground, fontSize: Sizes.typography.xs }}>
                {item.date}
              </Text>
            </View>

            {expanded === item.id && (
              <View style={{ marginTop: Sizes.spacing.md, paddingTop: Sizes.spacing.md, borderTopWidth: 1, borderTopColor: Colors.light.border }}>
                <View style={{ marginBottom: Sizes.spacing.md }}>
                  <Text style={{ color: Colors.light.mutedForeground, fontWeight: '600', marginBottom: Sizes.spacing.sm, fontSize: Sizes.typography.sm }}>
                    Feedback
                  </Text>
                  <Text style={{ color: Colors.light.foreground, lineHeight: 20 }}>
                    {item.comment}
                  </Text>
                </View>

                <Text style={{ color: Colors.light.mutedForeground, fontWeight: '600', marginBottom: Sizes.spacing.sm, fontSize: Sizes.typography.sm }}>
                  Change Status
                </Text>
                <View style={{ gap: Sizes.spacing.sm }}>
                  {(['new', 'reviewed', 'resolved'] as const).map((status) => (
                    <TouchableOpacity
                      key={status}
                      style={{
                        backgroundColor: item.status === status ? statusColors[status] : Colors.light.muted,
                        paddingVertical: Sizes.spacing.sm,
                        borderRadius: Sizes.radius.sm,
                        alignItems: 'center',
                      }}
                      onPress={() => updateStatus(item.id, status)}
                    >
                      <Text
                        style={{
                          color: item.status === status ? '#fff' : Colors.light.mutedForeground,
                          fontWeight: '600',
                          fontSize: Sizes.typography.sm,
                          textTransform: 'capitalize',
                        }}
                      >
                        Mark as {status}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <AdminBottomNav currentScreen="settings" />
    </View>
  );
}