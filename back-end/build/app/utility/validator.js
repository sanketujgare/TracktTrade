"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = exports.params = exports.body = exports.validator = void 0;
const validator = (sourse, schema, passthrough = false) => (req, res, next) => {
    try {
        if (passthrough) {
            req[sourse] = schema.passthrough().parse(req[sourse]);
        }
        req[sourse] = schema.parse(req[sourse]);
        next();
    }
    catch (e) {
        next({
            statusCOde: 400,
            message: "BAD REQUEST",
            error: e,
        });
    }
};
exports.validator = validator;
const body = (schema, passthrough = false) => (0, exports.validator)("body", schema, passthrough);
exports.body = body;
const params = (schema, passthrough = false) => (0, exports.validator)("params", schema, passthrough);
exports.params = params;
const query = (schema, passthrough = false) => (0, exports.validator)("query", schema, passthrough);
exports.query = query;
