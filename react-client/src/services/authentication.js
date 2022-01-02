export const authenticate = (setLoggedIn) => {
  if (localStorage.getItem('token')) {
    setLoggedIn('true')
  }
}
