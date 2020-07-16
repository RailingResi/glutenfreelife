// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const welcomeGreetings = ['Welcome at glutenfree life. Do you want to eat out, cook by yourself or get information about gluten intolerance?', 'Hey there! Do you want to eat out, cook by yourself or get information about gluten intolerance?', 'Oh its you once again! Do you want to eat out, cook by yourself or get information about gluten intolerance?'];
const fishRecipes = ['I would suggest roasted salmon with parsley potatoes. Therefore you need: Salmon, Potatoes, Parsil, olive oil, salt and lemon.', 'I would suggest pasta with zucchini and shrimps. Therefore you need: glutenfree pasta, tiny shrimps, zucchini, salt and pepper', 'I would suggest baked fish fingers. Therefore you need: white fish fillets, eggs, ground almonds, lemon, garlic, sea salt and black pepper'];
const meatRecipes = ['I would suggest Thai chicken curry with pineapple. Therefore you need: Chickenbreast, Pineapples, carrots, ginger, Coconut milk and curry paste.', 'What about glutenfree Schnitzel? Therefore you need: chicken breast, eggs, almond meal, tapioca flour, paprika, oregano, salt, pepper and coconut oil for the pan'];
const vegetablesRecipes = ['I would suggest fried rice. Therefore you need: Rice, glutenfree soy sauce, carrots, zucchini, bean sprouts, olive oil, salt and peanuts.', 'What about a vegetable mix? Therefore you need: all your favourite vegetables, this could be: potatoes, zucchini, tomatoes, broccoli and others.'];


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = randomPhrases(welcomeGreetings);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const GlutenfreeLifeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GlutenfreeLifeIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Gluten is a protein in cereals such as wheat, barley, and rye. A person with gluten intolerance or sensitivity may experience pain and bloating after eating foods that contain gluten! For more information please consult the internet';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
const RestaurantIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RestaurantIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'There are several Restaurants in your range. You could go to Restaurant zum Wohl, Pizzeria da Marco, The Green Garden. They all offer gluten-free food';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
const RecipeIntentHandler = {


    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RecipeIntent';
    },
    handle(handlerInput) {

        const speakOutput = 'Which main ingredient do you want to cook with? Meat? Fish or Vegetables?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Are you still thinking about it? Which ingredient would you like to coo with? Meat? Fish? or Vegetables?')
            .getResponse();
    }
};

const FishIntentHandler = {

    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'FishIntent';
    },
    handle(handlerInput) {

        const speakOutput = randomPhrases(fishRecipes);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};


const MeatIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MeatIntent';
    },
    handle(handlerInput) {

        const speakOutput = randomPhrases(meatRecipes);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }

};


const VegetablesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'VegetablesIntent';
    },
    handle(handlerInput) {
            const speakOutput = randomPhrases(vegetablesRecipes);
            return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
                .getResponse();
        }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye, see you next time!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        GlutenfreeLifeIntentHandler,
        RestaurantIntentHandler,
        RecipeIntentHandler,
        FishIntentHandler,
        MeatIntentHandler,
        VegetablesIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();

function randomPhrases(myData) {
    var i = 0;
    i = Math.floor(Math.random() * myData.length);
    return (myData[i]);
}
