declare module '@vercel/node' {
  import type { IncomingMessage, ServerResponse } from 'node:http';

  export interface VercelRequest extends IncomingMessage {
    body?: unknown;
    query: Record<string, string | string[]>;
    cookies: Record<string, string>;
  }

  export type VercelResponse<T = unknown> = ServerResponse & {
    status: (statusCode: number) => VercelResponse<T>;
    json: (body: T) => void;
    send: (body: T) => void;
    setHeader: (name: string, value: string) => VercelResponse<T>;
  };
}
