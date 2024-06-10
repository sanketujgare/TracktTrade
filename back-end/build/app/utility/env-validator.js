"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnv = exports.envValidator = void 0;
const dotenv_1 = require("dotenv");
const zod_1 = require("zod");
exports.envValidator = zod_1.z.object({
    PORT: zod_1.z.coerce.number(),
    MONGO_URI: zod_1.z.string(),
    JWT_SECRET: zod_1.z.string(),
});
const validateEnv = () => {
    try {
        (0, dotenv_1.config)();
        exports.envValidator.parse(process.env);
    }
    catch (e) {
        throw {
            message: "ENV NOT CONFIGURED CORRECTLY",
            error: e,
        };
    }
};
exports.validateEnv = validateEnv;
