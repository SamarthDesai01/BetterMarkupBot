const apikey = require('./apikey');
const fonts = require('./fonts.js');
const telebot = require('telebot');
const bot =  new telebot(apikey.KEY);
const markupSymbols = ['t','s','-','b','i'];

bot.on('inlineQuery', (msg) => {
    let query = msg.query;

    const answers = bot.answerList(msg.id);
    var tinyMessage = makeTiny(query);
    var smallCapsMessage = makeSmallCaps(query);
    var strikeThroughMessage = makeStrikeThrough(query);
    console.log(msg.query);

    answers.addArticle({
        id: 'query',
        title: 'Bold',
        description: '\**' + query + '\**',
        message_text: '*'+ query + '*',
        parse_mode: 'Markdown' 
    });

    answers.addArticle({
        id: "italics",
        title: 'Italics',
        description: '_' + query + '_',
        message_text: '_' + query + '_',
        parse_mode: 'Markdown'
    });

    answers.addArticle({
        id: "superscript",
        title: 'Superscript',
        description: tinyMessage, 
        message_text: tinyMessage
    });

    answers.addArticle({
        id: "smallCaps",
        title: 'Small Caps',
        description: smallCapsMessage,
        message_text: smallCapsMessage
    });

    answers.addArticle({
        id:"strikeThrough",
        title:'Strike Through',
        description:strikeThroughMessage,
        message_text: strikeThroughMessage
    });

    return bot.answerQuery(answers);
});


bot.on('/start', (msg, props) => {
    return bot.sendMessage(msg.from.id, fonts.startText);
})

bot.on(/^\/bold (.+)$/, (msg, props) => {
    const text = props.match[1];
    return bot.sendMessage(msg.from.id, "*" + text + "*", {parseMode: "Markdown"});
});

bot.on(/^\/italics (.+)$/, (msg, props) => {
    const text = props.match[1];
    return bot.sendMessage(msg.from.id,"_" + text + "_", { parseMode: "Markdown" });
});

bot.on(/^\/tiny (.+)$/, (msg, props) => {
    const text = props.match[1];
    return bot.sendMessage(msg.from.id, makeTiny(text));
});

bot.on(/^\/smallcaps (.+)$/, (msg, props) => {
    const text = props.match[1];
    return bot.sendMessage(msg.from.id, makeSmallCaps(text));
});

bot.on(/^\/strthr (.+)$/, (msg, props) => {
    const text = props.match[1];
    return bot.sendMessage(msg.from.id, makeStrikeThrough(text));
});

bot.on(/^\/custom (.+)$/, (msg, props) => {
    const text = props.match[1];
    return bot.sendMessage(msg.from.id, makeCustom(text), {parseMode:'Markdown'});
});


/**
 * Method to convert a string into superscript text. Items that can't be converted will be left as is.  
 * @param {string} messageText string to be converted into superscript text.
 */
var makeTiny = (messageText) => {
    let tinyMessage = '';
    let currentChar;
    for (let i = 0; i < messageText.length; i++){
        currentChar = messageText.charAt(i);
        currentCharTiny = fonts.superscript[currentChar];
        if(currentCharTiny){
            tinyMessage+=currentCharTiny;
        }
        else{
            tinyMessage+=currentChar;
        }
    }
    return tinyMessage;
}

/**
 * Method to convert a string into small caps text. Items that can't be converted will be left as is. 
 * @param {string} messageText string to be converted to small caps
 */
var makeSmallCaps = (messageText) => {
    let smallCapsMessage = '';
    let currentChar;
    messageText = messageText.toLowerCase();
    for (let i = 0; i < messageText.length; i++){
        currentChar = messageText.charAt(i);
        currentCharCaps = fonts.smallCaps[currentChar];
        if(currentCharCaps){
            smallCapsMessage+=currentCharCaps;
        }
        else{
            smallCapsMessage+= currentChar;
        }
    }
    return smallCapsMessage;
}

/**
 * Method to convert a string into strike through text. Items that can't be converted will be left as is.
 * @param {string} messageText string to be converted to strike through
 */
var makeStrikeThrough = (messageText) => {
    let strikeThroughMessage = '';
    let currentChar;
    for (let i = 0; i < messageText.length; i++){
        currentChar = messageText.charAt(i);
        currentCharAsStrike = fonts.strikeThrough[currentChar];
        if(currentCharAsStrike){ //check if strike through equivilent exists
            strikeThroughMessage+=currentCharAsStrike;
        }else{
            strikeThroughMessage+=currentChar; //if not add the current char as is 
        }
    }
    return strikeThroughMessage;
}
/**
 * Method to have granular markup control. Reads for 3 char long sequences to denote how to markup certain chunks of text
 * @param {string} messageText string to be converted
 */
var makeCustom = (messageText) => {
    let customMessage = '';
    let currentChar;
    for(let i = 0; i < messageText.length; i++){
        
        currentChar = messageText.charAt(i);
        
        if(currentChar === '('){ //if we encounted (, see if user is trying to trigger markup
            
            let checkMarkup = messageText.substring((i+1),(i+3));//get the next two chars to capture the markup trigger
            let markupSymbol = containsMarkUpSymbol(checkMarkup) 
            
            if(markupSymbol){ //found markup! now see if we can find it closing something
                
                let messagePastMarkup = messageText.substring(i+3); //get the remainder of the message past our first markup trigger
                if(messagePastMarkup.includes('(' + markupSymbol + ')')){
                   
                    let endMarkUp = messagePastMarkup.indexOf('(' + markupSymbol + ')');
                    let markupMessage = messageText.substring((i+3), i + endMarkUp + 3);
                    
                    customMessage+=getMarkupText(markupSymbol, markupMessage);
                    
                    i+=(markupMessage.length + 5); //skip over the entire markup portion we just added, no need to process again
                }
                else{
                    customMessage+=currentChar; //found markup trigger but no ending trigger, so add as is
                }
            }
            else{
                customMessage+=currentChar;
            }
        }
        else{
            customMessage+=currentChar;
        }
    }
    return customMessage;
}

var containsMarkUpSymbol = (messageText) => {
    let markupSymbol;
    let tempSymbol = messageText.charAt(0);
    let checkParenthesis = messageText.charAt(1);
    let containsMarkUp = false;
    let index = 0; 
    
    while(!containsMarkUp && index < markupSymbols.length){
        if(markupSymbols[index] === tempSymbol && (checkParenthesis === ')')){
            containsMarkUp = true; 
            markupSymbol=tempSymbol;
        }
        index++;
    }

    
    return markupSymbol; //return the markup symbol we found, undefined if not found

}

var getMarkupText = (markupSymbol, message) => {
    switch(markupSymbol){
        case 't':
            return makeTiny(message);
            break;
        case 's':
            return makeSmallCaps(message);
            break;
        case '-':
            return makeStrikeThrough(message);
            break;
        case 'b':
            return '*' + message + '*';
            break;
        case 'i':
            return '_' + message + '_';
        default:
            return message;
    }
}

bot.start();