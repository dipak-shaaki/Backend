const httpError=(message,statusCode)=>{
    const error= new Error(message)
    error.statusCode=statusCode || 500
    return error
}
export {httpError}
