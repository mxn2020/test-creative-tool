// scripts/generateRegistryTypes.ts
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const registryDataPath = path.join(__dirname, '../src/registry/registry-data');
const generatedTypesPath = path.join(__dirname, '../src/registry/generatedTypes.ts');

// Read all JSON files from registry-data directory
const jsonFiles = fs.readdirSync(registryDataPath).filter(file => file.endsWith('.json'));

// Collect all component IDs and definition IDs
const allComponentIds = new Set<string>();
const allDefinitionIds = new Set<string>();

jsonFiles.forEach(file => {
  const filePath = path.join(registryDataPath, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  try {
    const data = JSON.parse(content);
    if (Array.isArray(data)) {
      data.forEach(item => {
        if (item.id && typeof item.id === 'string') {
          allComponentIds.add(item.id);
        }
        if (item.definitionId && typeof item.definitionId === 'string') {
          allDefinitionIds.add(item.definitionId);
        }
      });
    }
  } catch (error) {
    console.error(`Error parsing ${file}:`, error);
  }
});

// Additional definition IDs from HTML elements that are not in the JSON files
const additionalDefinitionIds = [
  'dev-a', 'dev-anchor', 'dev-article', 'dev-aside', 'dev-blockquote',
  'dev-code', 'dev-em', 'dev-figcaption', 'dev-figure', 'dev-footer',
  'dev-h1', 'dev-h2', 'dev-h3', 'dev-h4', 'dev-h5', 'dev-h6',
  'dev-header', 'dev-img', 'dev-li', 'dev-main', 'dev-nav', 'dev-ol',
  'dev-p', 'dev-pre', 'dev-section', 'dev-small', 'dev-span', 'dev-strong',
  'dev-table', 'dev-table-body', 'dev-table-cell', 'dev-table-data-cell',
  'dev-table-head', 'dev-table-header', 'dev-table-row', 'dev-ul',
  'dev-video'
];

// Add additional definition IDs
additionalDefinitionIds.forEach(id => allDefinitionIds.add(id));

// Combine all IDs
const allIds = new Set([...allComponentIds, ...allDefinitionIds]);

// Convert Set to sorted array
const sortedIds = Array.from(allIds).sort();

// Generate the TypeScript file content
const content = `// src/registry/generatedTypes.ts
// Auto-generated file - DO NOT EDIT DIRECTLY
// Run 'npm run generate-types' to regenerate

// Component IDs union type (includes both component IDs and definition IDs)
export type ComponentRegistryId = ${sortedIds.map(id => `'${id}'`).join(' | ')} | string;

// Valid component IDs array
export const VALID_COMPONENT_IDS = [
${sortedIds.map(id => `  '${id}'`).join(',\n')}
] as const;

// Type guard to check if a string is a valid component ID
export function isValidComponentId(id: string): id is ComponentRegistryId {
  return VALID_COMPONENT_IDS.includes(id as any);
}

// Validation function that throws if ID is invalid
export function validateComponentId(id: string): asserts id is ComponentRegistryId {
  if (!isValidComponentId(id)) {
    throw new Error(\`Invalid component ID: "\${id}". Valid IDs are: \${VALID_COMPONENT_IDS.join(', ')}\`);
  }
}

// Generated component definitions placeholder
export const generatedComponentDefinitions = {};
`;

// Write the file
fs.writeFileSync(generatedTypesPath, content, 'utf8');
console.log(`Generated types file with ${sortedIds.length} component IDs (includes ${allComponentIds.size} component IDs and ${allDefinitionIds.size} definition IDs)`);