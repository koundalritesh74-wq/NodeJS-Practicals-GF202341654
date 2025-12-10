import path from 'path';

/**
 * Dynamically imports an ES module or JSON file.
 *
 * @param {string} filePath - The path to the file to import (e.g., './my-module.mjs')
 * @returns {Promise<any | null>} A promise that resolves with the module's content
 * or null if the import fails.
 */
async function dynamicImport(filePath) {
  const ext = path.extname(filePath);
  const options = {};

  // 1. Add JSON import assertion ONLY for .json files
  if (ext === '.json') {
    options.assert = { type: 'json' };
  }

  try {
    // 2. Dynamically import the file with or without options
    const module = await import(filePath, options);

    // 3. Graceful fallback for default or named exports:
    // If a default export exists (common for JSON and modules with `export default`),
    // return the default export directly.
    if (module.default !== undefined) {
      return module.default;
    }

    // Otherwise, return the entire module namespace (for named exports)
    return module;

  } catch (error) {
    console.error(`❌ Error dynamically importing ${filePath}:`, error.message);
    // Return null for a graceful failure
    return null;
  }
}

// --- Demonstration ---

async function runDemo() {
  console.log('--- Dynamic Import Test ---');

  // Test 1: ESM with default export
  console.log('\nImporting ./moduleA.mjs (default export)...');
  const moduleA = await dynamicImport('./moduleA.mjs');
  if (moduleA) {
    console.log('✅ Result:', moduleA());
  }

  // Test 2: ESM with named export
  console.log('\nImporting ./moduleB.js (named exports)...');
  const moduleB = await dynamicImport('./moduleB.js');
  if (moduleB) {
    console.log('✅ Result:', moduleB.message);
    console.log('✅ Full Object:', moduleB);
  }

  // Test 3: JSON file
  console.log('\nImporting ./data.json (JSON)...');
  const data = await dynamicImport('./data.json');
  if (data) {
    console.log('✅ Result:', data.user);
    console.log('✅ Full Object:', data);
  }

  // Test 4: Non-existent file
  console.log('\nImporting ./nonexistent.js (Error test)...');
  const nonexistent = await dynamicImport('./nonexistent.js');
  console.log('✅ Result:', nonexistent);
}

runDemo();
