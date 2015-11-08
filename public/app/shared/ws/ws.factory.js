module.exports = function($websocket){
  function createNewSocket(){
    return $websocket.$new();
  }
  var ws = createNewSocket();

  function State(name, comms){
    this.name = name;
    this.comms = comms;
    this.comms.stateName = name;
  }
  ['start',
  'ready',
  'switchToAbleToPlay',
  'switchToWaitForMatch',
  'switchToWaitForOpponent',
  'reset'].forEach(function(method){
    State.prototype[method] = function(){ return this };
  });

  function InitialState(comms){
      State.call(this, 'initial', comms);
      ws.$on('$message', function(name){
          if(name === 'match_found'){
            comms.switchToAbleToPlay();
          }
          if(name === 'start_character_selection'){
            var handler = comms.handler || function(){};
            handler();
            comms.reset();
          }
      })
  }
  InitialState.prototype.next = function(){
      ws.$emit('find_match');
      return new WatingForMatchState(this.comms);
  };
  function WatingForMatchState(comms){
    State.call(this, 'wating_for_match', comms);
  }
  WatingForMatchState.prototype.next = function(){
    return new AbleToPlay(this.comms);
  };

  function AbleToPlay(comms){
    State.call(this, 'able_to_play', comms);
  }

  AbleToPlay.prototype.next = function(){
    ws.$emit('player_ready');
    return new WatingForOpponent(this.comms);
  }

  function WatingForOpponent(comms){
      State.call(this, 'wating_for_oppenent', comms);
  }
  WatingForOpponent.prototype.next = function(){
    ws.$close();
    ws = createNewSocket();
    this.comms.stateName = null;
    return null;
  };

  return {
    state : null,
    stateName : null,
    handler : null,
    onStartGame : function(handler){
      this.handler = handler;
    },

    start : function(){
      if(!this.state){
        this.state = new InitialState(this);
      }
      this.state = this.state.next();
    },
    ready : function(){
      this.switchToWaitForOpponent();
    },
    switchToAbleToPlay : function(){
      this.state = this.state.next();
    },
    switchToWaitForMatch : function(){
      this.state = this.state.next();
    },
    switchToWaitForOpponent : function(){
      this.state = this.state.next();
    },
    reset : function(){
        this.state = this.state.next();
    }
  };
};
