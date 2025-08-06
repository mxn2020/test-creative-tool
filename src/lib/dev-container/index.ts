// src/lib/dev-container/index.ts

// Main export file for the dev-container package
export * from './types';
export * from './components/Container';
export * from './components/DevModeProvider';
export * from './components/DevModeApp';
export * from './components/GeeniusPopover';
export * from './components/GeeniusSidebar';
export { useDevMode as useDevModeHook } from './hooks/useDevMode';
export * from './hooks/useContainer';
export * from './utils/positioning';
export * from './utils/storage';

// Export specific components for convenience
export { DevModeFloatingIcon } from './components/DevModeProvider';

// Export shadcn components wrapped with dev-container
export * from './shadcn/Accordion';
export * from './shadcn/Alert';
export * from './shadcn/AlertDialog';
export * from './shadcn/AspectRatio';
export * from './shadcn/Avatar';
export * from './shadcn/Badge';
export * from './shadcn/Breadcrumb';
export * from './shadcn/Button';
export * from './shadcn/Calendar';
export * from './shadcn/Card';
export * from './shadcn/Carousel';
export * from './shadcn/Chart';
export * from './shadcn/Checkbox';
export * from './shadcn/Collapsible';
export * from './shadcn/Command';
export * from './shadcn/ContextMenu';
export * from './shadcn/Dialog';
export * from './shadcn/Drawer';
export * from './shadcn/DropdownMenu';
export * from './shadcn/Form';
export * from './shadcn/HoverCard';
export * from './shadcn/Input';
export * from './shadcn/InputOTP';
export * from './shadcn/Label';
export * from './shadcn/Menubar';
export * from './shadcn/NavigationMenu';
export * from './shadcn/Pagination';
export * from './shadcn/Popover';
export * from './shadcn/Progress';
export * from './shadcn/RadioGroup';
export * from './shadcn/Resizable';
export * from './shadcn/ScrollArea';
export * from './shadcn/Select';
export * from './shadcn/Separator';
export * from './shadcn/Sheet';
export * from './shadcn/Sidebar';
export * from './shadcn/Skeleton';
export * from './shadcn/Slider';
export * from './shadcn/Sonner';
export * from './shadcn/Switch';
export * from './shadcn/Table';
export * from './shadcn/Tabs';
export * from './shadcn/Textarea';
export * from './shadcn/Toggle';
export * from './shadcn/ToggleGroup';
export * from './shadcn/Tooltip';

// Export custom HTML components wrapped with dev-container
export * from './html/Div';
export * from './html/Footer';
export * from './html/Header';
export * from './html/Headings';
export * from './html/Lists';
export * from './html/Media';
export * from './html/Nav';
export * from './html/Paragraph';
export * from './html/Section';
export * from './html/Semantic';
export * from './html/Span';
export * from './html/Text';