import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { execa } from 'execa';
import prompts from 'prompts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export interface CreateOptions {
  template?: string;
  typescript?: boolean;
  npm?: boolean;
  yarn?: boolean;
  pnpm?: boolean;
}

export async function createApp(name: string, options: CreateOptions = {}): Promise<void> {
  const targetDir = path.resolve(process.cwd(), name);
  
  if (await fs.pathExists(targetDir)) {
    const { overwrite } = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: `Directory "${name}" already exists. Overwrite?`,
      initial: false,
    });
    
    if (!overwrite) {
      throw new Error('Operation cancelled');
    }
    
    await fs.remove(targetDir);
  }
  
  await fs.ensureDir(targetDir);
  await createProjectFiles(targetDir, name, options);
  
  const packageManager = getPackageManager(options);
  await installDependencies(targetDir, packageManager);
}

async function createProjectFiles(targetDir: string, name: string, options: CreateOptions): Promise<void> {
  const template = options.template || 'blank';
  
  const packageJson = {
    name: name.toLowerCase().replace(/\s+/g, '-'),
    version: '0.1.0',
    private: true,
    scripts: {
      start: 'legion start',
      build: 'legion build',
      deploy: 'legion deploy',
      test: 'vitest',
      lint: 'eslint .',
    },
    dependencies: {
      '@legion/runtime': '^0.1.0',
      react: '^18.2.0',
      'react-dom': '^18.2.0',
    },
    devDependencies: {
      '@legion/cli': '^0.1.0',
      typescript: '^5.3.0',
      vitest: '^1.0.0',
      eslint: '^8.55.0',
    },
  };
  
  await fs.writeJson(path.join(targetDir, 'package.json'), packageJson, { spaces: 2 });
  
  const tsConfig = {
    compilerOptions: {
      target: 'ES2022',
      module: 'ESNext',
      lib: ['ES2022', 'DOM'],
      jsx: 'react-jsx',
      strict: true,
      moduleResolution: 'bundler',
      allowSyntheticDefaultImports: true,
      esModuleInterop: true,
      skipLibCheck: true,
      paths: {
        '@/*': ['./src/*'],
      },
    },
    include: ['src/**/*'],
    exclude: ['node_modules'],
  };
  
  await fs.writeJson(path.join(targetDir, 'tsconfig.json'), tsConfig, { spaces: 2 });
  
  await fs.ensureDir(path.join(targetDir, 'src'));
  await fs.ensureDir(path.join(targetDir, 'src/screens'));
  await fs.ensureDir(path.join(targetDir, 'src/components'));
  await fs.ensureDir(path.join(targetDir, 'src/hooks'));
  await fs.ensureDir(path.join(targetDir, 'src/utils'));
  await fs.ensureDir(path.join(targetDir, 'assets'));
  
  const appContent = generateAppContent(template);
  await fs.writeFile(path.join(targetDir, 'src/App.tsx'), appContent);
  
  const indexHtml = generateIndexHtml(name);
  await fs.writeFile(path.join(targetDir, 'index.html'), indexHtml);
  
  const configContent = `
export default {
  appId: 'com.legion.${name.toLowerCase()}',
  appName: '${name}',
  version: '1.0.0',
  sdkVersion: '0.1.0',
  platforms: ['android', 'ios', 'web'],
  entryPoint: './src/App.tsx',
  assets: ['./assets'],
};
`;
  await fs.writeFile(path.join(targetDir, 'legion.config.js'), configContent);
  
  const readme = `# ${name}

A LEGION Native application by DEMO X HEXA × Death Legion Team.

## Getting Started

\`\`\`bash
npm start
npm run build
npm run deploy
\`\`\`

## Project Structure

\`\`\`
${name}/
├── src/
│   ├── App.tsx
│   ├── screens/
│   ├── components/
│   ├── hooks/
│   └── utils/
├── assets/
├── index.html
├── package.json
├── tsconfig.json
└── legion.config.js
\`\`\`
`;
  await fs.writeFile(path.join(targetDir, 'README.md'), readme);
  
  const gitignore = `
node_modules/
dist/
build/
*.local
.DS_Store
.env
.env.local
`;
  await fs.writeFile(path.join(targetDir, '.gitignore'), gitignore);
}

function generateAppContent(template: string): string {
  if (template === 'tabs') {
    return `import { View, Text, Button } from '@legion/runtime';
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Welcome to Legion Native!</Text>
      <Text style={{ marginVertical: 20 }}>Count: {count}</Text>
      <Button title="Increment" onPress={() => setCount(count + 1)} />
    </View>
  );
}
`;
  }
  
  return `import { View, Text, Button } from '@legion/runtime';
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Welcome to Legion Native!
      </Text>
      <Text style={{ fontSize: 16, color: '#666', marginBottom: 24 }}>
        Build fast, cross-platform mobile apps
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <Button 
          title="Decrement" 
          onPress={() => setCount(Math.max(0, count - 1))}
          color="#ff4444"
        />
        <Text style={{ fontSize: 32, fontWeight: 'bold', minWidth: 40, textAlign: 'center' }}>
          {count}
        </Text>
        <Button 
          title="Increment" 
          onPress={() => setCount(count + 1)}
        />
      </View>
    </View>
  );
}
`;
}

function generateIndexHtml(name: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="theme-color" content="#007AFF">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <title>${name}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    html, body, #root {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/App.tsx"></script>
</body>
</html>
`;
}

function getPackageManager(options: CreateOptions): string {
  if (options.pnpm) return 'pnpm';
  if (options.yarn) return 'yarn';
  if (options.npm) return 'npm';
  
  if (process.env.npm_config_user_agent?.includes('pnpm')) return 'pnpm';
  if (process.env.npm_config_user_agent?.includes('yarn')) return 'yarn';
  
  return 'npm';
}

async function installDependencies(targetDir: string, packageManager: string): Promise<void> {
  const installCmd = packageManager === 'yarn' ? 'add' : 'install';
  
  await execa(packageManager, [installCmd], {
    cwd: targetDir,
    stdio: 'inherit',
  });
}
