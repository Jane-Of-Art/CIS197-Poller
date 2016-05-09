import User from '../models/user';
import Game from '../models/game';

export function loginStatus(req, res) {
  if (req.cookies.user !== undefined && req.cookies.pass !== undefined) {
    User.findOne({ username: req.cookies.user, password: req.cookies.pass }, (err, user) => {
      if (err) {
        res.json({ user: {}, game: {}, status: 'Error finding user' });
      } else {
        if (user) {
           /* START GAME CODE */
          if (user.isInGame) {
            Game.findOne({ host: user.currentGameHost, isEnded: false }, (error, game) => {
              if (error) {
                res.json({ user: user, game: {}, status: 'Error finding game' });
              } else {
                if (game) {
                  res.json({ user: user, game: game });
                } else {
                  res.json({ user: user, game: {}, status: 'Game by host does not exist in database' });
                }
              }
            });
          } else {
            res.json({ user: user, game: {} });
          }
          /* END GAME CODE */
        } else {
          res.json({ user: {}, game: {}, status: 'User and password cookie combo do not exist in database' });
        }
      }
    });
  } else {
    res.json({ user: {}, game: {}, status: 'Cookie(s) undefined' });
  }
}

export function loginUser(req, res) {
  User.findOne({ username: req.body.user.username, password: req.body.user.password }, (err, user) => {
    if (err) {
      res.json({ user: {}, game: {} });
    } else {
      if (user) {
        res.cookie('user', req.body.user.username, { maxAge: 900000 });
        res.cookie('pass', req.body.user.password, { maxAge: 900000 });
         /* START GAME CODE */
        if (user.isInGame) {
          Game.findOne({ host: user.currentGameHost, isEnded: false }, (error, game) => {
            if (error) {
              res.json({ user: user, game: {}, status: 'Error finding game' });
            } else {
              if (game) {
                res.json({ user: user, game: game });
              } else {
                res.json({ user: user, game: {}, status: 'Game by host does not exist in database' });
              }
            }
          });
        } else {
          res.json({ user: user, game: {} });
        }
        /* END GAME CODE */
      } else {
        res.json({ user: {}, game: {}, status: 'User and password cookie combo do not exist in database' });
      }
    }
  });
}

export function registerUser(req, res) {
  if (req.body.user.username && req.body.user.password && req.body.user.email) {
    const newUser = new User(req.body.user);
    newUser.save((err, saved) => {
      if (err) {
        res.json({ user: {}, game: {} });
      } else {
        res.cookie('user', req.body.user.username, { maxAge: 900000 });
        res.cookie('pass', req.body.user.password, { maxAge: 900000 });
        const user = saved;

        /* START GAME CODE */
        if (user.isInGame) {
          Game.findOne({ host: user.currentGameHost, isEnded: false }, (error, game) => {
            if (error) {
              res.json({ user: user, game: {}, status: 'Error finding game' });
            } else {
              if (game) {
                res.json({ user: user, game: game });
              } else {
                res.json({ user: user, game: {}, status: 'Game by host does not exist in database' });
              }
            }
          });
        } else {
          res.json({ user: user, game: {} });
        }
        /* END GAME CODE */
      }
    });
  } else {
    res.json({ user: {}, game: {} });
  }
}

export function logoutUser(req, res) {
  res.clearCookie('user');
  res.clearCookie('pass');
  res.json({ user: {} });
}
