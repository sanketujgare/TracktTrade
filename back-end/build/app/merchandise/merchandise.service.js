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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMerchandise = exports.addMerchandise = void 0;
const merchandise_repo_1 = __importDefault(require("./merchandise.repo"));
const merchandise_responses_1 = require("./merchandise.responses");
const addMerchandise = (merchandise, manufacturerId) => {
    try {
        merchandise.createdBy = manufacturerId;
        const newMerchandise = merchandise_repo_1.default.insertOne(merchandise);
        if (!newMerchandise)
            throw merchandise_responses_1.merchandiseResponses.CAN_NOT_ADD_MERCHANDISE;
        return merchandise_responses_1.merchandiseResponses.MERCHANDISE_ADDED;
    }
    catch (e) {
        throw e;
    }
};
exports.addMerchandise = addMerchandise;
const getAllMerchandise = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const merchandise = yield merchandise_repo_1.default.getAllMerchandise();
        if (!merchandise)
            throw merchandise_responses_1.merchandiseResponses.MERCHANDISE_NOT_FOUND;
        return merchandise;
    }
    catch (e) {
        throw e;
    }
});
exports.getAllMerchandise = getAllMerchandise;
exports.default = {
    addMerchandise: exports.addMerchandise,
    getAllMerchandise: exports.getAllMerchandise,
};
