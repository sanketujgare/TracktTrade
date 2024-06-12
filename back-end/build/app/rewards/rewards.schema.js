"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_schema_1 = require("../utility/base.schema");
const rewardSchema = new base_schema_1.BaseSchema({
    rewardName: {
        type: String,
    },
    rewardDescription: {
        type: String,
    },
    pointsRequired: {
        type: Number,
        required: true,
    },
    rewardImage: {
        type: String,
    },
});
