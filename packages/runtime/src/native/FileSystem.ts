
import type { FileInfo } from './types';

class FileSystemClass {
  async readDirectory(path: string): Promise<FileInfo[]> {
    
    throw new Error('FileSystem.readDirectory requires native implementation');
  }

  async readFile(path: string, encoding: 'utf8' | 'base64' = 'utf8'): Promise<string> {
    throw new Error('FileSystem.readFile requires native implementation');
  }

  async writeFile(path: string, content: string, options?: { encoding?: string }): Promise<void> {
    throw new Error('FileSystem.writeFile requires native implementation');
  }

  async deleteFile(path: string): Promise<void> {
    throw new Error('FileSystem.deleteFile requires native implementation');
  }

  async moveFile(from: string, to: string): Promise<void> {
    throw new Error('FileSystem.moveFile requires native implementation');
  }

  async copyFile(from: string, to: string): Promise<void> {
    throw new Error('FileSystem.copyFile requires native implementation');
  }

  async exists(path: string): Promise<boolean> {
    throw new Error('FileSystem.exists requires native implementation');
  }

  async stat(path: string): Promise<FileInfo> {
    throw new Error('FileSystem.stat requires native implementation');
  }

  async mkdir(path: string, options?: { intermediates?: boolean }): Promise<void> {
    throw new Error('FileSystem.mkdir requires native implementation');
  }

  DocumentDirectoryPath: string = '';
  CacheDirectoryPath: string = '';
  ExternalDirectoryPath: string = '';
  ExternalStorageDirectoryPath: string = '';
  TemporaryDirectoryPath: string = '';
  LibraryDirectoryPath: string = '';
  MainBundlePath: string = '';
}

export const FileSystem = new FileSystemClass();
