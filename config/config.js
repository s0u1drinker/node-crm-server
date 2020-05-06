module.exports = {
  port: 8081,
  domainName: 'vokkc',
  domainNameExt: 'local',
  ldap: {
    url: 'ldaps://192.168.110.1',
    baseDN: `DC=${this.domainName},DC=${this.domainNameExt}`
  }
}