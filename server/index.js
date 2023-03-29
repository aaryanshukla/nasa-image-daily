require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const axios = require('axios');
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const passport = require("passport");


app.get('/', (req, res) => {
    axios
      .get(`https://api.nasa.gov/planetary/apod?api_key=Ws6popMz9wJrWIFouz5ynYUVrfcTQotGw1Lx1IjE`)
      .then(response => {
        res.send(response.data);
      })
      .catch(error => {
        console.log(error);
        res.status(500).send('Error fetching picture of the day');
      });
  }); 


// database connection
connection();


app.use(
	cookieSession({
		name: "session",
		keys: ["aaryan"],
		maxAge: 24 * 60 * 60 * 100,
	})
);


// middlewares
app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);
// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
