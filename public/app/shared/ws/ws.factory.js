function Comms($websocket){
    this.$socket = $websocket.$new();
    this.handlers = [];
    this.reset();

    this.$socket.$on('$message', function(param){
        if(param === 'end_match' && this.gameStarted){
            this.reset();
            this.handlers.forEach(function(h){
                h("endGame");
            }.bind(this));
            return;
        }
        if(this.gameStarted){
            return;
        }
        this.matchFound = this.matchFound || param === 'match_found';
        this.gameStarted = this.gameStarted || param === 'start_character_selection';
        this.handlers.forEach(function(h){
            if(param === 'match_found' && !this.beginReady){
                this.beginReady = true;
                h("beginReadyProcess");
                return;
            }
            if(param === 'start_character_selection'){
                h('beginGame');
                return ;
            }
        }.bind(this));
    }.bind(this));
}
Comms.prototype.addStateChangeListener = function(handler){
    this.handlers.push(handler);
};
Comms.prototype.ready = function(){
    if(!this.gameStarted && this.matchFound && !this.readyUp){
        this.readyUp = true;
        this.$socket.$emit('player_ready');
    }
};

Comms.prototype.findMatch = function(){
    if(!this.gameStarted && !this.findingMatch){
        this.findingMatch = true;
        this.$socket.$emit('find_match');
    }
};

Comms.prototype.reset = function(){
    this.gameStarted = false;
    this.matchFound = false;
    this.findingMatch = false;
    this.beginReady = false;
    this.readyUp = false;
};
module.exports = Comms;
