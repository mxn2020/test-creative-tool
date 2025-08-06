import { Card, Button } from '../../lib/dev-container';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AuditLogPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

export function AuditLogPagination({ 
  page, 
  totalPages, 
  onPageChange, 
  isLoading 
}: AuditLogPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <Card devId="pagination-card" className="p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Page {page} of {totalPages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            devId="prev-page-button"
            variant="outline"
            size="sm"
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1 || isLoading}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            devId="next-page-button"
            variant="outline"
            size="sm"
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages || isLoading}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}