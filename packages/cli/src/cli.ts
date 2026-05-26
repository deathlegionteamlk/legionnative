#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { createApp } from './commands/create';
import { startDevServer } from './commands/start';
import { buildApp } from './commands/build';
import { deployApp } from './commands/deploy';
import { doctorCheck } from './commands/doctor';
import { generateScreen } from './commands/generate';
import pkg from '../package.json';

const program = new Command();

program
  .name('legion')
  .description('LEGION Native CLI — Build cross-platform mobile apps')
  .version(pkg.version);

program
  .command('create')
  .description('Create a new Legion Native project')
  .argument('<name>', 'Project name')
  .option('-t, --template <type>', 'Template type (blank, tabs, drawer)', 'blank')
  .option('--typescript', 'Use TypeScript', true)
  .option('--npm', 'Use npm as package manager')
  .option('--yarn', 'Use yarn as package manager')
  .option('--pnpm', 'Use pnpm as package manager')
  .action(async (name: string, options: any) => {
    const spinner = ora(`Creating ${chalk.cyan(name)}...`).start();
    
    try {
      await createApp(name, options);
      spinner.succeed(chalk.green(`Project ${name} created successfully!`));
      
      console.log('\nNext steps:');
      console.log(`  ${chalk.cyan(`cd ${name}`)}`);
      console.log(`  ${chalk.cyan('legion start')}`);
    } catch (error: any) {
      spinner.fail(chalk.red(`Failed to create project: ${error.message}`));
      process.exit(1);
    }
  });

program
  .command('start')
  .description('Start development server with hot reload')
  .option('-p, --port <port>', 'Development server port', '8081')
  .option('-h, --host <host>', 'Development server host', 'localhost')
  .option('--no-hmr', 'Disable hot module replacement')
  .option('--clear', 'Clear metro bundler cache')
  .action(async (options: any) => {
    const spinner = ora('Starting development server...').start();
    
    try {
      await startDevServer(options);
      spinner.succeed(chalk.green('Development server started!'));
    } catch (error: any) {
      spinner.fail(chalk.red(`Failed to start server: ${error.message}`));
      process.exit(1);
    }
  });

program
  .command('build')
  .description('Build application for production')
  .argument('<platform>', 'Target platform (android, ios, web)')
  .option('--release', 'Build release version')
  .option('--debug', 'Build debug version')
  .option('-o, --output <path>', 'Output directory')
  .option('--bundle-analyzer', 'Analyze bundle size')
  .action(async (platform: string, options: any) => {
    const validPlatforms = ['android', 'ios', 'web'];
    
    if (!validPlatforms.includes(platform)) {
      console.error(chalk.red(`Invalid platform: ${platform}`));
      console.error(`Valid platforms: ${validPlatforms.join(', ')}`);
      process.exit(1);
    }
    
    const spinner = ora(`Building for ${chalk.cyan(platform)}...`).start();
    
    try {
      await buildApp(platform, options);
      spinner.succeed(chalk.green(`Build completed for ${platform}!`));
    } catch (error: any) {
      spinner.fail(chalk.red(`Build failed: ${error.message}`));
      process.exit(1);
    }
  });

program
  .command('deploy')
  .description('Deploy application updates')
  .option('-e, --env <environment>', 'Deployment environment', 'production')
  .option('--channel <channel>', 'Release channel')
  .option('--message <message>', 'Deployment message')
  .action(async (options: any) => {
    const spinner = ora('Deploying application...').start();
    
    try {
      await deployApp(options);
      spinner.succeed(chalk.green('Deployment successful!'));
    } catch (error: any) {
      spinner.fail(chalk.red(`Deployment failed: ${error.message}`));
      process.exit(1);
    }
  });

program
  .command('doctor')
  .description('Check your environment for potential issues')
  .option('--verbose', 'Show detailed output')
  .action(async (options: any) => {
    const spinner = ora('Checking environment...').start();
    
    try {
      const report = await doctorCheck(options);
      spinner.succeed(chalk.green('Environment check complete!'));
      
      if (report.issues.length === 0) {
        console.log(chalk.green('\n✓ No issues found! Your environment is ready.'));
      } else {
        console.log(chalk.yellow(`\n⚠ Found ${report.issues.length} issue(s):\n`));
        report.issues.forEach((issue: any, i: number) => {
          console.log(`  ${i + 1}. ${issue.message}`);
          if (issue.solution) {
            console.log(`     Solution: ${issue.solution}`);
          }
        });
      }
    } catch (error: any) {
      spinner.fail(chalk.red(`Doctor check failed: ${error.message}`));
      process.exit(1);
    }
  });

program
  .command('generate')
  .description('Generate boilerplate code')
  .addCommand(
    new Command('screen')
      .description('Generate a new screen component')
      .argument('<name>', 'Screen name')
      .option('-p, --path <path>', 'Output path')
      .action(async (name: string, options: any) => {
        const spinner = ora(`Generating screen ${chalk.cyan(name)}...`).start();
        
        try {
          await generateScreen(name, options);
          spinner.succeed(chalk.green(`Screen ${name} generated!`));
        } catch (error: any) {
          spinner.fail(chalk.red(`Generation failed: ${error.message}`));
          process.exit(1);
        }
      })
  );

program
  .command('info')
  .description('Display environment information')
  .action(() => {
    console.log('\n' + chalk.bold('LEGION Native Environment Info:'));
    console.log('=================================\n');
    console.log(`CLI Version: ${chalk.cyan(pkg.version)}`);
    console.log(`Node Version: ${chalk.cyan(process.version)}`);
    console.log(`Platform: ${chalk.cyan(process.platform)} ${process.arch}`);
    console.log(`Working Directory: ${chalk.cyan(process.cwd())}\n`);
  });

program.parse(process.argv);
