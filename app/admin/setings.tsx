import { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { AdminBottomNav } from '../../components/shared/AdminBottomNav';
import { Colors, Sizes } from '../../constants/colors';

interface Setting {
  id: string;
  label: string;
  description: string;
  value: boolean;
  type: 'toggle';
}

interface Station {
  id: string;
  name: string;
  type: 'kitchen' | 'cashier' | 'admin';
  ip: string;
  status: 'online' | 'offline';
}

const mockSettings: Setting[] = [
  { id: '1', label: 'Enable Notifications', description: 'Send order and user notifications', value: true, type: 'toggle' },
  { id: '2', label: 'Automatic Backups', description: 'Daily backup of system data', value: true, type: 'toggle' },
  { id: '3', label: 'Maintenance Mode', description: 'Disable customer access temporarily', value: false, type: 'toggle' },
  { id: '4', label: 'Email Alerts', description: 'Send alerts via email', value: true, type: 'toggle' },
];

const mockStations: Station[] = [
  { id: '1', name: 'Kitchen Display 1', type: 'kitchen', ip: '192.168.1.100', status: 'online' },
  { id: '2', name: 'Cashier Terminal 1', type: 'cashier', ip: '192.168.1.101', status: 'online' },
  { id: '3', name: 'Cashier Terminal 2', type: 'cashier', ip: '192.168.1.102', status: 'offline' },
];

export default function SettingsScreen() {
  const [settings, setSettings] = useState<Setting[]>(mockSettings);
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleSetting = (id: string) => {
    setSettings(settings.map(s =>
      s.id === id ? { ...s, value: !s.value } : s
    ));
  };

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: Colors.light.background }}
        contentContainerStyle={{ padding: Sizes.spacing.lg }}
      >
        <Text style={{ fontSize: Sizes.typography.lg, fontWeight: '700', marginBottom: Sizes.spacing.lg }}>
          System Settings
        </Text>

        <Text style={{ fontSize: Sizes.typography.base, fontWeight: '700', marginBottom: Sizes.spacing.md }}>
          Configuration
        </Text>
        <View style={{ gap: Sizes.spacing.md, marginBottom: Sizes.spacing.xl }}>
          {settings.map((setting) => (
            <View
              key={setting.id}
              style={{
                backgroundColor: Colors.light.card,
                borderRadius: Sizes.radius.md,
                padding: Sizes.spacing.md,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: Sizes.typography.base, fontWeight: '600', marginBottom: Sizes.spacing.sm }}>
                  {setting.label}
                </Text>
                <Text style={{ color: Colors.light.mutedForeground, fontSize: Sizes.typography.sm }}>
                  {setting.description}
                </Text>
              </View>
              <Switch
                value={setting.value}
                onValueChange={() => toggleSetting(setting.id)}
                trackColor={{ false: Colors.light.muted, true: Colors.light.primary }}
                thumbColor={setting.value ? '#fff' : Colors.light.border}
              />
            </View>
          ))}
        </View>

        <Text style={{ fontSize: Sizes.typography.base, fontWeight: '700', marginBottom: Sizes.spacing.md }}>
          Manage Stations
        </Text>
        <View style={{ gap: Sizes.spacing.md, marginBottom: Sizes.spacing.xl }}>
          {mockStations.map((station) => (
            <TouchableOpacity
              key={station.id}
              style={{
                backgroundColor: Colors.light.card,
                borderRadius: Sizes.radius.md,
                padding: Sizes.spacing.md,
                borderLeftWidth: 4,
                borderLeftColor: station.status === 'online' ? '#10B981' : Colors.light.muted,
              }}
              onPress={() => toggleExpand(station.id)}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Sizes.spacing.sm }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: Sizes.typography.base, fontWeight: '700' }}>
                    {station.name}
                  </Text>
                  <Text style={{ color: Colors.light.mutedForeground, fontSize: Sizes.typography.sm }}>
                    {station.ip}
                  </Text>
                </View>
                <View
                  style={{
                    paddingHorizontal: Sizes.spacing.sm,
                    paddingVertical: 4,
                    borderRadius: Sizes.radius.sm,
                    backgroundColor: station.status === 'online' ? '#DCFCE7' : Colors.light.muted,
                  }}
                >
                  <Text
                    style={{
                      color: station.status === 'online' ? '#15803D' : Colors.light.mutedForeground,
                      fontSize: Sizes.typography.xs,
                      fontWeight: '600',
                      textTransform: 'capitalize',
                    }}
                  >
                    {station.status}
                  </Text>
                </View>
              </View>

              {expanded === station.id && (
                <View style={{ marginTop: Sizes.spacing.md, paddingTop: Sizes.spacing.md, borderTopWidth: 1, borderTopColor: Colors.light.border, gap: Sizes.spacing.sm }}>
                  <View>
                    <Text style={{ color: Colors.light.mutedForeground, fontSize: Sizes.typography.xs, marginBottom: 4 }}>
                      Type
                    </Text>
                    <Text style={{ fontWeight: '600', textTransform: 'capitalize' }}>
                      {station.type}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: Colors.light.primary,
                      paddingVertical: Sizes.spacing.sm,
                      borderRadius: Sizes.radius.sm,
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: '#fff', fontWeight: '600', fontSize: Sizes.typography.sm }}>
                      Configure
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <Text style={{ fontSize: Sizes.typography.base, fontWeight: '700', marginBottom: Sizes.spacing.md }}>
          Maintenance
        </Text>
        <View style={{ gap: Sizes.spacing.md }}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.light.card,
              borderRadius: Sizes.radius.md,
              padding: Sizes.spacing.md,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: Colors.light.foreground, fontWeight: '600' }}>
              Backup System Data
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.light.card,
              borderRadius: Sizes.radius.md,
              padding: Sizes.spacing.md,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: Colors.light.foreground, fontWeight: '600' }}>
              Clear Cache
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#FEE2E2',
              borderRadius: Sizes.radius.md,
              padding: Sizes.spacing.md,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#991B1B', fontWeight: '600' }}>
              Reset System
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <AdminBottomNav currentScreen="settings" />
    </View>
  );
}
