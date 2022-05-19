const notFoundMiddleware = (req, res) => {
  res.status(404).send('Route Not found')
}

export default notFoundMiddleware
