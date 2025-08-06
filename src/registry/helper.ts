import { ComponentDefinition } from "@/lib/dev-container";

export function validateUniqueIds(definitions: ComponentDefinition[]): {
  isValid: boolean;
  duplicates: string[];
  report: string;
} {
  const idCounts = new Map<string, number>();
  const duplicates: string[] = [];

  // Count occurrences of each ID
  definitions.forEach(def => {
    const count = idCounts.get(def.id) || 0;
    idCounts.set(def.id, count + 1);
  });

  // Find duplicates
  idCounts.forEach((count, id) => {
    if (count > 1) {
      duplicates.push(id);
    }
  });

  const report = duplicates.length > 0
    ? `❌ Found ${duplicates.length} duplicate ID(s): ${duplicates.join(', ')}`
    : '✅ All component IDs are unique';

  return {
    isValid: duplicates.length === 0,
    duplicates,
    report
  };
}
