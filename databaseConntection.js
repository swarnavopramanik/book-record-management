const { default: mongoose } = require("mongoose");
const mongose = require("mongoose");

function DbConnection(){
    const DB_URL = process.env.MONGO_URI;

    mongose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "Connection error")); // bind method says that show the error for this line // on means check the continuty of line
    db.once("open", function(){
        console.log("Db connected...");              // ones means when connection is established then call the function 
    });

}

module.exports = DbConnection;
