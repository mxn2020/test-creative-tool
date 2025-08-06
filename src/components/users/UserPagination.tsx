// src/components/users/UserPagination.tsx

import { Card, Button } from '@/lib/dev-container';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ComponentRegistryId } from '../../registry/componentRegistry';

interface UserPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

// Helper function for dynamic page button IDs
const getPageButtonId = (pageNum: number): ComponentRegistryId => {
  const pageIds: ComponentRegistryId[] = [
    'page-button-1',
    'page-button-2', 
    'page-button-3',
    'page-button-4',
    'page-button-5',
  ];
  return pageNum <= 5 ? pageIds[pageNum - 1] : 'page-button-dynamic';
};

export function UserPagination({
  currentPage,
  totalPages,
  onPageChange,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
}: UserPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxButtons = 5;
    
    if (totalPages <= maxButtons) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
      // Near the beginning
      for (let i = 1; i <= maxButtons; i++) {
        pages.push(i);
      }
    } else if (currentPage >= totalPages - 2) {
      // Near the end
      for (let i = totalPages - maxButtons + 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // In the middle
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  return (
    <Card devId="pagination-card" className="p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            devId="prev-page-button"
            variant="outline"
            size="sm"
            onClick={onPrevious}
            disabled={!canGoPrevious}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          
          <div className="flex gap-1">
            {getPageNumbers().map((pageNum) => (
              <Button
                key={pageNum}
                devId={getPageButtonId(pageNum)}
                variant={currentPage === pageNum ? 'default' : 'outline'}
                size="sm"
                onClick={() => onPageChange(pageNum)}
                className="w-10"
              >
                {pageNum}
              </Button>
            ))}
          </div>
          
          <Button
            devId="next-page-button"
            variant="outline"
            size="sm"
            onClick={onNext}
            disabled={!canGoNext}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </Card>
  );
}