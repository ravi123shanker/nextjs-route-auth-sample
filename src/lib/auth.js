const userEmail = `admin@example.com`;
const userPassword = "admin123";

class Auth {
  constructor() {
    this.user = null;
    this.error = null;
  }
  onAuthStateChanged(callback) {
    this.callback = callback;

    return () => {
      this.callback = null;
    };
  }
  onUserChange(user, error) {
    this.callback && this.callback(user, error);
  }

  signIn(email, password, delay = 2000) {
    console.log(`Sign in with email: ${email} password: ${password}`);

    return new Promise((resolve, reject) => {
      if (email !== userEmail || password !== userPassword) {
        const error = { message: "Wrong email or password" };
        this.error = error;
        reject(error);
        this.onUserChange(null, this.error);

        return;
      }

      setTimeout(() => {
        this.user = {
          name: "John Smith",
          email,
          token: "dfasdfadsf.asdfasdf.afsdfasd",
        };

        window.sessionStorage.setItem("user", JSON.stringify(this.user));
        this.onUserChange(this.user);
        resolve(this.user);
      }, delay);
    });
  }

  signOut() {
    console.log("sign out");
    window.sessionStorage.removeItem("user");
    this.user = null;
    this.onUserChange(this.user);
  }

  resolveUser(timeout) {
    setTimeout(() => {
      if (window) {
        const signedInUser = window.sessionStorage.getItem("user");
        if (signedInUser) {
          this.user = JSON.parse(signedInUser);
        }
      } else {
        this.user = null;
      }
      this.onUserChange(this.user);
    }, timeout);

    return this;
  }
}
export default Auth;
