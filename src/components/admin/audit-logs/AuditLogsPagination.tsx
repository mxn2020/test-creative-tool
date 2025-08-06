// src/components/admin/audit-logs/AuditLogsPagination.tsx

import { Container, Card, Button, Div } from '@/lib/dev-container';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ComponentRegistryId } from '../../../registry/componentRegistry';

interface AuditLogsPaginationProps {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

// Helper function for dynamic page button IDs
const getPageButtonId = (pageNum: number): ComponentRegistryId => {
  // Map common page numbers to specific IDs
  const pageIds: ComponentRegistryId[] = [
    'audit-page-button-1',
    'audit-page-button-2',
    'audit-page-button-3',
    'audit-page-button-4',
    'audit-page-button-5',
  ];
  // Use the specific ID if within range, otherwise use dynamic
  return pageNum <= 5 ? pageIds[pageNum - 1] : ('audit-page-button-dynamic' as ComponentRegistryId);
};

export function AuditLogsPagination({ 
  currentPage, 
  totalPages, 
  isLoading, 
  onPageChange 
}: AuditLogsPaginationProps) {
  return (
    <Container componentId="audit-logs-pagination">
      <Card devId="pagination-card" className="p-4">
        <Div devId="pagination-content" className="flex items-center justify-between">
          <Div devId="pagination-info" className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </Div>
          <Div devId="pagination-controls" className="flex items-center gap-2">
            <Button
              devId="prev-page-button"
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1 || isLoading}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Div devId="page-numbers" className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <Button
                    key={pageNum}
                    devId={getPageButtonId(pageNum)}
                    variant={currentPage === pageNum ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onPageChange(pageNum)}
                    className="w-10"
                    disabled={isLoading}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </Div>
            <Button
              devId="next-page-button"
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages || isLoading}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Div>
        </Div>
      </Card>
    </Container>
  );
}

