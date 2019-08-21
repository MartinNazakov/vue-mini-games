# client

## Vue Mini Games

The project is build using the following technologies:

Client:
- Vuejs
- Vuex
- Vuetify
- Socket.io

Service:
- Nodejs
- Express
- MongoDb/Mongoose
- Socket.io

The project represents a platform that can be used to play games with other people. Currently, there is only one game supported. The supported functionalities are:
- Registration
- Login
- Rankings
- Games List
- Lobbies (Create/Join)
- TicTacToe game

Steps:

1) Login or Register
2) Navigate to Games route
3) Create a new lobby with the first availible game card. A modal dialog will apear. Don't close it.
4) From another browser window (or another pc) repeat steps 1-2 and instead of creating a new lobby, join the created one from step 3
5) The host of the lobby (User 1) should press the Start button
6) You will be redirected to the game route and a random player will be generated to start the game

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
