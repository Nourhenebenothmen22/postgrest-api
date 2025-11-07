// errorMiddleware.js
const errorHandling = (err, req, res, next) => {
  console.error(err.stack); // log the full stack trace for debugging

  res.status(500).json({
    message: "Something went wrong!", 
    error: err.message              
  });
};

module.exports = errorHandling;
