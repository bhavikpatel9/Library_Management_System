const User = require("../models/bookModel");

exports.borrowBook = async (req, res) => {
    const { email, bookId, date } = req.body;

    try {
        const user_created = await User.create({ email, bookId, date });
        res.status(201).json(user_created);
    } catch (error) {
        console.error("Error while borrowing book:", error);
        res.status(500).json({ message: "Some error occurred while borrowing book" });
    }
};
