interface LoggerInterface {
  error(message: string | object): void;
  warn(message: string | object): void;
  info(message: string | object): void;
  debug(message: string | object): void;
}

class SimpleLogger implements LoggerInterface {
  private formatMessage(level: string, data: string | object): void {
    const timestamp = new Date().toISOString();

    if (typeof data === 'object') {
      console.error(`[${timestamp}] ${level}:`, JSON.stringify(data, null, 2));
    } else {
      console.error(`[${timestamp}] ${level}: ${data}`);
    }
  }

  error(message: string | object): void {
    this.formatMessage('ERROR', message);
  }

  warn(message: string | object): void {
    this.formatMessage('WARN', message);
  }

  info(message: string | object): void {
    // En dev, on affiche les info
    if (process.env.NODE_ENV !== 'production') {
      this.formatMessage('INFO', message);
    }
  }

  debug(message: string | object): void {
    // Seulement en dev
    if (process.env.NODE_ENV === 'development') {
      this.formatMessage('DEBUG', message);
    }
  }
}

export const logger = new SimpleLogger();