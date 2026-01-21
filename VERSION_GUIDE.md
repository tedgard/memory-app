# Version Update Guide

## How to Update the App Version

The version number is displayed in the footer of the app and automatically reads from `package.json`.

### Steps to Update Version

1. **Edit package.json**
   ```bash
   # Open package.json and update the version field
   "version": "1.0.0"  →  "version": "1.1.0"
   ```

2. **Version Number Format** (Semantic Versioning)
   - **Major.Minor.Patch** (e.g., 1.0.0)
   - **Major**: Breaking changes or complete rewrites (1.0.0 → 2.0.0)
   - **Minor**: New features, backwards-compatible (1.0.0 → 1.1.0)
   - **Patch**: Bug fixes, small improvements (1.0.0 → 1.0.1)

3. **Build and Deploy**
   ```bash
   npm run build
   ```

4. **Commit the Version Change**
   ```bash
   git add package.json
   git commit -m "Bump version to 1.1.0"
   git push
   ```

### Examples

**Adding a new exercise:**
```
1.0.0 → 1.1.0 (New feature - minor version)
```

**Fixing a bug:**
```
1.0.0 → 1.0.1 (Bug fix - patch version)
```

**Complete redesign:**
```
1.0.0 → 2.0.0 (Breaking changes - major version)
```

### Where the Version Appears

- Footer on all pages: "v1.0.0"
- Automatically updated from package.json
- No code changes needed - just update package.json!

### Current Version

**v1.0.0** - Initial release with Dual N-Back exercise
