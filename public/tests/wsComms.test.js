var Comms = require("../app/shared/ws/ws.factory");
var expect = require('chai').expect;

describe('Comms', function(){
    function createMockWs(events){
        events = events || [];
        var socket = {
            handler : null,
            $emit : function(param){
                events.push(param);
            },
            $on : function(what, who){
                this.handler = who;
            }
        };
        return {
            $new : function(){
                return socket;
            },
            __fireEvent : function(action){
                socket.handler(action);
            }
        }
    }
    function testFireAction(method, actionName){
        var events = [];
        var comms = new Comms(createMockWs(events));
        comms[method]();
        expect(events[0]).to.be.eql(actionName);
    }
    function testOnlyOnce(method, pre){
        var events = [];
        var mockWs = createMockWs(events);
        var comms = new Comms(mockWs);
        if(pre){
            pre(comms, mockWs);
        }
        comms[method]();
        comms[method]();
        expect(events.length).to.be.eql(1);
    }
    describe('#findMatch', function(){
        it('fires "find_match" action', function(){
            testFireAction('findMatch', 'find_match');
        });
        it('can only be called once', function(){
            testOnlyOnce('findMatch');
        });
    });

    describe('#ready', function(){
        it('fires "player_ready"', function(){
            var events = [];
            var mockWs = createMockWs(events);
            var comms = new Comms(mockWs);

            mockWs.__fireEvent('match_found');
            comms.ready();
            expect(events[0]).to.be.eql('player_ready');
        });

        it('can only be fired once', function(){
            testOnlyOnce('ready', function(comms, mockWs){
                mockWs.__fireEvent('match_found');
            });
        });

        it("can't do ready before 'match_found' event comes in", function(){
            var events = [];
            var comms = new Comms(createMockWs(events));

            comms.ready();
            expect(events.length).to.be.eql(0);
        });

    });


    function testEvent(socketEvent, expectedEvent, done){
        var mockWs = createMockWs()
        var comms = new Comms(mockWs);

        comms.addStateChangeListener(function(state){
            expect(state).to.be.eql(expectedEvent);
            done()
        });

        mockWs.__fireEvent(socketEvent);

    }
    describe('event "match_found"', function(){
        it('fires a stateChangedEvent with "beginReadyProcess"', function(done){
            testEvent('match_found', 'beginReadyProcess', done);
        });
        it('does not fire any more events after this one', function(){
            var mockWs = createMockWs();
            var comms = new Comms(mockWs);
            var callcount = 0;
            comms.addStateChangeListener(function(){
                callcount++;
            });
            mockWs.__fireEvent('match_found');
            mockWs.__fireEvent('match_found');

            expect(callcount).to.be.eql(1);
        });
    });

    describe('event "start_character_selection"', function(){
        it('fires a stateChangedEvent with "beginGame"', function(done){
            testEvent('start_character_selection', "beginGame", done);
        });
        it('does not fire any more events after this one', function(){
            var mockWs = createMockWs();
            var comms = new Comms(mockWs);
            var callcount = 0;
            comms.addStateChangeListener(function(){
                callcount++;
            });
            mockWs.__fireEvent('start_character_selection');
            mockWs.__fireEvent('match_found');

            expect(callcount).to.be.eql(1);
        });

        it('does not emit anthing after "start_character_selection"', function(){
            var events = [];
            var mockWs = createMockWs(events);
            var comms = new Comms(mockWs);
            mockWs.__fireEvent('start_character_selection');

            comms.ready();
            comms.findMatch();

            expect(events.length).to.be.eql(0);

        });
    });

    describe('event "end_match"', function(){
        function configForEndMatch(comms, mockWs){
            comms.findMatch();
            mockWs.__fireEvent('match_found');
            comms.ready();
            mockWs.__fireEvent('start_character_selection');

        }
        it('resets the state for the comms', function(){
            var mockWs = createMockWs();
            var comms = new Comms(mockWs);
            configForEndMatch(comms, mockWs);

            mockWs.__fireEvent('end_match');
            expect(comms.gameStarted).to.be.false;
        });
        it('allows the process to be started again', function(){
            var events = [];
            var mockWs = createMockWs(events);
            var comms = new Comms(mockWs);
            configForEndMatch(comms, mockWs);

            mockWs.__fireEvent('end_match');

            comms.findMatch();

            expect(events[events.length-1]).to.be.eql('find_match');
        });
        it('fires stateChangedEvent with "endGame"', function(){
            var mockWs = createMockWs();
            var comms = new Comms(mockWs);
            configForEndMatch(comms, mockWs);

            var eventName = null;
            comms.addStateChangeListener(function(arg){
                eventName = arg;
            });

            mockWs.__fireEvent('end_match');

            expect(eventName).to.be.eql("endGame");
        });
        it('can only be handled after "start_character_selection"', function(){
            var mockWs = createMockWs();
            var comms = new Comms(mockWs);

            comms.findMatch();
            mockWs.__fireEvent('match_found');
            comms.ready();

            var callCount = 0;
            comms.addStateChangeListener(function(){
                callCount++
            });
            mockWs.__fireEvent('end_match');

            expect(callCount).to.be.eql(0);
        });
    });


});
