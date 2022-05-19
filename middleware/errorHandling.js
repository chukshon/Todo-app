const errorHandlerMiddleWare = (err, req, res, next) => {
  const defaultError = {
    statusCode: err.statusCode || 500,
    msg: err.message || 'Something went wrong try again',
  }

  if (err.name === 'ValidationError') {
    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',')
    defaultError.statusCode = 400
  }

  console.log(err.name)
  res.status(defaultError.statusCode).json({ msg: defaultError.msg })
}

export default errorHandlerMiddleWare
