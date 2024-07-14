const auth_controller = require("../controllers/authController")

module.exports = (app)=>{

    app.post("/library/api/v1/auth/signup",auth_controller.signUp)
    app.post("/library/api/v1/auth/login",auth_controller.login)
}