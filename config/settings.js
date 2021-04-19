module.exports = {
  port: 8081,
  db: (address, port, collection) => {
    return `mongodb://${address}:${port}/${collection}`
  },
  session: {
    secret: 'There is only war...',
    key: 'crm-sid'
  }
}