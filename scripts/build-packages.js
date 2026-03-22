#!/usr/bin/env node
import { execSync } from 'child_process';
import { existsSync } from 'fs';

// Build packages sequentially to reduce memory usage
const packages = ['core', 'viewer', 'editor'];

for (const pkg of packages) {
  const pkgPath = `packages/${pkg}`;
  const tsconfigPath = `${pkgPath}/tsconfig.json`;
  
  if (existsSync(tsconfigPath)) {
    console.log(`Building ${pkg}...`);
    try {
      execSync(`cd ${pkgPath} && npx tsc --build`, { 
        stdio: 'inherit',
        env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=512' }
      });
      console.log(`✓ Built ${pkg}`);
    } catch (err) {
      console.error(`✗ Failed to build ${pkg}`);
      process.exit(1);
    }
  }
}

console.log('All packages built successfully!');
