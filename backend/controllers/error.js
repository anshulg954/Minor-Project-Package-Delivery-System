// Error 404 Page Not Found
exports.getError404 = (req, res, next) => {
    const error = new Error('Page Not Found!!');
    error.statusCode = 404;
    next(error);
}

// An error handler that will be called whenever an error is thrown
exports.getError400 = (error, req, res, next) => {
    const errorData = error.data;
    res.status(error.statusCode||400).json({
        message: error.message,
    });
}

// Bad Request
exports.getError500 = (error, req, res, next) => {
    const errorData = error.data;
    res.status(error.statusCode||500).json({
        message: error.message,
        data: errorData
    });
}

