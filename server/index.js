require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const apiRoutes = require("./routes/api-routes"); 
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
let db = require('./models/index');
const cors = require('cors');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {
    expires: 6000000000000
}
}));

  // Passport Config
  require('./config/passport')(passport);
  // Passport Middleware
  app.use(passport.initialize());
  app.use(passport.session());

app.use('/api', apiRoutes);

db.sequelize.sync().then(function() { 
  console.log('Nice! Database looks fine');  
}).catch(function(err) {
  console.log(err, "Something went wrong with the Database Update!");
});

  app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
  });