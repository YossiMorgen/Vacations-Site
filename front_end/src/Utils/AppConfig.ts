class AppConfig{

    api = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001/api/';
    auth = this.api + 'auth/'
    register = this.auth + "register"
    login = this.auth + "login";
    vacations = this.api + 'vacations';
    likes = this.api + 'likes';
}
const appConfig = new AppConfig();
export default appConfig; 