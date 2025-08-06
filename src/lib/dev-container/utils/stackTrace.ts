/**
 * Enhanced utility to extract usage filepath from call stack
 * Updated to work with the new ComponentDefinition/ComponentUsage system
 */

interface StackFrame {
  fileName?: string;
  lineNumber?: number;
  columnNumber?: number;
  functionName?: string;
}

interface UsageContext {
  filePath?: string;
  lineNumber?: number;
  columnNumber?: number;
  functionName?: string;
  isKnownUsage?: boolean; // Whether this matches a registered usage
}

/**
 * Parses a stack trace line to extract file information
 */
function parseStackFrame(line: string): StackFrame | null {
  // Different browsers have different stack trace formats
  // Chrome: "    at ComponentName (http://localhost:5173/src/pages/HomePage.tsx:42:15)"
  // Firefox: "ComponentName@http://localhost:5173/src/pages/HomePage.tsx:42:15"
  // Safari: "ComponentName@http://localhost:5173/src/pages/HomePage.tsx:42:15"
  
  // Match Chrome format
  const chromeMatch = line.match(/at\s+(.+?)\s+\((.+?):(\d+):(\d+)\)/);
  if (chromeMatch) {
    return {
      functionName: chromeMatch[1],
      fileName: chromeMatch[2],
      lineNumber: parseInt(chromeMatch[3]),
      columnNumber: parseInt(chromeMatch[4])
    };
  }
  
  // Match Firefox/Safari format
  const firefoxMatch = line.match(/(.+?)@(.+?):(\d+):(\d+)/);
  if (firefoxMatch) {
    return {
      functionName: firefoxMatch[1],
      fileName: firefoxMatch[2],
      lineNumber: parseInt(firefoxMatch[3]),
      columnNumber: parseInt(firefoxMatch[4])
    };
  }
  
  // Fallback: try to extract just the filename
  const fileMatch = line.match(/(https?:\/\/[^:]+|file:\/\/[^:]+|[^:]+\.tsx?[^:]*):(\d+):(\d+)/);
  if (fileMatch) {
    return {
      fileName: fileMatch[1],
      lineNumber: parseInt(fileMatch[2]),
      columnNumber: parseInt(fileMatch[3])
    };
  }
  
  return null;
}

/**
 * Cleans up the file path to be more readable
 */
function cleanFilePath(fileName: string): string {
  // Remove protocol and domain for local files
  if (fileName.includes('localhost') || fileName.includes('127.0.0.1')) {
    const match = fileName.match(/(?:localhost|127\.0\.0\.1):\d+\/(.+)/);
    if (match) {
      return match[1];
    }
  }
  
  // Remove file:// protocol
  if (fileName.startsWith('file://')) {
    return fileName.replace('file://', '');
  }
  
  // For webpack dev server or similar, extract the relevant path
  const srcMatch = fileName.match(/\/src\/(.+)/);
  if (srcMatch) {
    return `src/${srcMatch[1]}`;
  }
  
  return fileName;
}

/**
 * Gets the usage filepath by analyzing the call stack
 * Returns the first non-dev-container file in the stack with optional line info
 */
export function getUsageFilePath(): string | undefined {
  try {
    // Create a new Error to get the current call stack
    const error = new Error();
    const stack = error.stack;
    
    if (!stack) {
      return undefined;
    }
    
    const lines = stack.split('\n');
    
    // Skip the first line (Error message) and iterate through stack frames
    for (let i = 1; i < lines.length; i++) {
      const frame = parseStackFrame(lines[i]);
      
      if (frame?.fileName) {
        const cleanPath = cleanFilePath(frame.fileName);
        
        // Skip our own dev-container files
        if (cleanPath.includes('dev-container/') || 
            cleanPath.includes('node_modules/') ||
            cleanPath.includes('Container.tsx') ||
            cleanPath.includes('stackTrace.ts')) {
          continue;
        }
        
        // This should be the file where the component was used
        return cleanPath;
      }
    }
    
    return undefined;
  } catch (error) {
    // If anything goes wrong, don't break the app
    console.warn('Failed to extract usage filepath:', error);
    return undefined;
  }
}

/**
 * Gets detailed usage information including line numbers
 */
export function getUsageInfo(): { filePath?: string; lineNumber?: number; columnNumber?: number } {
  try {
    const error = new Error();
    const stack = error.stack;
    
    if (!stack) {
      return {};
    }
    
    const lines = stack.split('\n');
    
    for (let i = 1; i < lines.length; i++) {
      const frame = parseStackFrame(lines[i]);
      
      if (frame?.fileName) {
        const cleanPath = cleanFilePath(frame.fileName);
        
        // Skip our own dev-container files
        if (cleanPath.includes('dev-container/') || 
            cleanPath.includes('node_modules/') ||
            cleanPath.includes('Container.tsx') ||
            cleanPath.includes('stackTrace.ts')) {
          continue;
        }
        
        return {
          filePath: cleanPath,
          lineNumber: frame.lineNumber,
          columnNumber: frame.columnNumber
        };
      }
    }
    
    return {};
  } catch (error) {
    console.warn('Failed to extract usage info:', error);
    return {};
  }
}

// =====================================
// NEW: ENHANCED USAGE DETECTION
// =====================================

/**
 * Enhanced usage detection that can validate against registered usages
 */
export function getEnhancedUsageInfo(registry?: any): UsageContext {
  try {
    const basicInfo = getUsageInfo();
    
    if (!registry || !basicInfo.filePath) {
      return basicInfo;
    }
    
    // Check if this usage matches any registered usages
    const matchingUsages = Object.values(registry).filter((usage: any) => 
      usage.filePath === basicInfo.filePath
    );
    
    return {
      ...basicInfo,
      isKnownUsage: matchingUsages.length > 0
    };
  } catch (error) {
    console.warn('Failed to get enhanced usage info:', error);
    return {};
  }
}

/**
 * Gets detailed stack information for debugging
 */
export function getDetailedStackInfo(): StackFrame[] {
  try {
    const error = new Error();
    const stack = error.stack;
    
    if (!stack) {
      return [];
    }
    
    const lines = stack.split('\n');
    const frames: StackFrame[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const frame = parseStackFrame(lines[i]);
      if (frame) {
        frames.push({
          ...frame,
          fileName: frame.fileName ? cleanFilePath(frame.fileName) : undefined
        });
      }
    }
    
    return frames;
  } catch (error) {
    console.warn('Failed to get detailed stack info:', error);
    return [];
  }
}

/**
 * Enhanced formatting for the new system
 */
export function formatUsageInfo(
  definitionPath: string, 
  usagePath?: string,
  usageLineNumber?: number
): string {
  if (!usagePath) {
    return `Defined in: ${definitionPath}`;
  }
  
  const lineInfo = usageLineNumber ? `:${usageLineNumber}` : '';
  return `Defined in: ${definitionPath}\nUsed in: ${usagePath}${lineInfo}`;
}

/**
 * Format component context for AI agents
 */
export function formatComponentContext(
  definitionPath: string,
  usageContext: UsageContext,
  additionalContext?: {
    definitionId?: string;
    usageId?: string;
    componentName?: string;
  }
): string {
  const parts = [
    `Component Definition: ${definitionPath}`,
  ];
  
  if (usageContext.filePath) {
    const location = usageContext.lineNumber 
      ? `${usageContext.filePath}:${usageContext.lineNumber}:${usageContext.columnNumber || 0}`
      : usageContext.filePath;
    parts.push(`Usage Location: ${location}`);
  }
  
  if (additionalContext?.componentName) {
    parts.push(`Component Name: ${additionalContext.componentName}`);
  }
  
  if (additionalContext?.definitionId) {
    parts.push(`Definition ID: ${additionalContext.definitionId}`);
  }
  
  if (additionalContext?.usageId) {
    parts.push(`Usage ID: ${additionalContext.usageId}`);
  }
  
  if (usageContext.isKnownUsage !== undefined) {
    parts.push(`Registered Usage: ${usageContext.isKnownUsage ? 'Yes' : 'No'}`);
  }
  
  return parts.join('\n');
}

/**
 * Auto-generate usage suggestions based on stack trace
 */
export function generateUsageSuggestion(): {
  suggestedId?: string;
  suggestedName?: string;
  filePath?: string;
  lineNumber?: number;
} {
  const usageInfo = getUsageInfo();
  
  if (!usageInfo.filePath) {
    return {};
  }
  
  // Extract component name from file path
  const fileName = usageInfo.filePath.split('/').pop()?.replace(/\.(tsx?|jsx?)$/, '');
  const functionName = extractFunctionNameFromStack();
  
  // Generate suggested ID (kebab-case)
  const baseName = functionName || fileName || 'component';
  const suggestedId = baseName
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  // Generate suggested name (Title Case)
  const suggestedName = baseName
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
  
  return {
    suggestedId,
    suggestedName,
    filePath: usageInfo.filePath,
    lineNumber: usageInfo.lineNumber
  };
}

/**
 * Extract function name from stack trace
 */
function extractFunctionNameFromStack(): string | undefined {
  const frames = getDetailedStackInfo();
  
  // Look for React component names (usually start with uppercase)
  for (const frame of frames) {
    if (frame.functionName && /^[A-Z]/.test(frame.functionName)) {
      // Skip common React internals
      if (!['Component', 'createElement', 'render'].includes(frame.functionName)) {
        return frame.functionName;
      }
    }
  }
  
  return undefined;
}

/**
 * Debug helper to log stack information
 */
export function debugStackTrace(label = 'Stack Trace'): void {
  if (import.meta.env.DEV) {
    const frames = getDetailedStackInfo();
    console.group(`🔍 ${label}`);
    frames.forEach((frame, index) => {
      const location = frame.fileName ? 
        `${frame.fileName}:${frame.lineNumber}:${frame.columnNumber}` : 
        'unknown';
      console.log(`${index + 1}. ${frame.functionName || 'anonymous'} (${location})`);
    });
    console.groupEnd();
  }
}