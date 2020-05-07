module.exports = {
  port: 8081,
  db: (address, port, collection) => {
    return `mongodb://${address}:${port}/${collection}`
  }
}