
export interface CreateOptions {
  template?: string;
  typescript?: boolean;
  npm?: boolean;
  yarn?: boolean;
  pnpm?: boolean;
}

export interface StartOptions {
  port?: string;
  host?: string;
  hmr?: boolean;
  clear?: boolean;
}

export interface BuildOptions {
  platform: 'android' | 'ios' | 'web';
  release?: boolean;
  debug?: boolean;
  output?: string;
  bundleAnalyzer?: boolean;
}

export interface DeployOptions {
  env?: string;
  channel?: string;
  message?: string;
}

export interface DoctorReport {
  issues: DoctorIssue[];
  info: Record<string, any>;
}

export interface DoctorIssue {
  severity: 'error' | 'warning' | 'info';
  category: string;
  message: string;
  solution?: string;
}

export interface GenerateOptions {
  path?: string;
}
