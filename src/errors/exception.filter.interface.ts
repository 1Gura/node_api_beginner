import {NextFunction, Request, Response} from "express";

export interface IExceptionFilter {
    catch: (err: Error, request: Request, response: Response, next: NextFunction) => void;
}