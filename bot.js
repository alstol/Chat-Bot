class Message {
  constructor (text, isUser, isWarning) {
    this.text = text
    this.isUser = isUser
    this.isWarning = isWarning
  }
}

class BotScenario {
  constructor (keywords, answer) {
    this.keywords = keywords
    this.answer = answer
  }
}

var chatBotApp = angular.module('chatBotApp', [])

chatBotApp.controller('ChatBotController', function ChatBotController (
  $scope,
  $timeout
) {
  $scope.currentMessage = ''

  $scope.messages = [
    new Message(
      "Hello! I am a random chat bot. \n Write 'help' in chat to see what I can do",
      false,
      false
    )
  ]

  $scope.getChatClass = (isUser, isWarning) => {
    return isUser ? 'user' : isWarning ? 'warning' : 'bot'
  }

  $scope.commands = {
    hello: 'Hello there :)',
    help:
      'This part is still under construction. You can say hello or you can ask me to tell you something about myself. You can also ask me to do something fancy, which will call an alert function.',
    about:
      'I am a random chatbuilt built by Alin Stefan Olaru for a hackaton. He liked me so much that he decided to make a standalone version of me and publish it on GitHub',
    'Who are you':
      'Hello, I am some random bot and I was made during a hackaton. Beep boop.',
    'do something fancy': () => {
      $timeout(() => {
        $scope.messages.push(
          new Message("Not sure what I can do, but here's an alert", false)
        )
        alert('wub')
      }, 500)
    }
  }
  $scope.chatScrollBottom = () => {
    $('#chat .body').animate({ scrollTop: $(document).height() }, 1000)
  }
  $scope.parseMessage = message => {
    $scope.messages.push(new Message(message, true))
    $scope.chatScrollBottom()
    $scope.currentMessage = ''
    // if(this.commands.hasOwnProperty(message)) {
    var wordsmatch = {}
    for (var x in $scope.commands) {
      var commandWords = x.split(' ')
      var messageWords = message.split(' ')
      wordsmatch[x] = 0
      for (var i = 0; i < commandWords.length; i++) {
        for (var y = 0; y < messageWords.length; y++) {
          if (messageWords[y].toLowerCase() == commandWords[i].toLowerCase()) {
            wordsmatch[x]++
          }
        }
      }
      var highest = 0
      var highestKey = ''
      for (var x in wordsmatch) {
        if (wordsmatch[x] > highest) {
          highest = wordsmatch[x]
          highestKey = x
        }
      }
    }
    var reply = "Sorry, I'm not sure what you mean..."
    if (highestKey !== '') reply = $scope.commands[highestKey]
    if (typeof reply === 'string') {
      $timeout(() => $scope.messages.push(new Message(reply, false)), 500)
    } else if (typeof reply === 'function') {
      reply()
    }
    $scope.chatScrollBottom()
    // } else {
    // this.messages.push(new Message("Sorry, I'm not sure what you mean...", false));
    // }
  }
})
