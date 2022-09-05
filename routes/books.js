const express = require("express");
const { getAllBooks, getSingleBookById, getAllIssuedBooks, addNewBook, updateBookById, getSingleBookByName } = require("../controllers/book.controller");
const router = express.Router();

const { books } = require("../data/books.json");
const { users } = require("../data/users.json");


  



/**
 * Route: /books
 * Method: GET
 * Description: Get all books
 * Access: Public
 * Parameters: none
 */

 router.get("/",getAllBooks);

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get book by id
 * Access: Public
 * Parameters: id
 */

router.get("/:id", getSingleBookById);


router.get("/getbook/name/:name",getSingleBookByName);  // add a new book 

/**
 * Route: /books/issued/by-users
 * Method: GET
 * Description: Get issued books
 * Access: Public
 * Parameters: none
 */

router.get("/issued/by-users", getAllIssuedBooks);
/**
 * Route: /books
 * Method: POST
 * Description: Creating new book
 * Access: Public
 * Parameters: none
 */




router.post("/", addNewBook);
/**
 * Route: /books/:id
 * Method: PUT
 * Description: Updating a book
 * Access: Public
 * Parameters: id
 * data : id, name, etc..
 */

router.put("/:id", updateBookById);
/**
 * Route: /books/issued/with-fine
 * Method: GET
 * Description: Get issued books with fine
 * Access: Public
 * Parameters: none
 */

router.get("/issued/with-fine", (req, res) => {
    const usersWithIssuedBooksWithFine = users.filter((each) => {
        if (each.issuedBook) return each;
    });

    const issuedBooksWithFine = [];

    usersWithIssuedBooksWithFine.forEach((each) => {
        const book = books.find((book) => book.id === each.issuedBook);

        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;


        const getDateInDays = (data = "") => {
            let date;
            if (data === "") {
                date = new Date();
            } else {
                date = new Date(data);
            }
            let days = Math.floor(date / (1000 * 60 * 60 * 24)); //1000 is for milliseconds
            return days;
        };

        let returnDate = getDateInDays(each.returnDate);

        let currentDate = getDateInDays();

        if (returnDate < currentDate) {
            issuedBooksWithFine.push(book);
        }
    });

    if (issuedBooksWithFine.length === 0) {
        return res.status(404).json({
            Success: false,
            Message: "No books which have fine",
        });
    }

    return res.status(200).json({
        Success: true,
        Message: "Issued Books List which have fine",
        Data: issuedBooksWithFine,
    })
});


module.exports = router;