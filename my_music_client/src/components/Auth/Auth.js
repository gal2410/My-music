var isAuthenticated = null; 
const Auth = {
    getAutenticate(){
        if( isAuthenticated == null ){
            isAuthenticated = false;
        }
        return isAuthenticated;
    },
    authenticate() {
      isAuthenticated = true;
    },
    signout() {
      isAuthenticated = false;
    }

  }

  export default Auth;