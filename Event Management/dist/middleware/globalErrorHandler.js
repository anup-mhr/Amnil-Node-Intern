"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendErrorPro = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    else {
        //this indicates the bug is in 3rd party or database
        res.status(500).json({
            status: "error",
            message: "Something went wrong!",
        });
    }
};
const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    sendErrorPro(err, res);
    next();
};
exports.default = globalErrorHandler;
