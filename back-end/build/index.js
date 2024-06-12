"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_validator_1 = require("./app/utility/env-validator");
(0, env_validator_1.validateEnv)();
const app_1 = require("./app/app");
(0, app_1.startServer)();
