import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodRawShape } from "zod";

export const validator =
    <T extends ZodRawShape>(
        sourse: "body" | "params" | "query",
        schema: ZodObject<T>,
        passthrough: boolean = false
    ) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            if (passthrough) {
                req[sourse] = schema.passthrough().parse(req[sourse]);
            }

            req[sourse] = schema.parse(req[sourse]);
            next();
        } catch (e) {
            next({
                statusCOde: 400,
                message: "BAD REQUEST",
                error: e,
            });
        }
    };

export const body = <T extends ZodRawShape>(
    schema: ZodObject<T>,
    passthrough: boolean = false
) => validator("body", schema, passthrough);

export const params = <T extends ZodRawShape>(
    schema: ZodObject<T>,
    passthrough: boolean = false
) => validator("params", schema, passthrough);

export const query = <T extends ZodRawShape>(
    schema: ZodObject<T>,
    passthrough: boolean = false
) => validator("query", schema, passthrough);
