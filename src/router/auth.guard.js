import { Auth } from 'aws-amplify';

export default async (to, from, next) => {
  const isProtected = to.matched.some(route => route.meta.protected);
  const loggedIn = await Auth.currentUserInfo();
  if (isProtected && !loggedIn) {
    next("/");
    return;
  }
  next();
}