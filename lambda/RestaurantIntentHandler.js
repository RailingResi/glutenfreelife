const message = require('./messagesRestaurant');

module.exports = {
    'Unhandled'() {
        if (this.handler.state) {
            // pass to state specific 'Unhandled' handler
            this.emitWithState('Unhandled');
        } else {
            // default 'Unhandled' handling
            this.emit(':ask', message.HELP_MESSAGE, message.HELP_MESSAGE);
        }
    },
    'RestaurantIntent'() {

        canHandle(handlerInput)
        {
            return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RestaurantIntent';
        }

        handle(handlerInput)
        {
            const speakOutput = 'There are several Restaurants in your range. You could go to Restaurant zum Wohl, Pizzeria da Marco, The Green Garden. They all offer gluten-free food';
            this.attributes.lastSpeechOutput = speakOutput;
            return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
                .getResponse();
        }


    },
    'AMAZON.RepeatIntent'() {
        this.response.speak('I just repeat what I asked you' + this.attributes.lastSpeechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.PauseIntent'() {

    },
    'AMAZON.YesIntent'() {

    },
    'AMAZON.HelpIntent'() {
        const speechOutput = message.HELP_MESSAGE;
        const reprompt = message.HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent'() {
        this.response.speak(message.STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent'() {
        this.response.speak(message.STOP_MESSAGE);
        this.emit(':responseReady');
    }
}