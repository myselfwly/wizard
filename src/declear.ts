import type express from 'express';
export declare type exReq = express.Request;
export declare type exRes = express.Response;
declare module 'express-session' {
  export interface SessionData {
    [key: string]: any;
  }
}
