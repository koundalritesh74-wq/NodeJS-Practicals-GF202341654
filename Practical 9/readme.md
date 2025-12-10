This script works by:

Starting at the root node_modules directory.

Recursively scanning every directory.

Identifying packages by looking for package.json files.

Correctly handling scoped packages (e.g., @angular/core).

Checking for common license file names (like LICENSE, LICENSE.md, etc.) in each package directory.

Collecting a unique list of all packages found (by name and version).

Printing a final report of all packages that appear to be missing a license file.
