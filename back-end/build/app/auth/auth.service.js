"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = void 0;
const user_service_1 = __importDefault(require("../users/user.service"));
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_responses_1 = require("./auth.responses");
const login = (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_service_1.default.findUser({
            username: credentials.username,
        });
        if (!user) {
            throw auth_responses_1.authResponses.INVALID_CREDENTIALS;
        }
        const didMatch = yield (0, bcrypt_1.compare)(credentials.password, user.password);
        if (!didMatch) {
            throw auth_responses_1.authResponses.INVALID_CREDENTIALS;
        }
        const role = user.role;
        const userId = user._id;
        const _a = user.toObject(), { password } = _a, restOfTheUser = __rest(_a, ["password"]);
        const { JWT_SECRET } = process.env;
        const token = jsonwebtoken_1.default.sign(restOfTheUser, JWT_SECRET || "");
        return { token, role, userId };
    }
    catch (e) {
        throw e;
    }
});
exports.login = login;
const logout = (token) => {
    try {
        const { MANIPULATE_TOKEN } = process.env;
        token = token + MANIPULATE_TOKEN;
        return token;
    }
    catch (e) {
        throw e;
    }
};
exports.logout = logout;
exports.default = {
    login: exports.login,
    logout: exports.logout,
};
