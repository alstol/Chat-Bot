class Message {
    constructor(text, isUser, isWarning) {
        this.text = text;
        this.isUser = isUser;
        this.isWarning = isWarning;
    }
}

class BotScenario {
    constructor(keywords, answer) {
        this.keywords = keywords;
        this.answer = answer;
    }
}

var chatBot = new Vue({
    el: "#chat",
    data: {
        currentMessage: "test",
        messages: [
            new Message(this.currentMessage, false, false)
        ],
        parseMessage: (message) => {
            this.messages.push(new Message(message, true));
            this.currentMessage = "";
            //if(this.commands.hasOwnProperty(message)) {  
                var wordsmatch = {};
                for(var x in this.commands) {
                    var commandWords = x.split(" ");
                    var messageWords = message.split(" ");
                    wordsmatch[x] = 0;
                    for(var i = 0; i < commandWords.length; i++) {
                        for(var y = 0; y < messageWords.length; y++) {
                            if(messageWords[y].toLowerCase() == commandWords[i].toLowerCase()) {
                                wordsmatch[x]++;
                            }
                        }
                    }
                    var highest = 0;
                    var highestKey = "";
                    for(var x in wordsmatch) {
                        if(wordsmatch[x] > highest) {
                            highest = wordsmatch[x];
                            highestKey = x;
                        }
                    }   
                }
                var reply = "Sorry, I'm not sure what you mean...";
                if(highestKey !== "")
                    reply = this.commands[highestKey];
    
                $timeout(() => this.messages.push(new Message(reply, false)), 1000);
            //} else {
                //console.log('Im here');
               // this.messages.push(new Message("Sorry, I'm not sure what you mean...", false));
           // }
        }
    },
    methods: {
        test: function() {
            console.log(this.currentMessage);
        }
    }
})
