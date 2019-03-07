/*
 * Author: Jerome Renaux
 * E-mail: jerome.renaux@gmail.com
 */

var Game = {};

Game.init = function() {
  game.stage.disableVisibilityChange = true;
};

Game.preload = function() {
  this.game.physics.startSystem(Phaser.Physics.ARCADE);
  this.game.scale.pageAlignHorizontally = true;
  this.game.scale.pageAlignVertically = true;
  this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

  game.load.image("background", "assets/sprites/background.jpg");
  game.load.image("sprite", "assets/sprites/sprite.png");
};

Game.create = function() {
  Game.playerMap = {};
  var layer = game.add.sprite(0, 0, "background");
  layer.inputEnabled = true; // Allows clicking on the map ; it's enough to do it on the last layer
  layer.events.onInputUp.add(Game.getCoordinates, this);
  Client.askNewPlayer();
};

Game.getCoordinates = function(layer, pointer) {
  Client.sendClick(pointer.worldX, pointer.worldY);
};

Game.addNewPlayer = function(id, x, y) {
  Game.playerMap[id] = game.add.sprite(x, y, "sprite");
  Game.playerMap[id].anchor.setTo(0.5);
};

Game.movePlayer = function(id, x, y) {
  var player = Game.playerMap[id];
  var distance = Phaser.Math.distance(player.x, player.y, x, y);
  var tween = game.add.tween(player);
  var duration = distance * 10;
  tween.to({ x: x, y: y }, duration);
  tween.start();
};

Game.removePlayer = function(id) {
  Game.playerMap[id].destroy();
  delete Game.playerMap[id];
};
