module.exports =(err,req,res,next)=>{
    const statusCode= err.statusCode || 500;
    console.log('Error Middleware:',err.message);
    res.status (statusCode).json({
        success:false,
        message: err.message ||'Internal Server Error'
    });
}