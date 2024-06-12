import { Schema, SchemaDefinitionProperty } from "mongoose";

export class BaseSchema extends Schema {
    constructor(schema: { [key: string]: SchemaDefinitionProperty }) {
        super({
            ...schema,
            isDeleted: {
                type: Boolean,
                require: false,
            },
            createdAt: {
                type: Date,
                default: Date.now(),
            },
            updatedAt: {
                type: Date,
                default: Date.now(),
            },
            updatedBy: {
                require: true,
                type: Schema.Types.ObjectId,
                ref: "User",
            },
            createdBy: {
                require: true,
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        });
    }
}
