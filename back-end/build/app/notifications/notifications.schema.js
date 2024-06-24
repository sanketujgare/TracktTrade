"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const base_schema_1 = require("../utility/base.schema");
const notificationSchema = new base_schema_1.BaseSchema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    viewedBy: [
        {
            type: mongoose_1.Types.ObjectId,
        },
    ],
});
const notificationModel = (0, mongoose_1.model)("notifications", notificationSchema);
exports.default = notificationModel;
