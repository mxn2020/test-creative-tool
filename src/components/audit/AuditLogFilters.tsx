import { Card } from '../../lib/dev-container';
import { Filter } from 'lucide-react';

interface AuditLogFiltersProps {
  filterAction: string;
  onFilterChange: (action: string) => void;
}

export function AuditLogFilters({ filterAction, onFilterChange }: AuditLogFiltersProps) {
  return (
    <Card devId="filters-card" className="p-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium">Filter by:</span>
        </div>
        <select
          value={filterAction}
          onChange={(e) => onFilterChange(e.target.value)}
          className="text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">All activities</option>
          <option value="login">Sign ins</option>
          <option value="logout">Sign outs</option>
          <option value="login_failed">Failed logins</option>
          <option value="password_change">Password changes</option>
          <option value="session_revoked">Session revocations</option>
        </select>
      </div>
    </Card>
  );
}