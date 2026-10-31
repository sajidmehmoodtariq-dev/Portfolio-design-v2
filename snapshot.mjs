// create_snapshot.mjs

import fs from 'fs/promises';
import path from 'path';

// --- CONFIGURATION ---
const ROOT_DIRECTORY = '.';
const OUTPUT_FILE = 'project_snapshot.txt';

// Critical config files to always prepend at the top for context
const CRITICAL_FILES = [
  'package.json', 'tsconfig.json', 'next.config.mjs', 
  'next.config.js', 'postcss.config.js', 'tailwind.config.js'
];

// -- 🚫 EXCLUSIONS --

// Ignore by exact name (applies to files and folders EVERYWHERE in the tree)
const IGNORE_NAMES = [
  'node_modules', '.git', '.next', 'out', 'dist', 'build', '.vscode', '.idea',
  'pnpm-lock.yaml', 'package-lock.json', 'yarn.lock',
  '.env', '.env.local', '.env.production', '.env.development',
  OUTPUT_FILE,
  '__pycache__',
  'modules',
  'photos', 
  'records',
  '.gitignore'
];

// Ignore by relative path from the root (matches specific folders or files)
// Always use forward slashes (e.g., 'public/images')
const IGNORE_PATHS = [
  'public/images',
  'public/fonts'
];


// -- ✅ INCLUSIONS --

// Include files by their extension
const INCLUDE_EXTENSIONS = [
  '.js', '.ts', '.jsx', '.tsx',    // Scripts
  '.json', '.html',                // Configs
  '.scss', '.css', '.module.scss', '.tsx', // Styles
  '.md', '.mdx',                   // Documentation
  '.mjs', '.cjs', '.webmanifest',  // JS Modules
  '.svg', '.py', '.go', '.rs',     // Code / SVG
  '.java', '.cpp', '.c', '.h', '.asm'
];

// Include specific files by exact name (useful for files without extensions)
const INCLUDE_FILES = [
  'Dockerfile',
  'Makefile',
  '.prettierrc',
  '.eslintrc.json'
];

// Force include ALL files within specific directory paths (ignores extension checks)
// Always use forward slashes (e.g., 'src/special_folder')
const INCLUDE_PATHS = [
  // 'docs/raw_assets'
];

// --- SCRIPT LOGIC ---

// Helper function to determine if a file/folder should be ignored
function isIgnored(name, relativePath) {
  if (IGNORE_NAMES.includes(name)) return true;
  
  for (const ignorePath of IGNORE_PATHS) {
    // Check if it's the exact path or a sub-path of the ignored path
    if (relativePath === ignorePath || relativePath.startsWith(ignorePath + '/')) {
      return true;
    }
  }
  return false;
}

// Helper function to determine if a file should be included in the source dump
function isIncluded(name, relativePath) {
  const ext = path.extname(name);
  if (INCLUDE_EXTENSIONS.includes(ext)) return true;
  if (INCLUDE_FILES.includes(name)) return true;
  
  for (const includePath of INCLUDE_PATHS) {
    if (relativePath === includePath || relativePath.startsWith(includePath + '/')) {
      return true;
    }
  }
  return false;
}

async function generateSnapshot() {
  console.log('🚀 Starting to generate project snapshot...');
  try {
    // Clear the output file if it exists, or create it.
    await fs.writeFile(OUTPUT_FILE, '');

    // 1. Write a header
    await appendToOutput(`--- Project Snapshot ---`);
    await appendToOutput(`--- Generated on: ${new Date().toUTCString()} ---\n`);

    // 2. Add critical configuration files first for context
    await appendToOutput(`\n\n=============== 📌 CRITICAL CONFIG FILES ===============\n`);
    for (const file of CRITICAL_FILES) {
      try {
        const content = await fs.readFile(path.join(ROOT_DIRECTORY, file), 'utf-8');
        await appendToOutput(`\n--- FILE: ${file} ---\n`);
        await appendToOutput(content);
        await appendToOutput(`\n--- END OF FILE: ${file} ---\n`);
      } catch (error) {
        if (error.code !== 'ENOENT') {
            console.warn(`⚠️  Could not read critical file: ${file}`);
        }
      }
    }

    // 3. Generate and append the directory tree
    await appendToOutput(`\n\n=============== 🌳 DIRECTORY STRUCTURE ===============\n`);
    const tree = await generateTree(ROOT_DIRECTORY, '');
    await appendToOutput(tree);

    // 4. Append the content of all other relevant files
    await appendToOutput(`\n\n=============== 📄 SOURCE CODE & FILES ===============\n`);
    await processDirectory(ROOT_DIRECTORY);

    console.log(`✅ Success! Project snapshot saved to ${OUTPUT_FILE}`);

  } catch (error) {
    console.error('❌ An error occurred while generating the snapshot:', error);
  }
}

async function appendToOutput(content) {
  await fs.appendFile(OUTPUT_FILE, content + '\n');
}

async function generateTree(dir, prefix) {
  let treeString = '';
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    // Filter out ignored items
    const filteredEntries = entries.filter(entry => {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(ROOT_DIRECTORY, fullPath).replace(/\\/g, '/');
      return !isIgnored(entry.name, relativePath);
    });

    for (const [index, entry] of filteredEntries.entries()) {
      const connector = index === filteredEntries.length - 1 ? '└── ' : '├── ';
      treeString += `${prefix}${connector}${entry.name}\n`;
      
      if (entry.isDirectory()) {
        const newPrefix = prefix + (index === filteredEntries.length - 1 ? '    ' : '│   ');
        const fullPath = path.join(dir, entry.name);
        treeString += await generateTree(fullPath, newPrefix);
      }
    }
  } catch (error) {
    // Ignore errors for directories we can't read (e.g., permissions)
  }
  return treeString;
}

async function processDirectory(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      // Normalize slashes for consistency across OSes (Windows/Mac/Linux)
      const relativePath = path.relative(ROOT_DIRECTORY, fullPath).replace(/\\/g, '/');

      // Check Exclusions
      if (isIgnored(entry.name, relativePath)) {
        continue;
      }

      if (entry.isDirectory()) {
        await processDirectory(fullPath);
      } else if (entry.isFile() && isIncluded(entry.name, relativePath)) {
        try {
          const content = await fs.readFile(fullPath, 'utf-8');
          await appendToOutput(`\n--- FILE: ${relativePath} ---`);
          await appendToOutput(content);
          await appendToOutput(`\n--- END OF FILE: ${relativePath} ---\n`);
        } catch (readError) {
          console.warn(`⚠️  Could not read file: ${relativePath}`);
        }
      }
    }
  } catch (error) {
    // Ignore errors for directories we can't read
  }
}

// Run the main function
generateSnapshot();