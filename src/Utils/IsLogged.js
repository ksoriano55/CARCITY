export const isLogged = () => {
    var token = localStorage.getItem('Token')
    if (token && token !== '') {
      return true
    }
    return false
}