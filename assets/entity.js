Game.DATASTORE.ENTITY = {};

Game.Entity = function(template) {
    template = template || {};
    Game.Symbol.call(this, template);
    if (! ('attr' in this)) { this.attr = {}; }
    this.attr._name = template.name || '';
    this.attr._x = template.x || 0;
    this.attr._y = template.y || 0;
    this.attr._generator_template_key = template.generator_template_key || '';
    this.attr._mapId = null;
    this.attr._timeout = null;

    this.attr._id = template.presetId || Game.util.uniqueId();
    Game.DATASTORE.ENTITY[this.attr._id] = this;

    // mixin sutff
    // track mixins and groups, copy over non-META properties, and run the mixin init if it exists
    this._mixinNames = template.mixins || [];
    this._mixins = [];
    this._actions = [];
    for (var i = 0; i < this._mixinNames.length; i++) {
      this._mixins.push(Game.EntityMixin[this._mixinNames[i]]);
    }
    this._mixinTracker = {};

    for (i = 0; i < this._mixins.length; i++) {
      var mixin = this._mixins[i];
      this._mixinTracker[mixin.META.mixinName] = true;
      this._mixinTracker[mixin.META.mixinGroup] = true;
      for (var mixinProp in mixinProp != 'META' && mixin) {
        if (mixinProp != 'META' && mixin.hasOwnProperty(mixinProp)) {
          this[mixinProp] = mixin[mixinProp];
        }
      }
      if (mixin.META.hasOwnProperty('stateNamespace')) {
        this.attr[mixin.META.stateNamespace] = {};
        for (var mixinStateProp in mixin.META.stateModel) {
          if (mixin.META.stateModel.hasOwnProperty(mixinStateProp)) {
            if (typeof mixin.META.stateModel[mixinStateProp] == 'object') {
              this.attr[mixin.META.stateNamespace][mixinStateProp] = JSON.parse(JSON.stringify(mixin.META.stateModel[mixinStateProp])); //Don't include functions, just properties
            } else {
              this.attr[mixin.META.stateNamespace][mixinStateProp] = mixin.META.stateModel[mixinStateProp];
            }
          }
        }
      }
      if (mixin.META.hasOwnProperty('init')) {
        mixin.META.init.call(this,template);
      }
      if (mixin.META.hasOwnProperty('act')) {
        this._actions.push({action:mixin.META.act, priority:mixin.META.priority});
        this._actions.sort(function (a,b) {
          if(a.priority > b.priority) {
            return 1;
          } else if (a.priority < b.priority) {
            return -1;
          } else {
            return 0;
          }
        });
      }
    }

    for(i = 0; i < this._actions.length; i++) {
      this._actions[i] = this._actions[i].action;
    }
};
Game.Entity.extend(Game.Symbol);

Game.Entity.prototype.hasMixin = function(checkThis) {
    if (typeof checkThis == 'object') {
      return this._mixinTracker.hasOwnProperty(checkThis.META.mixinName);
    } else {
      return this._mixinTracker.hasOwnProperty(checkThis);
    }
};

Game.Entity.prototype.getId = function() {
    return this.attr._id;
};

Game.Entity.prototype.getMap = function() {
    return Game.DATASTORE.MAP[this.attr._mapId];
};

Game.Entity.prototype.setMap = function(map) {
    this.attr._mapId = map.getId();
};

Game.Entity.prototype.getName = function() {
    return this.attr._name;
};
Game.Entity.prototype.setName = function(name) {
    this.attr._name = name;
};
Game.Entity.prototype.setPos = function(x_or_xy,y) {
  if (typeof x_or_xy == 'object') {
    this.attr._x = x_or_xy.x;
    this.attr._y = x_or_xy.y;
  } else {
    this.attr._x = x_or_xy;
    this.attr._y = y;
  }
};
Game.Entity.prototype.getPos = function() {
  return {x:this.attr._x,y:this.attr._y};
};
Game.Entity.prototype.getX = function() {
    return this.attr._x;
};
Game.Entity.prototype.setX = function(x) {
    this.attr._x = x;
};
Game.Entity.prototype.setY = function(y) {
    this.attr._y = y;
};
Game.Entity.prototype.getY   = function() {
    return this.attr._y;
};

Game.Entity.prototype.act = function() {
  for(var i = 0; i < this._actions.length; i++) {
    this._actions[i].call(this);
  }
};

Game.Entity.prototype.pauseAction = function() {
    var curObj = this;
    if (this.attr.hasOwnProperty('_timeout') && this.attr._timeout){
      clearTimeout(curObj.attr._timeout);
    }
};

Game.Entity.prototype.toJSON = function () {
  var json = Game.UIMode.gamePersistence.BASE_toJSON.call(this);
  return json;
};
Game.Entity.prototype.fromJSON = function (json) {
  Game.UIMode.gamePersistence.BASE_fromJSON.call(this,json);
};

Game.Entity.prototype.raiseEntityEvent = function(evtLabel,evtData) {
  for (var i = 0; i < this._mixins.length; i++) {
    var mixin = this._mixins[i];
    if (mixin.META.listeners && mixin.META.listeners[evtLabel]) {
      mixin.META.listeners[evtLabel].call(this,evtData);
    }
  }
};

Game.Entity.prototype.destroy = function() {
    //remove from map
    this.getMap().extractEntity(this);
    if(this.hasOwnProperty('_actions')) {
      this.pauseAction();
    }
    //remove from datastore
    delete Game.DATASTORE.ENTITY[this.getId()];
};
