module.exports = {
  domainName: '@vokkc.local',
  testUser: function () {
    return 'john.smith' + this.domainName
  },
  ldap: {
    url:      'ldap://192.168.110.1',
    baseDN:   'dc=vokkc,dc=local'
  }
}