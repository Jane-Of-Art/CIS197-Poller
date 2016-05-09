# Files

New Files
* server/
 * controllers/ (Actual functions that do stuff i.e. call Mongo stuff)
  * game.controller.js
  * user.controller.js
 * models/ ( Models)
  * game.js
  * user.js
 * routes (Matches URL to controller function)
  * game.routes.js
  * user.routes.js
* shared/
 * components/ (React Components)
  * CreateGameForm/**
  * GameHostView/**
  * GameParticipantView/**
  * InactiveView/**
  * JoinGameForm/**
  * LoginForm/**
  * NoLoginView/**
  * RegisterForm/**
 
Heavily Modified Files (>90%)
* shared/
 * container/ (Main Redux component that tracks state)
  * postContainer/**
 * redux/ (Redux stuff linking UI to server and state changes)
  * actions/**
  * constants/**
  * reducers/**

Lightly Modiefied Files (<10%)
* package.json
* server/
 * server.js (Main express app)
* shared/
 * components/
  * Footer/**
  * Header/**
* static/
 * css/
  * app.css (Also added bootstrap to project in server.js for style)

MERN*Starter Files
*The rest; sets up server side rendering, react routing, etc




