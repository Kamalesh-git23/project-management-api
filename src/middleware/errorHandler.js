import { success } from "zod";

const errorHandler = (err, req, res, next) => {

    if(err.code === "P2002"){
        return res.status(400).json({
            success: false,
            message: "Duplicate value"
        });
    }

    if(err.code === "P2025"){
        return res.status(404).json({
            success: false,
            message: "Record not found"
        });
    }

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
};

export default errorHandler;