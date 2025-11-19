import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors, Sizes } from '../../constants/colors';

interface Employee {
  id: string;
  name: string;
  email: string;
  role: 'manager' | 'cashier' | 'kitchen' | 'delivery';
  status: 'active' | 'inactive';
  joinDate: string;
  expandedId: string | null;
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Maria Santos',
    email: 'maria@restaurant.com',
    role: 'cashier',
    status: 'active',
    joinDate: '2023-01-15',
    expandedId: null,
  },
  {
    id: '2',
    name: 'Juan Dela Cruz',
    email: 'juan@restaurant.com',
    role: 'kitchen',
    status: 'active',
    joinDate: '2023-02-20',
    expandedId: null,
  },
  {
    id: '3',
    name: 'Pedro Garcia',
    email: 'pedro@restaurant.com',
    role: 'manager',
    status: 'active',
    joinDate: '2022-11-10',
    expandedId: null,
  },
];

const roleIcons = {
  manager: '👨‍💼',
  cashier: '💳',
  kitchen: '👨‍🍳',
  delivery: '🚚',
};

export function EmployeeManagementNative() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filterRole, setFilterRole] = useState<'all' | Employee['role']>('all');

  const filteredEmployees = employees.filter(emp => {
    const matchSearch = emp.name.toLowerCase().includes(search.toLowerCase()) || emp.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === 'all' || emp.role === filterRole;
    return matchSearch && matchRole;
  });

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  const toggleStatus = (id: string) => {
    setEmployees(
      employees.map(emp =>
        emp.id === id ? { ...emp, status: emp.status === 'active' ? 'inactive' : 'active' } : emp
      )
    );
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.light.background }}
      contentContainerStyle={{ padding: Sizes.spacing.lg }}
    >
      <Text style={{ fontSize: Sizes.typography.lg, fontWeight: '700', marginBottom: Sizes.spacing.lg }}>
        Employee Management
      </Text>

      {/* Search */}
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: Colors.light.border,
          borderRadius: Sizes.radius.md,
          padding: Sizes.spacing.md,
          color: Colors.light.foreground,
          marginBottom: Sizes.spacing.md,
          fontSize: Sizes.typography.base,
        }}
        placeholder="Search by name or email..."
        placeholderTextColor={Colors.light.mutedForeground}
        value={search}
        onChangeText={setSearch}
      />

      {/* Role Filter */}
      <View style={{ flexDirection: 'row', gap: Sizes.spacing.sm, marginBottom: Sizes.spacing.lg }}>
        {(['all', 'manager', 'cashier', 'kitchen', 'delivery'] as const).map((role) => (
          <TouchableOpacity
            key={role}
            style={{
              paddingVertical: Sizes.spacing.sm,
              paddingHorizontal: Sizes.spacing.md,
              borderRadius: Sizes.radius.sm,
              backgroundColor: filterRole === role ? Colors.light.primary : Colors.light.card,
              borderWidth: 1,
              borderColor: filterRole === role ? Colors.light.primary : Colors.light.border,
            }}
            onPress={() => setFilterRole(role)}
          >
            <Text
              style={{
                color: filterRole === role ? '#fff' : Colors.light.foreground,
                fontWeight: '600',
                fontSize: Sizes.typography.xs,
                textTransform: 'capitalize',
              }}
            >
              {role}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Employee List */}
      {filteredEmployees.length > 0 ? (
        filteredEmployees.map((employee) => (
          <TouchableOpacity
            key={employee.id}
            style={{
              backgroundColor: Colors.light.card,
              borderRadius: Sizes.radius.md,
              padding: Sizes.spacing.md,
              marginBottom: Sizes.spacing.md,
              borderLeftWidth: 4,
              borderLeftColor: employee.status === 'active' ? Colors.light.primary : Colors.light.muted,
            }}
            onPress={() => toggleExpand(employee.id)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: Sizes.spacing.md, marginBottom: Sizes.spacing.sm }}>
              <Text style={{ fontSize: 28 }}>
                {roleIcons[employee.role]}
              </Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: Sizes.typography.base, fontWeight: '700' }}>
                  {employee.name}
                </Text>
                <Text style={{ color: Colors.light.mutedForeground, fontSize: Sizes.typography.sm }}>
                  {employee.email}
                </Text>
              </View>
              <View
                style={{
                  paddingHorizontal: Sizes.spacing.sm,
                  paddingVertical: 4,
                  borderRadius: Sizes.radius.sm,
                  backgroundColor: employee.status === 'active' ? '#DCFCE7' : Colors.light.muted,
                }}
              >
                <Text
                  style={{
                    color: employee.status === 'active' ? '#15803D' : Colors.light.mutedForeground,
                    fontSize: Sizes.typography.xs,
                    fontWeight: '600',
                    textTransform: 'capitalize',
                  }}
                >
                  {employee.status}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ color: Colors.light.mutedForeground, fontSize: Sizes.typography.sm }}>
                Joined {employee.joinDate}
              </Text>
              <Text style={{ fontSize: 18 }}>
                {expanded === employee.id ? '▼' : '▶'}
              </Text>
            </View>

            {expanded === employee.id && (
              <View style={{ marginTop: Sizes.spacing.md, paddingTop: Sizes.spacing.md, borderTopWidth: 1, borderTopColor: Colors.light.border }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: Sizes.spacing.md }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: Colors.light.mutedForeground, fontSize: Sizes.typography.xs, marginBottom: 4 }}>
                      Role
                    </Text>
                    <Text style={{ fontWeight: '600', textTransform: 'capitalize' }}>
                      {employee.role}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: Colors.light.mutedForeground, fontSize: Sizes.typography.xs, marginBottom: 4 }}>
                      Status
                    </Text>
                    <Text style={{ fontWeight: '600', textTransform: 'capitalize' }}>
                      {employee.status}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={{
                    backgroundColor: employee.status === 'active' ? '#FEE2E2' : '#DCFCE7',
                    paddingVertical: Sizes.spacing.sm,
                    paddingHorizontal: Sizes.spacing.md,
                    borderRadius: Sizes.radius.sm,
                    marginBottom: Sizes.spacing.sm,
                  }}
                  onPress={() => toggleStatus(employee.id)}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      color: employee.status === 'active' ? '#991B1B' : '#15803D',
                      fontWeight: '600',
                      fontSize: Sizes.typography.sm,
                    }}
                  >
                    {employee.status === 'active' ? 'Deactivate' : 'Activate'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.light.primary,
                    paddingVertical: Sizes.spacing.sm,
                    paddingHorizontal: Sizes.spacing.md,
                    borderRadius: Sizes.radius.sm,
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '600', fontSize: Sizes.typography.sm }}>
                    Edit Employee
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        ))
      ) : (
        <View style={{ alignItems: 'center', paddingVertical: Sizes.spacing.xl }}>
          <Text style={{ color: Colors.light.mutedForeground, fontSize: Sizes.typography.base }}>
            No employees found
          </Text>
        </View>
      )}

      {/* Add Employee Button */}
      <TouchableOpacity
        style={{
          backgroundColor: Colors.light.primary,
          paddingVertical: Sizes.spacing.lg,
          borderRadius: Sizes.radius.md,
          alignItems: 'center',
          marginTop: Sizes.spacing.lg,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: '700', fontSize: Sizes.typography.base }}>
          + Add New Employee
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
