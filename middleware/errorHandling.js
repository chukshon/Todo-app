const errorHandlerMiddleWare = (err, req, res, next) => {
  const defaultError = {
    statusCode: err.statusCode || 500,
    msg: err.message || 'Something went wrong try again',
  }

  if (err.name === 'ValidationError' && err.details) {
    // defaultError.msg = err.message
    defaultError.msg = Object.values(err.details)
      .map((item) => item.message.replaceAll('"', ''))
      .join(', ')
    defaultError.statusCode = 400
  }

  if (err._message === 'User validation failed') {
    // defaultError.msg = err.message
    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',')
    defaultError.statusCode = 400
  }

  if (err.code && err.code === 11000) {
    defaultError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`
    defaultError.statusCode = 400
  }
  if (err.name === 'CastError') {
    defaultError.msg = `No item found with id : ${err.value}`
    defaultError.statusCode = 404
  }

  res.status(defaultError.statusCode).json({ msg: defaultError.msg })
}

export default errorHandlerMiddleWare
