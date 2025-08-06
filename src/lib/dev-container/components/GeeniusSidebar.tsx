// src/lib/dev-container/components/GeeniusSidebar.tsx

import React, { useState, useEffect } from 'react';
import { ChangeRequest, ChangeCategory, ChangePriority, ChangeStatus, SubmissionPayload } from '../types';
import { useDevMode } from './DevModeProvider';
import { ChangeSubmissionDialog } from '../ui/ChangeSubmissionDialog';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Textarea } from '../../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Label } from '../../../components/ui/label';
import { Collapsible, CollapsibleContent } from '../../../components/ui/collapsible';
import { 
  X, Trash2, Edit3, Code, Monitor, ChevronDown, ChevronRight, 
  Copy, Check, Package, Layers, ExternalLink 
} from 'lucide-react';

export const GeeniusSidebar: React.FC = () => {
  const {
    sidebarOpen,
    changes,
    isSubmitting,
    config,
    toggleSidebar,
    updateChange,
    removeChange,
    clearAllChanges,
    addChange,
    system, // Updated to use system
  } = useDevMode();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingFeedback, setEditingFeedback] = useState('');
  const [generalFeedback, setGeneralFeedback] = useState('');
  const [generalCategory, setGeneralCategory] = useState<ChangeCategory>(ChangeCategory.GENERAL);
  const [generalPriority, setGeneralPriority] = useState<ChangePriority>(ChangePriority.MEDIUM);
  const [showSubmissionDialog, setShowSubmissionDialog] = useState(false);
  const [expandedChanges, setExpandedChanges] = useState<Set<string>>(new Set());
  const [copiedChangeId, setCopiedChangeId] = useState<string | null>(null);

  // Handle body class for scrollbar management
  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('sidebar-open');
    };
  }, [sidebarOpen]);

  if (!sidebarOpen) return null;

  // Helper function to toggle expanded state
  const toggleExpanded = (changeId: string) => {
    const newExpanded = new Set(expandedChanges);
    if (newExpanded.has(changeId)) {
      newExpanded.delete(changeId);
    } else {
      newExpanded.add(changeId);
    }
    setExpandedChanges(newExpanded);
  };

  // Helper function to format file paths
  const formatFilePath = (filePath: string) => {
    if (!filePath) return 'N/A';
    return filePath.length > 40 ? `...${filePath.slice(-37)}` : filePath;
  };

  // Helper function to format viewport dimensions
  const formatViewport = (change: ChangeRequest) => {
    const rect = change.componentContext.boundingRect;
    if (!rect) return 'N/A';
    return `${Math.round(rect.width)}×${Math.round(rect.height)}px`;
  };

  // Helper function to format position
  const formatPosition = (change: ChangeRequest) => {
    const rect = change.componentContext.boundingRect;
    if (!rect) return 'N/A';
    return `${Math.round(rect.left)}, ${Math.round(rect.top)}`;
  };

  // Helper function to generate automation-friendly summary
  const generateAutomationSummary = (change: ChangeRequest) => {
    const usage = system.registry[change.componentId];
    const definition = usage ? system.library[usage.definitionId] : undefined;
    
    const summary = {
      id: change.id,
      componentId: change.componentId,
      componentName: change.componentContext.name,
      feedback: change.feedback,
      category: change.category,
      priority: change.priority,
      component: {
        definition: definition ? {
          id: definition.id,
          name: definition.name,
          description: definition.description,
          componentPath: definition.componentPath,
          repositoryPath: definition.repositoryPath,
          category: definition.category,
          semanticTags: definition.semanticTags,
        } : null,
        usage: usage ? {
          id: usage.id,
          name: usage.name,
          description: usage.description,
          filePath: usage.filePath,
          repositoryPath: usage.repositoryPath,
          category: usage.category,
          semanticTags: usage.semanticTags,
        } : null,
        context: {
          usageLine: change.componentContext.usageLineNumber,
          usageColumn: change.componentContext.usageColumnNumber,
          domPath: change.componentContext.domPath,
        }
      },
      pageUrl: change.pageContext.pathname,
      timestamp: change.timestamp
    };
    return JSON.stringify(summary, null, 2);
  };

  // Copy automation summary to clipboard
  const copyAutomationSummary = async (change: ChangeRequest) => {
    try {
      const summary = generateAutomationSummary(change);
      await navigator.clipboard.writeText(summary);
      setCopiedChangeId(change.id);
      setTimeout(() => setCopiedChangeId(null), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const handleEditStart = (change: ChangeRequest) => {
    setEditingId(change.id);
    setEditingFeedback(change.feedback);
  };

  const handleEditSave = (id: string) => {
    if (editingFeedback.trim()) {
      updateChange(id, { feedback: editingFeedback.trim() });
    }
    setEditingId(null);
    setEditingFeedback('');
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingFeedback('');
  };

  const handleAddGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    if (generalFeedback.trim()) {
      addChange({
        componentId: 'general',
        feedback: generalFeedback.trim(),
        category: generalCategory,
        priority: generalPriority,
        status: ChangeStatus.PENDING,
        componentContext: {
          name: 'General',
          description: 'General feedback not tied to a specific component',
          filePath: '',
          parentComponents: [],
          childComponents: [],
          semanticTags: ['general'],
        },
        pageContext: {
          url: window.location.href,
          title: document.title,
          pathname: window.location.pathname,
          searchParams: Object.fromEntries(new URLSearchParams(window.location.search)),
          timestamp: Date.now(),
        },
      });
      setGeneralFeedback('');
      setGeneralCategory(ChangeCategory.GENERAL);
      setGeneralPriority(ChangePriority.MEDIUM);
    }
  };

  const handleSubmitChanges = () => {
    setShowSubmissionDialog(true);
  };

  const handleSubmissionComplete = (payload: SubmissionPayload) => {
    console.log('Submitting changes:', payload);
    
    // Mark changes as submitted
    changes.forEach(change => {
      updateChange(change.id, { status: ChangeStatus.SUBMITTED });
    });
    
    // Clear changes after a delay
    setTimeout(() => {
      clearAllChanges();
    }, 3000);
  };

  return (
    <div 
      className="fixed inset-y-0 right-0 z-[9999] w-96 bg-background shadow-xl border-l flex flex-col"
      onClick={(e) => e.stopPropagation()}
      style={{ marginRight: '0px' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
        <h2 className="text-lg font-semibold">
          Dev Changes ({changes.length})
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            toggleSidebar();
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {/* General feedback form */}
        <Card className="mx-4 mt-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Add General Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddGeneral} className="space-y-3">
              <Textarea
                value={generalFeedback}
                onChange={(e) => setGeneralFeedback(e.target.value)}
                placeholder="General feedback not tied to a specific component..."
                className="min-h-[60px] text-sm resize-none"
              />
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label className="text-xs">Category</Label>
                  <Select
                    value={generalCategory}
                    onValueChange={(value) => setGeneralCategory(value as ChangeCategory)}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={ChangeCategory.GENERAL}>General</SelectItem>
                      <SelectItem value={ChangeCategory.ENHANCEMENT}>Enhancement</SelectItem>
                      <SelectItem value={ChangeCategory.BUG_FIX}>Bug Fix</SelectItem>
                      <SelectItem value={ChangeCategory.CONTENT}>Content</SelectItem>
                      <SelectItem value={ChangeCategory.BEHAVIOR}>Behavior</SelectItem>
                      <SelectItem value={ChangeCategory.PERFORMANCE}>Performance</SelectItem>
                      <SelectItem value={ChangeCategory.ACCESSIBILITY}>Accessibility</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Priority</Label>
                  <Select
                    value={generalPriority}
                    onValueChange={(value) => setGeneralPriority(value as ChangePriority)}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
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
              <Button
                type="submit"
                disabled={!generalFeedback.trim()}
                className="w-full h-8 text-xs"
                size="sm"
              >
                Add General Feedback
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Changes list */}
        <div className="p-4 space-y-3">
          {changes.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No changes yet.</p>
                <p className="text-sm text-muted-foreground mt-1">Click on components to add feedback.</p>
              </CardContent>
            </Card>
          ) : (
            changes.map((change) => {
              const isExpanded = expandedChanges.has(change.id);
              const usage = change.componentId !== 'general' ? system.registry[change.componentId] : null;
              const definition = usage ? system.library[usage.definitionId] : null;
              
              return (
                <Card key={change.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-sm truncate">
                            {change.componentId === 'general' ? 'General' : usage?.name || change.componentId}
                          </CardTitle>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 text-muted-foreground hover:text-foreground shrink-0"
                            onClick={() => toggleExpanded(change.id)}
                          >
                            {isExpanded ? (
                              <ChevronDown className="h-3 w-3" />
                            ) : (
                              <ChevronRight className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                        
                        {config.showComponentIds && change.componentId !== 'general' && (
                          <p className="text-xs text-muted-foreground font-mono bg-muted px-1 py-0.5 rounded mt-1 inline-block">
                            {change.componentId}
                          </p>
                        )}
                        
                        {/* Show definition vs usage indicators */}
                        <div className="flex items-center gap-2 mt-1">
                          {definition && (
                            <div className="flex items-center gap-1">
                              <Package className="h-3 w-3 text-blue-500 shrink-0" />
                              <span className="text-xs text-muted-foreground font-mono truncate" title={definition.componentPath}>
                                {formatFilePath(definition.componentPath)}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {usage && usage.filePath && (
                          <div className="flex items-center gap-1 mt-1">
                            <Layers className="h-3 w-3 text-green-500 shrink-0" />
                            <span className="text-xs text-muted-foreground font-mono truncate" title={usage.filePath}>
                              {formatFilePath(usage.filePath)}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1 shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground hover:text-foreground"
                          onClick={() => copyAutomationSummary(change)}
                          title="Copy automation data"
                        >
                          {copiedChangeId === change.id ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground hover:text-destructive"
                          onClick={() => removeChange(change.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0 space-y-3">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      <Badge variant={change.category === ChangeCategory.BUG_FIX ? 'destructive' : 'secondary'} className="text-xs">
                        {change.category.replace('_', ' ')}
                      </Badge>
                      <Badge variant={change.priority === ChangePriority.URGENT ? 'destructive' : 'outline'} className="text-xs">
                        {change.priority}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {change.status.replace('_', ' ')}
                      </Badge>
                    </div>

                    {/* Feedback */}
                    <div>
                      {editingId === change.id ? (
                        <div className="space-y-2">
                          <Textarea
                            value={editingFeedback}
                            onChange={(e) => setEditingFeedback(e.target.value)}
                            className="min-h-[80px] text-sm resize-none"
                          />
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={handleEditCancel}
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleEditSave(change.id)}
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="group">
                          <p className="text-sm">{change.feedback}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 mt-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleEditStart(change)}
                          >
                            <Edit3 className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Expanded Details - NEW STRUCTURE */}
                    <Collapsible open={isExpanded} onOpenChange={() => toggleExpanded(change.id)}>
                      <CollapsibleContent className="space-y-4">
                        <div className="border-t pt-4 space-y-4">
                          {/* Component Definition Section */}
                          {definition && (
                            <div className="space-y-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3">
                              <div className="flex items-center gap-2">
                                <Package className="h-4 w-4 text-blue-500" />
                                <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Component Definition</span>
                              </div>
                              
                              <div className="space-y-2 text-xs">
                                <div>
                                  <span className="font-medium text-blue-600 dark:text-blue-400">Name:</span>
                                  <span className="ml-2">{definition.name}</span>
                                </div>
                                <div>
                                  <span className="font-medium text-blue-600 dark:text-blue-400">Description:</span>
                                  <span className="ml-2">{definition.description}</span>
                                </div>
                                <div>
                                  <span className="font-medium text-blue-600 dark:text-blue-400">Category:</span>
                                  <span className="ml-2">{definition.category}</span>
                                </div>
                                <div>
                                  <span className="font-medium text-blue-600 dark:text-blue-400">Source:</span>
                                  <code className="ml-2 bg-blue-100 dark:bg-blue-900/50 px-1 rounded text-xs">{definition.componentPath}</code>
                                </div>
                                {definition.repositoryPath && (
                                  <div className="flex items-center gap-1">
                                    <span className="font-medium text-blue-600 dark:text-blue-400">Repository:</span>
                                    <a
                                      href={definition.repositoryPath}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-500 hover:underline flex items-center gap-1 text-xs"
                                    >
                                      <ExternalLink className="h-3 w-3" />
                                      View Source
                                    </a>
                                  </div>
                                )}
                                {definition.semanticTags?.length > 0 && (
                                  <div>
                                    <span className="font-medium text-blue-600 dark:text-blue-400">Tags:</span>
                                    <span className="ml-2">{definition.semanticTags.join(', ')}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Component Usage Section */}
                          {usage && (
                            <div className="space-y-3 bg-green-50 dark:bg-green-950/20 rounded-lg p-3">
                              <div className="flex items-center gap-2">
                                <Layers className="h-4 w-4 text-green-500" />
                                <span className="text-sm font-semibold text-green-700 dark:text-green-300">Component Usage</span>
                              </div>
                              
                              <div className="space-y-2 text-xs">
                                <div>
                                  <span className="font-medium text-green-600 dark:text-green-400">Usage Name:</span>
                                  <span className="ml-2">{usage.name}</span>
                                </div>
                                <div>
                                  <span className="font-medium text-green-600 dark:text-green-400">Description:</span>
                                  <span className="ml-2">{usage.description}</span>
                                </div>
                                <div>
                                  <span className="font-medium text-green-600 dark:text-green-400">Used In:</span>
                                  <code className="ml-2 bg-green-100 dark:bg-green-900/50 px-1 rounded text-xs">{usage.filePath}</code>
                                </div>
                                {usage.repositoryPath && (
                                  <div className="flex items-center gap-1">
                                    <span className="font-medium text-green-600 dark:text-green-400">Repository:</span>
                                    <a
                                      href={usage.repositoryPath}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-green-500 hover:underline flex items-center gap-1 text-xs"
                                    >
                                      <ExternalLink className="h-3 w-3" />
                                      View Usage
                                    </a>
                                  </div>
                                )}
                                {(change.componentContext.usageLineNumber || change.componentContext.usageColumnNumber) && (
                                  <div>
                                    <span className="font-medium text-green-600 dark:text-green-400">Position:</span>
                                    <span className="ml-2">Line {change.componentContext.usageLineNumber || '?'}, Column {change.componentContext.usageColumnNumber || '?'}</span>
                                  </div>
                                )}
                                {usage.semanticTags?.length > 0 && (
                                  <div>
                                    <span className="font-medium text-green-600 dark:text-green-400">Usage Tags:</span>
                                    <span className="ml-2">{usage.semanticTags.join(', ')}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* DOM Information */}
                          {change.componentContext.domPath && (
                            <div className="space-y-2">
                              <div className="flex items-center gap-1">
                                <Code className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs font-medium">DOM Path</span>
                              </div>
                              <p className="text-xs text-muted-foreground font-mono bg-muted p-2 rounded break-all pl-4">
                                {change.componentContext.domPath}
                              </p>
                            </div>
                          )}

                          {/* Element Position & Size */}
                          {change.componentContext.boundingRect && (
                            <div className="space-y-2">
                              <div className="flex items-center gap-1">
                                <Monitor className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs font-medium">Element Info</span>
                              </div>
                              <div className="text-xs text-muted-foreground grid grid-cols-2 gap-2 pl-4">
                                <p><span className="font-medium">Size:</span> {formatViewport(change)}</p>
                                <p><span className="font-medium">Position:</span> {formatPosition(change)}</p>
                              </div>
                            </div>
                          )}

                          {/* Page Context */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-1">
                              <Monitor className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs font-medium">Page Context</span>
                            </div>
                            <div className="text-xs text-muted-foreground space-y-1 pl-4">
                              <p><span className="font-medium">URL:</span> <code className="bg-muted px-1 rounded break-all">{change.pageContext.pathname}</code></p>
                              <p><span className="font-medium">Title:</span> {change.pageContext.title}</p>
                            </div>
                          </div>

                          {/* Timestamp */}
                          <p className="text-xs text-muted-foreground">
                            <span className="font-medium">Created:</span> {new Date(change.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Compact timestamp when not expanded */}
                    {!isExpanded && (
                      <p className="text-xs text-muted-foreground">
                        {new Date(change.timestamp).toLocaleString()}
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>

      {/* Footer */}
      {changes.length > 0 && (
        <div className="border-t p-4 space-y-3 flex-shrink-0 bg-background">
          {/* Quick Summary for Automation */}
          <div className="text-xs text-muted-foreground space-y-1">
            <p><span className="font-medium">Definition files:</span> {[...new Set(changes.map(c => {
              const usage = system.registry[c.componentId];
              const definition = usage ? system.library[usage.definitionId] : null;
              return definition?.componentPath;
            }).filter(Boolean))].length}</p>
            <p><span className="font-medium">Usage files:</span> {[...new Set(changes.map(c => {
              const usage = system.registry[c.componentId];
              return usage?.filePath;
            }).filter(Boolean))].length}</p>
            <p><span className="font-medium">Components:</span> {[...new Set(changes.map(c => c.componentId))].length}</p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={clearAllChanges}
              className="flex-1"
            >
              Clear All
            </Button>
            <Button
              onClick={handleSubmitChanges}
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Submitting...' : `Submit ${changes.length} Change${changes.length !== 1 ? 's' : ''}`}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Changes will be processed by AI agent • Click 📋 to copy automation data
          </p>
        </div>
      )}
      
      {/* Submission Dialog */}
      <ChangeSubmissionDialog
        open={showSubmissionDialog}
        onClose={() => setShowSubmissionDialog(false)}
        changes={changes}
        onSubmit={handleSubmissionComplete}
      />
    </div>
  );
};

export default GeeniusSidebar;