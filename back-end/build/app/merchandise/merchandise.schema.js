"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const base_schema_1 = require("../utility/base.schema");
const merchandiseSchema = new base_schema_1.BaseSchema({
    merchandiseName: {
        type: String,
    },
    merchandiseDescription: {
        type: String,
    },
    pointsRequired: {
        type: Number,
        required: true,
    },
    merchandiseImage: {
        type: String,
    },
});
const merchandiseModel = (0, mongoose_1.model)("Merchandise", merchandiseSchema);
exports.default = merchandiseModel;
