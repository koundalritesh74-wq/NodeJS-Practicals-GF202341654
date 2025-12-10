Programmatic NPM Sandbox Installer

This Node.js script demonstrates how to programmatically create an isolated "sandbox" environment and install a specific version of an NPM package into it. It ensures a deterministic package-lock.json is generated and verifies the installation.

This is useful for tools that need to manage dependencies dynamically or for creating reproducible test environments.

Features

Isolated Environment: Creates a ./sandbox directory with its own node_modules, package.json, and package-lock.json, leaving your main project untouched.

Programmatic Installation: Executes the npm install command using Node.js's child_process module.

Deterministic Lockfile: Installs a specific package version to generate a consistent and predictable package-lock.json.

Verification: Automatically reads the generated lockfile to confirm that the dependency was installed and recorded correctly.

Prerequisites

Node.js (v14 or later recommended)

npm (comes bundled with Node.js)

How to Run

Ensure you have sandbox-installer.js in your project directory.

Run the script from your terminal:

node sandbox-installer.js


What It Does

The script performs the following actions:

Cleans & Prepares: It removes any old ./sandbox directory and creates a fresh one.

Initializes Sandbox: It generates a minimal package.json inside the sandbox, which is a prerequisite for npm to create a lockfile.

Installs Package: It runs npm install <package>@<version> --prefix ./sandbox, which directs npm to perform the installation entirely within the sandbox folder.

Verifies Installation: It reads ./sandbox/package-lock.json to ensure the specified package is listed as a dependency, confirming a successful and verifiable install.

After the script completes, you can inspect the ./sandbox directory to see the isolated installation.
