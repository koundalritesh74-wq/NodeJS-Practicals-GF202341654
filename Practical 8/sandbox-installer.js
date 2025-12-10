import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';

// --- Configuration ---
const SANDBOX_DIR = path.join(process.cwd(), 'sandbox');
const PACKAGE_TO_INSTALL = 'chalk';
const PACKAGE_VERSION = '4.1.2'; // A specific, older version for determinism
const fullPackageId = `${PACKAGE_TO_INSTALL}@${PACKAGE_VERSION}`;

/**
 * Executes a shell command and streams its output, returning a promise.
 * @param {string} command - The command to execute (e.g., 'npm').
 * @param {string[]} args - The arguments for the command.
 * @param {import('child_process').SpawnOptions} options - Spawn options.
 * @returns {Promise<void>} A promise that resolves on successful exit, rejects on error.
 */
function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    console.log(`\n▶️  Running: ${command} ${args.join(' ')}`);
    const child = spawn(command, args, { stdio: 'pipe', ...options });

    // Stream stdout and stderr to the parent console
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);

    child.on('error', (error) => {
      reject(new Error(`Failed to start subprocess. ${error.message}`));
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Process exited with error code: ${code}`));
      }
    });
  });
}

/**
 * Main script logic
 */
async function main() {
  try {
    // --- 1. Setup the Sandbox Environment ---
    console.log(`--- Step 1: Preparing the sandbox at ${SANDBOX_DIR} ---`);
    // Clean up any previous sandbox to ensure a fresh start
    await fs.rm(SANDBOX_DIR, { recursive: true, force: true });
    // Create the empty sandbox directory
    await fs.mkdir(SANDBOX_DIR, { recursive: true });
    console.log('✅ Sandbox directory created.');

    // Create a minimal package.json, which is required by npm to generate a lockfile
    const minimalPackageJson = {
      name: 'sandbox-project',
      version: '1.0.0',
      description: 'An isolated environment for programmatic npm install.',
    };
    await fs.writeFile(
      path.join(SANDBOX_DIR, 'package.json'),
      JSON.stringify(minimalPackageJson, null, 2)
    );
    console.log('✅ Minimal package.json created.');

    // --- 2. Install the Package Programmatically ---
    console.log(`\n--- Step 2: Installing ${fullPackageId} into the sandbox ---`);
    // Use the '--prefix' flag to target the sandbox directory.
    // This is the key to isolating the installation.
    await runCommand('npm', ['install', fullPackageId, '--prefix', SANDBOX_DIR, '--no-save']);
    console.log(`\n✅ ${fullPackageId} installed successfully.`);

    // --- 3. Verify the Lockfile and Checksum ---
    console.log('\n--- Step 3: Verifying the installation ---');
    const lockfilePath = path.join(SANDBOX_DIR, 'package-lock.json');
    const lockfileContent = await fs.readFile(lockfilePath, 'utf8');
    const packageLock = JSON.parse(lockfileContent);

    // In modern package-lock.json (v2/v3), the root package info is under `packages['']`
    const rootPackageInfo = packageLock.packages[''];
    if (!rootPackageInfo) {
      throw new Error("Could not find root package entry ('') in package-lock.json.");
    }

    // The checksum for the installed dependency tree is the `integrity` hash.
    const installedChecksum = rootPackageInfo.dependencies[PACKAGE_TO_INSTALL];

    if (installedChecksum) {
      console.log(`✅ Verification successful!`);
      console.log(`   - Lockfile found at: ${lockfilePath}`);
      console.log(`   - Dependency '${PACKAGE_TO_INSTALL}' is listed in lockfile.`);
      console.log(`   - The installed package checksum can be traced from here.`);
    } else {
      throw new Error(`Verification failed: Could not find checksum for '${PACKAGE_TO_INSTALL}' in lockfile.`);
    }

    console.log(`\n🎉 Sandbox setup complete. You can inspect the generated files in the './sandbox' directory.`);

  } catch (error) {
    console.error('\n❌ An error occurred during the script execution:');
    console.error(error.message);
    process.exit(1);
  }
}

main();
