const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
var user = require('./User');
var event = require('./Event');
const PORT = process.env.PORT || 5000;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");

const tabUser = [];

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "superSecret"
};

passport.use(
  new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(jwt_payload);
    done(null, "test");
  })
);

app.get('/', function (req, res){
    res.send('Accueil')
});

app.get('/public', (req, res) => {
  res.send("Page public");
});

app.post('/signin',urlEncodedParser,(req, res) => {
    const theUser = tabUser.find(user => user.mail === req.body.mail);
    if(!theUser){
        const email = req.body.mail;
        const password = req.body.password;
        unUser = new user(email, password);
        tabUser.push(unUser);
        res.send("Utilisateur enregistre");
    }else{
        res.send("Adresse mail deja utilise");
    }
});

app.post('/login', urlEncodedParser, (req, res) => {
    const email = req.body.mail;
    const password = req.body.password;

    if (!email || !password) {
        res.status(401).json({ error: "Veuillez saisir un email et un mot de passe." });
        return;
    }

    const user = tabUser.find(user => user.mail === email);

    if (!user) {
        res.status(401).json({ error: "Utilisateur inexistant" });
        return;
    }else if (user.password !== password){
        res.status(401).json({ error: "Mot de passe incorrect !" });
        return;
    }

    const userJwt = jwt.sign({ user: email }, "superSecret");

    res.json({
        jwt: userJwt
    });
});

app.get('/private',passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("Voici une page privee : " + unUser.mail );
  }
);

app.post('/addEvent', urlEncodedParser ,passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const idEvent = req.body.idEvent;
        const title = req.body.title;
        const description = req.body.dateFin;
        const dateDebut = req.body.dateDebut;
        const dateFin = req.body.dateFin;
        const mailUser = unUser.mail;
        theEvent = new event(idEvent,title,description,dateDebut,dateFin,mailUser);
        unUser.addEvent(theEvent);
        res.send("evenement ajouté");
    }
);

app.get('/events',passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(unUser.getListEvent());
  }
);

app.get('/event',passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const idEvent = req.body.idEvent;
    result = unUser.getEvent(idEvent);
    res.send(result);
  }
);

app.get('/deleteEvent', urlEncodedParser ,passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const idEvent = req.body.idEvent;
    unUser.deleteEvent(idEvent);
    res.send("evenement supprimé");
  }
);

app.listen(PORT, () => {
  console.log("app running on port " + PORT);
});
