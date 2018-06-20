const renderUrl = (credentials) => {
  // link name user password
  const {link, user, password} = credentials;
  const authMechanism = 'DEFAULT';

  const url = (user !== '') ?
    `mongodb://${user}:${password}@${link}?authMechanism=${authMechanism}` :
    `mongodb://${link}`;

  return url;
}

export default renderUrl;
