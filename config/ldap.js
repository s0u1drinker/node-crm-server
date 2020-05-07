module.exports = {
  domainName: 'vokkc',
  domainNameExt: 'local',
  ldap: {
    url: 'ldap://192.168.110.1',
    baseDN: `dc=${this.domainName},dc=${this.domainNameExt}`
  }
}