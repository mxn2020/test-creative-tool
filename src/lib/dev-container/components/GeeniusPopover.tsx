// src/lib/dev-container/components/GeeniusProvider.tsx

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PopoverProps, ChangeCategory, ChangePriority } from '../types';
import { useDevMode } from './DevModeProvider';
import { Button } from '../../../components/ui/button';
import { Textarea } from '../../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Label } from '../../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { X, FileText, MapPin } from 'lucide-react';

export const GeeniusPopover: React.FC<PopoverProps> = ({
  componentId,
  isVisible,
  position,
  onClose,
  onSubmitChange,
}) => {
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState<ChangeCategory>(ChangeCategory.ENHANCEMENT);
  const [priority, setPriority] = useState<ChangePriority>(ChangePriority.MEDIUM);
  const [editingChangeId, setEditingChangeId] = useState<string | null>(null);
  const [currentPosition, setCurrentPosition] = useState(position);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { system, changes, popoverState, updateChange, config } = useDevMode();

  const componentMeta = system.registry[componentId];
  
  // Get usage filepath from existing changes for this component
  const existingChange = changes.find(c => c.componentId === componentId);
  const usageFilePath = existingChange?.componentContext?.usageFilePath;

  // Update position when position prop changes
  useEffect(() => {
    setCurrentPosition(position);
  }, [position]);

  // Load existing change data when editing - only run when popover first opens
  useEffect(() => {
    if (!isVisible) return;
    
    if (popoverState?.editingChangeId) {
      const existingChange = changes.find(c => c.id === popoverState.editingChangeId);
      if (existingChange) {
        setFeedback(existingChange.feedback);
        setCategory(existingChange.category);
        setPriority(existingChange.priority);
        setEditingChangeId(existingChange.id);
      }
    } else {
      // Check if there's an existing change for this component
      const existingChange = changes.find(c => c.componentId === componentId);
      if (existingChange) {
        setFeedback(existingChange.feedback);
        setCategory(existingChange.category);
        setPriority(existingChange.priority);
        setEditingChangeId(existingChange.id);
      } else {
        // Reset to defaults for new change
        setFeedback('');
        setCategory(ChangeCategory.ENHANCEMENT);
        setPriority(ChangePriority.MEDIUM);
        setEditingChangeId(null);
      }
    }
  }, [isVisible]); // Only depend on isVisible to prevent flickering

  // Auto-focus textarea when popover opens, reset form when it closes
  useEffect(() => {
    if (isVisible && textareaRef.current) {
      textareaRef.current.focus();
      // Add class to body to disable backdrop-blur when popover is visible
      document.body.classList.add('dev-popover-active');
    } else if (!isVisible) {
      // Reset form when popover closes
      setFeedback('');
      setCategory(ChangeCategory.ENHANCEMENT);
      setPriority(ChangePriority.MEDIUM);
      setEditingChangeId(null);
      // Remove class from body
      document.body.classList.remove('dev-popover-active');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('dev-popover-active');
    };
  }, [isVisible]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (feedback.trim()) {
      if (editingChangeId) {
        // Update existing change
        updateChange(editingChangeId, {
          feedback: feedback.trim(),
          category,
          priority,
        });
        // Don't reset form for updates, close popover instead
        onClose();
      } else {
        // Create new change
        onSubmitChange(feedback.trim(), category, priority);
        // Don't reset form here, let the popover close handle it
        onClose();
      }
    }
  };

  // Prevent click-through
  const handlePopoverClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Handle escape key, command+enter, and scroll events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      // Handle Command+Enter (Mac) or Ctrl+Enter (Windows/Linux) to submit
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        e.stopPropagation();
        if (feedback.trim()) {
          const form = document.querySelector('.geenius-popover-form') as HTMLFormElement;
          if (form) {
            form.requestSubmit();
          }
        }
      }
    };

    const handleScroll = () => {
      // Close popover on scroll to avoid confusion about which element it belongs to
      onClose();
    };

    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown);
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const popoverStyle = {
    position: 'absolute' as const,
    top: currentPosition.top,
    left: currentPosition.left,
    zIndex: 2147483647, // Maximum z-index value
    transform: `translate(${currentPosition.offset.x}px, ${currentPosition.offset.y}px)`,
  };

  const popoverContent = (
    <Card
      style={popoverStyle}
      className="min-w-[320px] max-w-[400px] shadow-xl border dev-popover-top-layer"
      onClick={handlePopoverClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div>
          <CardTitle className="text-sm font-semibold">
            {componentMeta?.name || componentId}
          </CardTitle>
          {config.showComponentIds && (
            <p className="text-xs text-muted-foreground font-mono bg-muted px-1 py-0.5 rounded mt-1 inline-block">
              {componentId}
            </p>
          )}
          {componentMeta && (
            <CardDescription className="text-xs mt-1">
              {componentMeta.description}
            </CardDescription>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Component info badges */}
        {componentMeta && (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1">
              <Badge variant="secondary" className="text-xs">
                {componentMeta.category}
              </Badge>
            </div>
            
            {/* File path information */}
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                <span className="font-medium">Defined in:</span>
                <span className="font-mono">{componentMeta.filePath}</span>
              </div>
              {usageFilePath && (
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span className="font-medium">Used in:</span>
                    <span className="font-mono">{usageFilePath}</span>
                  </div>
                  {existingChange?.componentContext?.usageLineNumber && (
                    <div className="flex items-center gap-1 ml-4 text-xs">
                      <span className="font-medium">Line:</span>
                      <span className="font-mono">{existingChange.componentContext.usageLineNumber}</span>
                      {existingChange.componentContext.usageColumnNumber && (
                        <>
                          <span className="font-medium">Col:</span>
                          <span className="font-mono">{existingChange.componentContext.usageColumnNumber}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 geenius-popover-form">
          {/* Feedback textarea */}
          <div className="space-y-2">
            <Label htmlFor="feedback" className="text-sm font-medium">
              What would you like to change?
            </Label>
            <Textarea
              id="feedback"
              ref={textareaRef}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Describe the change you'd like to see..."
              className="min-h-[80px] text-sm resize-none"
              required
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Category and Priority selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">
                Category
              </Label>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value as ChangeCategory)}
              >
                <SelectTrigger className="text-sm" onClick={(e) => e.stopPropagation()}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ChangeCategory.ENHANCEMENT}>Enhancement</SelectItem>
                  <SelectItem value={ChangeCategory.BUG_FIX}>Bug Fix</SelectItem>
                  <SelectItem value={ChangeCategory.STYLING}>Styling</SelectItem>
                  <SelectItem value={ChangeCategory.CONTENT}>Content</SelectItem>
                  <SelectItem value={ChangeCategory.BEHAVIOR}>Behavior</SelectItem>
                  <SelectItem value={ChangeCategory.PERFORMANCE}>Performance</SelectItem>
                  <SelectItem value={ChangeCategory.ACCESSIBILITY}>Accessibility</SelectItem>
                  <SelectItem value={ChangeCategory.GENERAL}>General</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority" className="text-sm font-medium">
                Priority
              </Label>
              <Select
                value={priority}
                onValueChange={(value) => setPriority(value as ChangePriority)}
              >
                <SelectTrigger className="text-sm" onClick={(e) => e.stopPropagation()}>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ChangePriority.LOW}>Low</SelectItem>
                  <SelectItem value={ChangePriority.MEDIUM}>Medium</SelectItem>
                  <SelectItem value={ChangePriority.HIGH}>High</SelectItem>
                  <SelectItem value={ChangePriority.URGENT}>Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={!feedback.trim()}
              onClick={(e) => e.stopPropagation()}
              title="Press ⌘+Enter to submit quickly"
            >
              {editingChangeId ? 'Update Change' : 'Add Change'}
            </Button>
          </div>
        </form>
      </CardContent>

      {/* Popover arrow */}
      <div
        className={`absolute w-3 h-3 bg-background border transform rotate-45 ${
          currentPosition.placement === 'top' 
            ? 'bottom-[-6px] border-r-0 border-b-0' 
            : currentPosition.placement === 'bottom'
            ? 'top-[-6px] border-l-0 border-t-0'
            : currentPosition.placement === 'left'
            ? 'right-[-6px] border-t-0 border-r-0'
            : 'left-[-6px] border-b-0 border-l-0'
        }`}
        style={{
          left: currentPosition.placement === 'top' || currentPosition.placement === 'bottom' ? '50%' : undefined,
          top: currentPosition.placement === 'left' || currentPosition.placement === 'right' ? '50%' : undefined,
          transform: `translate(-50%, -50%) rotate(45deg)`,
        }}
      />
    </Card>
  );

  // Render in a portal to escape stacking context issues
  return createPortal(popoverContent, document.body);
};

export default GeeniusPopover;