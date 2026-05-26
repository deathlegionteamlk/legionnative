
import os from 'os';
import { execSync } from 'child_process';
import type { DoctorReport, DoctorIssue } from '../types';

export async function doctorCheck(options: any = {}): Promise<DoctorReport> {
  const issues: DoctorIssue[] = [];
  const info: Record<string, any> = {};
  
  
  const nodeVersion = process.version;
  info.nodeVersion = nodeVersion;
  
  const [major] = nodeVersion.slice(1).split('.').map(Number);
  if (major < 18) {
    issues.push({
      severity: 'error',
      category: 'Node.js',
      message: `Node.js version ${nodeVersion} is too old. Requires >= 18.0.0`,
      solution: 'Upgrade Node.js to version 18 or higher',
    });
  }
  
  
  const totalMem = os.totalmem() / (1024 * 1024 * 1024);
  info.memory = `${totalMem.toFixed(2)} GB`;
  
  if (totalMem < 4) {
    issues.push({
      severity: 'warning',
      category: 'System',
      message: `Low system memory: ${totalMem.toFixed(2)} GB`,
      solution: 'Consider upgrading RAM for better performance',
    });
  }
  
  
  info.platform = os.platform();
  info.arch = os.arch();
  info.cpus = os.cpus().length;
  
  
  try {
    execSync('git --version', { stdio: 'ignore' });
    info.git = 'installed';
  } catch {
    issues.push({
      severity: 'warning',
      category: 'Tools',
      message: 'Git is not installed',
      solution: 'Install Git from https:
    });
  }
  
  return { issues, info };
}
