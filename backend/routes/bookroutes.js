const book_controller = require("../controllers/bookController")

module.exports = (app)=>{

    app.post("/library/api/v1/auth/book",book_controller.borrowBook)
}