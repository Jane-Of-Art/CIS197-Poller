import User from '../models/user';
import Game from '../models/game';

export function create(req, res) {
  if (req.body.game.username && req.body.game.gamename && req.body.game.prompts
                             && ((req.body.game.prompts).split('\n').length > 1)) {
    const promptsArray = (req.body.game.prompts).split('\n');
    const newGame = new Game({ name: req.body.game.gamename, host: req.body.game.username, options: promptsArray });
    newGame.save((err, saved) => {
      if (!err) {
        User.update({ username: req.body.game.username }, {
          isInGame: true,
          currentGameHost: req.body.game.username,
        }, (error) => {
          if (!error) {
            res.json({ game: saved });
          } else {
            res.json({ game: {}, status: 'error updating user' });
          }
        });
      } else {
        res.json({ game: {}, status: 'error saving game' });
      }
    });
  }
}

export function end(req, res) {
  if (req.body.game.username) {
    Game.update({ host: req.body.game.username, isEnded: false }, {
      isEnded: true,
    }, (err) => {
      if (!err) {
        // clear game from all users in game
        User.update({ currentGameHost: req.body.game.username }, {
          isInGame: false,
          isPengingApproval: false,
          isRejected: false,
          currentGameHost: '',
          currentGameState: [],
        }, () => {});

        // update host user
        User.update({ username: req.body.game.username }, {
          isInGame: false,
          currentGameHost: '',
        }, (error) => {
          if (!error) {
            res.json({ status: 'success ending game' });
          } else {
            res.json({ status: 'error updating user' });
          }
        });
      } else {
        res.json({ status: 'error updating game' });
      }
    });
  } else {
    res.json({ status: 'no hostname specified' });
  }
}

export function join(req, res) {
  if (req.body.request.username) {
    Game.update({ host: req.body.request.hostname, isEnded: false },
      { $push: { activeParticipants: { name: req.body.request.username } } },
      (err, response) => {
        if (!err && (response.nModified > 0)) {
          Game.findOne({ host: req.body.request.hostname, isEnded: false }, (error, game) => {
            if (error) {
              res.json({ game: {}, status: 'Error finding game' });
            } else {
              if (game) {
                // code to create user's game state
                let newState = [];
                let index;
                for (index = 0; index < game.options.length; index++) {
                  const nextPrompt = game.options[index];
                  newState.push({ prompt: nextPrompt });
                }

                // update user with new stuff
                User.update({ username: req.body.request.username }, {
                  isInGame: true,
                  currentGameHost: req.body.request.hostname,
                  currentGameState: newState,
                }, (error2) => {
                  if (!error2) {
                    User.findOne({ username: req.body.request.username }, (error3, user) => {
                      if (error3) {
                        res.json({ user: {}, game: {}, status: 'Error finding user' });
                      } else {
                        if (user) {
                          res.json({ user: user, game: game });
                        } else {
                          res.json({ user: {}, game: {}, status: 'user does not exist in database' });
                        }
                      }
                    });} else {
                    res.json({ user: {}, game: {}, status: 'error updating user' });
                  }
                }
                );
              } else {
                res.json({ game: {}, status: 'Game by host does not exist in database' });
              }
            }
          });
        } else {
          User.findOne({ username: req.body.request.username }, (error, user) => {
            if (error) {
              res.json({ user: {}, game: {}, status: 'Error finding user' });
            } else {
              if (user) {
                res.json({ user: user, game: {}, status: 'error updating game' });
              } else {
                res.json({ user: {}, game: {}, status: 'user does not exist in database' });
              }
            }
          });
        }
      }
    );
  } else {
    User.findOne({ username: req.body.request.username }, (err, user) => {
      if (err) {
        res.json({ user: {}, game: {}, status: 'Error finding user' });
      } else {
        if (user) {
          res.json({ user: user, game: {}, status: 'no hostname specified' });
        } else {
          res.json({ user: {}, game: {}, status: 'user does not exist in database' });
        }
      }
    });
  }
}

export function leave(req, res) {
  if (req.body.user.username && req.body.user.hostname) {
    Game.update({ host: req.body.user.hostname, isEnded: false },
      { $pull: { activeParticipants: { name: req.body.user.username } } },
      (err) => {
        if (!err) {
          User.update({ username: req.body.user.username }, {
            isInGame: false,
            isPengingApproval: false,
            isRejected: false,
            currentGameHost: '',
            currentGameState: [],
          }, (error) => {
            if (!error) {
              res.json({ status: 'success leaving game' });
            } else {
              res.json({ status: 'error updating user' });
            }
          });
        } else {
          res.json({ status: 'error updating game' });
        }
      });
  } else {
    res.json({ status: 'no hostname specified' });
  }
}

export function save(req, res) {
  User.update({ username: req.body.user.username }, {
    $set: { currentGameState: req.body.user.gameState },
  }, (err) => {
    if (!err) {
      res.json({ status: 'success updating state' });
    } else {
      res.json({ status: 'error updating state' });
    }
  });
}

export function finish(req, res) {
  if (req.body.user.username && req.body.user.answers) {
    Game.update({ host: req.body.user.hostname, isEnded: false },
      {
        $push: { finishedParticipants: { name: req.body.user.username, answers: req.body.user.answers, dat: Date.now } },
        $pull: { activeParticipants: { name: req.body.user.username } },
      },
      (err) => {
        if (!err) {
          User.update({ username: req.body.user.username }, {
            isInGame: false,
            isPengingApproval: false,
            isRejected: false,
            currentGameHost: '',
            currentGameState: [],
          }, (error) => {
            if (!error) {
              res.json({ status: 'success finishing game' });
            } else {
              res.json({ status: 'error updating user' });
            }
          });
        } else {
          res.json({ status: 'error updating game' });
        }
      });
  } else {
    res.json({ status: 'no username or answers specified' });
  }
}
