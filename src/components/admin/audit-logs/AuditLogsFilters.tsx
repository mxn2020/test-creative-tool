// src/components/admin/audit-logs/AuditLogsFilters.tsx

import { Container, Card, Button, Input, Label, Span, Div, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/dev-container';

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuditLogsFiltersProps {
    users: User[];
    filterUserId: string;
    filterAction: string;
    startDate: string;
    endDate: string;
    onFilterChange: (filters: {
        filterUserId?: string;
        filterAction?: string;
        startDate?: string;
        endDate?: string;
    }) => void;
    onClearFilters: () => void;
}

export function AuditLogsFilters({
    users,
    filterUserId,
    filterAction,
    startDate,
    endDate,
    onFilterChange,
    onClearFilters
}: AuditLogsFiltersProps) {
    const hasActiveFilters = filterUserId || filterAction || startDate || endDate;

    return (
        <Container componentId="audit-logs-filters">
            <Card devId="filters-card" className="p-4">
                <Div devId="filters-content" className="space-y-4">
                    <Div devId="filters-grid" className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* User Filter */}
                        <Div devId="user-filter-wrapper">
                            <Label devId="user-filter-label" htmlFor="user-filter">User</Label>
                            <Select
                                devId='user-filter-select'
                                value={filterUserId}
                                onValueChange={(value) => onFilterChange({ filterUserId: value })}
                            >
                                <SelectTrigger devId="user-filter-trigger" className="mt-1">
                                    <SelectValue
                                        devId="user-filter-value"
                                        placeholder="All users"
                                    />
                                </SelectTrigger>
                                <SelectContent devId="user-filter-content">
                                    <SelectItem devId="user-filter-all" value="">All users</SelectItem>
                                    {users.map(user => (
                                        <SelectItem
                                            key={user.id}
                                            devId={`user-filter-option-${user.id}`}
                                            value={user.id}
                                        >
                                            {user.name} ({user.email})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Div>

                        {/* Action Filter */}
                        <Div devId="action-filter-wrapper">
                            <Label devId="action-filter-label" htmlFor="action-filter">Action</Label>
                            <Select
                                devId='action-filter-select'
                                value={filterAction}
                                onValueChange={(value) => onFilterChange({ filterAction: value })}
                            >
                                <SelectTrigger devId="action-filter-trigger" className="mt-1">
                                    <SelectValue
                                        devId="action-filter-value"
                                        placeholder="All actions" />
                                </SelectTrigger>
                                <SelectContent devId="action-filter-content">
                                    <SelectItem devId="action-filter-all" value="">All actions</SelectItem>
                                    <SelectItem devId="action-filter-login" value="login">Sign ins</SelectItem>
                                    <SelectItem devId="action-filter-logout" value="logout">Sign outs</SelectItem>
                                    <SelectItem devId="action-filter-login-failed" value="login_failed">Failed logins</SelectItem>
                                    <SelectItem devId="action-filter-user-created" value="user_created">User registrations</SelectItem>
                                    <SelectItem devId="action-filter-user-deleted" value="user_deleted">User deletions</SelectItem>
                                    <SelectItem devId="action-filter-role-changed" value="role_changed">Role changes</SelectItem>
                                    <SelectItem devId="action-filter-password-change" value="password_change">Password changes</SelectItem>
                                    <SelectItem devId="action-filter-session-revoked" value="session_revoked">Session revocations</SelectItem>
                                </SelectContent>
                            </Select>
                        </Div>

                        {/* Start Date Filter */}
                        <Div devId="start-date-wrapper">
                            <Label devId="start-date-label" htmlFor="start-date">Start Date</Label>
                            <Input
                                devId="start-date-input"
                                id="start-date"
                                type="date"
                                value={startDate}
                                onChange={(e) => onFilterChange({ startDate: e.target.value })}
                                className="mt-1"
                            />
                        </Div>

                        {/* End Date Filter */}
                        <Div devId="end-date-wrapper">
                            <Label devId="end-date-label" htmlFor="end-date">End Date</Label>
                            <Input
                                devId="end-date-input"
                                id="end-date"
                                type="date"
                                value={endDate}
                                onChange={(e) => onFilterChange({ endDate: e.target.value })}
                                className="mt-1"
                            />
                        </Div>
                    </Div>

                    {/* Active Filters Indicator */}
                    {hasActiveFilters && (
                        <Div devId="active-filters" className="flex items-center gap-2">
                            <Span devId="active-filters-label" className="text-sm text-gray-500">Active filters:</Span>
                            <Button
                                devId="clear-filters-button"
                                variant="ghost"
                                size="sm"
                                onClick={onClearFilters}
                            >
                                Clear all
                            </Button>
                        </Div>
                    )}
                </Div>
            </Card>
        </Container>
    );
}

