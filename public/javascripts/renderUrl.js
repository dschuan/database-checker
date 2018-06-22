module.exports = (credentials) => {
  // link name user password
  let {link} = credentials;
  const {user, password} = credentials;
  const authMechanism = 'DEFAULT';
  link = link.replace('mongodb://', '');
  const url = (user !== '') ?
    `mongodb://${user}:${password}@${link}?authMechanism=${authMechanism}` :
    `mongodb://${link}`;

  return url;
}
