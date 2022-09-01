const express = require("express");
const dotenv = require("dotenv");
// database connection 
const DbConnection = require("./databaseConntection");
// importing routes 
const userRouter = require("./routes/user");
const booksRouter = require("./routes/books");

dotenv.config();

const app = express();

DbConnection();

const PORT = 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running",
  });
});

app.use("/users", userRouter);
app.use("/books", booksRouter);


/**
 * Route: /users
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Parameters: none
 */
 app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

/**
 * Route: /users/:id
 * Method: GET  single user by id
 * Access: Public
 * Parameters: id
 */
 app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id == id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  return res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * Route: /users:/id
 * Method: POST
 * Description : Create new user 
 * Access: Public
 * Parameters: none
 */
 app.post("/users", (req,res) => {
  const {id,name,surname, email,subscriptionType,subscriptionDate} = req.body;

  const user = users.find((each) => each.id == id);

  if (!user) {
    return res.status(400).json({
      success: false,
      massage: "User exists with this id",
    });
  }

  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });
  return res.status(201).json({
    success: true,
    data: users,
  });
 });


 /**
 * Route: /users/:id
 * Method: PUT
 * Description: Updating user data
 * Access: Public
 * Parameters: id
 */
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const user = users.find((each) => each.id === id);

  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });

  const updatedUser = users.map((each) => {
    if (each.id == id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });

  return res.status(200).json({
    success: true,
    data: updatedUser,
  });
});



/**
 * Route: /users/:id
 * Method: DELETE
 * Description : Delete a user by id 
 * Access: Public
 * Parameters: none
 */
 app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User to be deleted was not found",
    });
  }

  const index = users.indexOf(user);
  users.splice(index, 1);

  return res.status(202).json({ success: true, data: users });
});


app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route does not exist",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});