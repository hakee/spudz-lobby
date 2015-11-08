var WSComms = require("../app/shared/ws/ws.factory");
var expect = require('chai').expect;

describe('wsComms service', function(){
    function createComms(eventStore, mockWs){
      eventStore = eventStore || [];
      mockWs = mockWs || {
        $emit : function(evt, data){
          eventStore.push({
            event: evt,
            data : data
          });
        },
        $on : function(){},
        __fireEvent : function(){
        },
        $close : function(){}
      };

      return new WSComms({
        $new : function(){
          return mockWs;
        }
      });
    }

    var createAbleToPlayComms = function(events, mock){
      var comms = createComms(events, mock);
      comms.start();
      comms.switchToWaitForMatch();
      return comms;
    };
    var createWatingForOpponentComms = function(evts, mock){
        var comms = createAbleToPlayComms(evts, mock);
        comms.ready();
        return comms;
    };

    describe('unrankedPlay->initial', function(){
      it('sends a find_match request', function(){
        var firedEvents = [];
        var comms = createComms(firedEvents);
        comms.start();
        expect(firedEvents.length).to.be.eql(1);
        expect(firedEvents[0].event).to.be.eql('find_match');

      });
      it('changes state to "wating_for_match"', function(){
        var firedEvents = [];
        var comms = createComms(firedEvents);

        comms.start();
        expect(comms.stateName).to.be.eql('wating_for_match');
      });
    });
    describe('unrankedPlay->wating_for_match', function(){
      describe('on match_found', function(){
        it('changes state to able_to_play', function(){
          var mockWs = {
            handler : null,
            $emit : function(){},
            $on : function(blah, handler){
                this.handler = handler;
            },
            __fireEvent : function(a, b){
              this.handler.call(this, b);
            }

          };
          var comms = createComms(null, mockWs);
          comms.start();

          mockWs.__fireEvent('$message', 'match_found');

          expect(comms.stateName).to.be.eql('able_to_play');

        });
      });
    });
    describe('unrankedPlay->able_to_play', function(){
      var createAbleToPlayComms = function(events){
        events = events || [];
        var comms = createComms(events);
        comms.start();
        comms.switchToWaitForMatch();
        return comms;
      };

      it('changes state to wating_for_oppenent', function(){
        var comms = createAbleToPlayComms();
        comms.ready();
        expect(comms.stateName).to.be.eql('wating_for_oppenent');
      });
      it('fires "player_ready" event', function(){
        var events = [];
        var comms = createAbleToPlayComms(events);
        comms.ready();

        expect(events.map(function(e){ return e.event}).indexOf('player_ready')).to.be.gt(-1);
      });
    });

    describe('unrankedPlay->wating_for_oppenent', function(){
      describe('on start_character_selection', function(){
        it('triggers the game', function(){
            var mockWs = {
              handler : null,
              $emit : function(){},
              $on : function(blah, handler){
                  this.handler = handler;
              },
              __fireEvent : function(messageName, messageValue){
                this.handler.call(this, messageValue);
              },
              $close : function(){}

            };
            var comms = createWatingForOpponentComms(null, mockWs);
            var wasCalled = false;
            comms.onStartGame(function(){
               wasCalled = true;
            });

            mockWs.__fireEvent('$message', 'start_character_selection');

            expect(wasCalled).to.be.true;

        });
        it('resets to initial', function(){
            var comms = createWatingForOpponentComms();
            comms.reset();
            expect(comms.stateName).to.be.eql(null);
        });
      });
    });

});
