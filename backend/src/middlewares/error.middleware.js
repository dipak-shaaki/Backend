export default function errorMiddleware(err,req,res,next){
  const statusCode=err.statusCode || 500;
  console.log('Error occured:',err.message);
  res.status(statusCode).json({success:false,message:err.message || 'Internal Server Error'});
}