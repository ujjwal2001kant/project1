var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
app = express();
app.engine('html', require('ejs').renderFile);
app.set("view engine", "html");
app.use('/assets', express.static('assets'))
app.use(bodyParser.urlencoded({ extended: true   }));
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
var userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    username: String,
    password: String,
});
var moneySchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    mobile: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    company: String,
    email: String,
    amount: Number
});
var querySchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    suggestions: String,
});
var message = "";
var User = mongoose.model("User", userSchema);
var Money = mongoose.model("Money", moneySchema);
var Query = mongoose.model("Query", querySchema);
var logU = false;
var logA = false;

app.get("/", function (req, res) {
    message = "";
    res.sendFile('views/index.html', {
        root: path.join(__dirname, './')
    })
});

app.get("/index", function (req, res) {
    message = "";
    res.sendFile('views/index.html', {
        root: path.join(__dirname, './')
    })
});

app.get("/about", function (req, res) {
    res.sendFile('views/about.html', {
        root: path.join(__dirname, './')
    })
});

app.get("/donate", function (req, res) {
    res.sendFile('views/donate.html', {
        root: path.join(__dirname, './')
    })
});

app.get("/articles", function (req, res) {
    res.sendFile('views/articles.html', {
        root: path.join(__dirname, './')
    })
});

app.get("/login", function (req, res) {
    logA = false;
    logU = false;
    res.render(__dirname + "/views/login.html", { message: message });
});


app.get("/contact", function (req, res) {
    res.sendFile('views/contact.html', {
        root: path.join(__dirname, './')
    })
});

app.get("/thanku", function (req, res) {
    res.sendFile('views/thanku.html', {
        root: path.join(__dirname, './')
    })
});

app.get("/user", function (req, res) {
    if (logU)
        res.sendFile('views/contact.html', {
            root: path.join(__dirname, './')
        })
    else res.redirect("login.html");
});

app.get("/signup", function (req, res) {
    res.sendFile('views/signup.html', {
        root: path.join(__dirname, './')
    })
});

app.get("/pt1", function (req, res) {
    res.sendFile('views/pt1.html', {
        root: path.join(__dirname, './')
    })
});

app.get("/pt2", function (req, res) {
    res.sendFile('views/pt2.html', {
        root: path.join(__dirname, './')
    })
});

app.get("/pt3", function (req, res) {
    res.sendFile('views/pt3.html', {
        root: path.join(__dirname, './')
    })
});

app.get("/pt4", function (req, res) {
    res.sendFile('views/pt4.html', {
        root: path.join(__dirname, './')
    })
});

app.get("/pt5", function (req, res) {
    res.sendFile('views/pt5.html', {
        root: path.join(__dirname, './')
    })
});

app.get("/thank", function (req, res) {
    res.sendFile('views/thank.html', {
        root: path.join(__dirname, './')
    })
});

app.post('/signup', function (req, res) {
    User.create(req.body.user, function (err, user) {
        console.log(user);
        try {
            console.log(user);
            logU = true;
            name = user.first_name;
            res.redirect("/about");
        } catch (err) { console.log(err); }
    });
});

app.post('/donate', function (req, res) {
    Money.create(req.body.user, function (err, user) {
        try {
            console.log(user);
            res.redirect("/thank");
        } catch (err) { console.log(err); }
    });
});

app.post('/contact', function (req, res) {
    Query.create(req.body.user, function (err, user) {
        try {
            console.log(user);
            res.redirect("/thanku");
        } catch (err) { console.log(err); }
    });
});

app.post("/user", function (req, res) {
    User.findOne({ username: req.body.username }, function (err, user) {
        try {
            if (user.password == req.body.password) {
                logU = true;
                message = "";
                res.redirect("/contact");
            } else {
                res.redirect("/login");
                message = "Invalid Password"
            }
        } catch (err) {
            res.redirect("/login");
            message = "Invalid Username";
        }
    });
});

app.listen(3000, function () {
    console.log("Listening to clickclinic");
});