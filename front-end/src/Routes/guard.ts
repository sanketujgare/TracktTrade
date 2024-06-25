const isLoggedIn = () => {
  const token = JSON.parse(localStorage.getItem("user") as string);
  console.log(token);
  if (!token) return false;

  return true;
};

export const grantAccessTo = (permittedRoles: string[]) => {
  const hasAccess = () => {
    const user = JSON.parse(localStorage.getItem("user") as string);
    console.log(user);
    if (!user) return false;
    console.log(user.role);
    // return permittedRoles.includes(JSON.parse(user).role);
    return permittedRoles.includes(user.role);
    // return true;
  };
  // console.log(hasAccess);
  return hasAccess;
};
export const GUARDS = { isLoggedIn, grantAccessTo };
