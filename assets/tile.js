Game.Tile = function (properties) {
  properties = properties || {};
  Game.Symbol.call(this, properties);
  if (! ('attr' in this)) { this.attr = {}; }
  this.attr._name = properties.name || 'unknown';
  this.attr._walkable = properties.walkable||false;
  this.attr._opaque = properties.opaque||false;
};
Game.Tile.extend(Game.Symbol);

Game.Tile.prototype.clone = function () {
  clonedTile = new Game.Tile();
  for (var property in this.attr) {
    if (this.attr.hasOwnProperty(property)) {
      clonedTile.attr[property] = this.attr[property];
    }
  }
  return clonedTile;
};

Game.Tile.prototype.getName = function () {
  return this.attr._name;
};
Game.Tile.prototype.isWalkable = function () {
  return this.attr._walkable;
};
Game.Tile.prototype.isOpaque = function () {
  return this.attr._opaque;
};
//-----------------------------------------------------------------------------


Game.Tile.nullTile = new Game.Tile({name: 'nullTile'});
Game.Tile.bgTiles = [new Game.Tile({name: 'bg1Tile', chr: '1'}),
  new Game.Tile({name: 'bg2Tile', chr: '2'}),
  new Game.Tile({name: 'bg3Tile', chr: '3'}),
  new Game.Tile({name: 'bg4Tile', chr: '4'}),
  new Game.Tile({name: 'bg5Tile', chr: '5'}),
  new Game.Tile({name: 'bg6Tile', chr: '6'})];

Game.Tile.floorTile = new Game.Tile({name: 'floor', chr: 'a', walkable: true});
Game.Tile.blackFloorTile = new Game.Tile({name: 'blackFloor', chr: 'b', walkable: true});
Game.Tile.blueFloorTile = new Game.Tile({name: 'blueFloor', chr: 'c', walkable: true});
Game.Tile.greenFloorTile = new Game.Tile({name: 'greenFloor', chr: 'd', walkable: true});
Game.Tile.wallTile = new Game.Tile({name:'wall', chr:'#', opaque: true});

Game.Tile.blackWallHoriTile = new Game.Tile({name:'blackWallHori', chr:'e', opaque: true});
Game.Tile.blackWallVertiTile = new Game.Tile({name:'blackWallVerti', chr:'f', opaque: true});
Game.Tile.blackCorner1Tile = new Game.Tile({name:'blackCorner1', chr:'g', opaque: true});
Game.Tile.blackCorner2Tile = new Game.Tile({name:'blackCorner2', chr:'h', opaque: true});
Game.Tile.blackCorner3Tile = new Game.Tile({name:'blackCorner3', chr:'i', opaque: true});
Game.Tile.blackCorner4Tile = new Game.Tile({name:'blackCorner4', chr:'j', opaque: true});
Game.Tile.blackDoorTile = new Game.Tile({name:'blackDoor', chr:'k', walkable: true, opaque: true});


Game.Tile.blueWallHoriTile = new Game.Tile({name:'blueWallHori', chr:'l', opaque: true});
Game.Tile.blueWallVertiTile = new Game.Tile({name:'blueWallVerti', chr:'m', opaque: true});
Game.Tile.blueCorner1Tile = new Game.Tile({name:'blueCorner1', chr:'n', opaque: true});
Game.Tile.blueCorner2Tile = new Game.Tile({name:'blueCorner2', chr:'o', opaque: true});
Game.Tile.blueCorner3Tile = new Game.Tile({name:'blueCorner3', chr:'p', opaque: true});
Game.Tile.blueCorner4Tile = new Game.Tile({name: 'blueCorner4', chr: 'q', opaque: true});
Game.Tile.blueDoorTile = new Game.Tile({name:'blueDoor', chr:'r', walkable: true, opaque: true});

Game.Tile.greenWallHoriTile = new Game.Tile({name:'greenWallHori', chr:'s', opaque: true});
Game.Tile.greenWallVertiTile = new Game.Tile({name:'greenWallVerti', chr:'t', opaque: true});
Game.Tile.greenCorner1Tile = new Game.Tile({name:'greenCorner1', chr:'u', opaque: true});
Game.Tile.greenCorner2Tile = new Game.Tile({name:'greenCorner2', chr:'v', opaque: true});
Game.Tile.greenCorner3Tile = new Game.Tile({name:'greenCorner3', chr:'w', opaque: true});
Game.Tile.greenCorner4Tile = new Game.Tile({name: 'greenCorner4', chr: 'x', opaque: true});
Game.Tile.greenDoorTile = new Game.Tile({name:'greenDoor', chr:'y', walkable: true, opaque: true});
