const express = require("express");

const app = express();

const PORT = 8081;

app.use(express.json());

app.get('/', (req,res) => {
    res.status(200).json({
        massage: "Server is up and running",
    });
});

app.get("*", (req,res) => {
    res.status(404).json({
        massage: "This route does not exit",
    });
});


app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});