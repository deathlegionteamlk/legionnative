
class ClipboardClass {
  async getString(): Promise<string> {
    try {
      return await navigator.clipboard.readText();
    } catch (error) {
      throw new Error(`Failed to read clipboard: ${error}`);
    }
  }

  async setString(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      throw new Error(`Failed to write clipboard: ${error}`);
    }
  }

  hasString(): Promise<boolean> {
    
    return Promise.resolve(true);
  }
}

export const Clipboard = new ClipboardClass();
