var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var Player = require('../models/player');

/* GET scores page */
router.get('/scores', (req, res, next) => {
    res.render('scores', { admin: firebase.auth().currentUser != null });
});
  
/* GET score entry page */
router.get('/enter-scores', (req, res, next) => {
    if (firebase.auth().currentUser) {
        getPlayers().then((players) => {
            players.forEach(p => console.log(p.id, p.name));
            res.render('enter-scores', { admin: true, players: players });
        });
    } else {
        res.redirect('/login');
    }
});

router.post('/scores', function(req, res){
    res.redirect('scores');
});

router.post('/enter-scores', function(req, res){
  res.redirect('enter-scores');
});

// Loads the players from the database
async function getPlayers() {
    const snapshot = await firebase.firestore().collection('players').get();
    let players = [];
    snapshot.docs.map(doc => players.push(new Player(doc.id, doc.data().name)));
    return players;
}

module.exports = router;