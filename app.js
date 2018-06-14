const fonts = require('./fonts.js');
const telebot = require('telebot');
const bot =  new telebot(process.env.KEY);
const markupSymbols = ['t','s','-','b','i', 'f','m','u'];

bot.on('inlineQuery', (msg) => {
    let query = msg.query;

    const answers = bot.answerList(msg.id);
    
    var tinyMessage = makeTiny(query);
    var smallCapsMessage = makeSmallCaps(query);
    var strikeThroughMessage = makeStrikeThrough(query);
    var fullWidthMessage = makeFullWidth(query);
    var mockMessage = makeMock(query);
    var underLineMessage = makeUnderline(query);
    

    answers.addArticle({
        id: 'query',
        title: 'Bold',
        description: '\**' + query + '\**',
        message_text: '*'+ query + '*',
        parse_mode: 'Markdown', 
        thumb_url: 'https://image.ibb.co/iXEoA8/Slide1.png'
    });

    answers.addArticle({
        id: "italics",
        title: 'Italics',
        description: '_' + query + '_',
        message_text: '_' + query + '_',
        parse_mode: 'Markdown',
        thumb_url:'https://image.ibb.co/fvPYco/Slide2.png'
    });

    answers.addArticle({
        id: "superscript",
        title: 'Superscript',
        description: tinyMessage, 
        message_text: tinyMessage,
        thumb_url:'https://image.ibb.co/hkzc3T/Slide3.png'
    });

    answers.addArticle({
        id: "smallCaps",
        title: 'Small Caps',
        description: smallCapsMessage,
        message_text: smallCapsMessage,
        thumb_url:'https://image.ibb.co/n26PiT/Slide4.png'
    });

    answers.addArticle({
        id:"strikeThrough",
        title:'Strike Through',
        description:strikeThroughMessage,
        message_text: strikeThroughMessage,
        thumb_url:'https://image.ibb.co/dnKMV8/Slide5.png'
    });

    answers.addArticle({
        id:'underline',
        title:'Underline',
        description: underLineMessage,
        message_text: underLineMessage,
        parse_mode:'Markdown',
        thumb_url:'https://image.ibb.co/n4Vvq8/Slide6.png'

    });

    answers.addArticle({
        id:'fullWidth',
        title:'Full Width',
        description: fullWidthMessage,
        message_text: fullWidthMessage,
        thumb_url:'https://image.ibb.co/mZPMV8/Slide7.png'
    })

    answers.addArticle({
        id:'mock',
        title:'Mock text',
        description: mockMessage,
        message_text: mockMessage,
        thumb_url:'https://image.ibb.co/jdhVOT/Slide8.png' 
    })

    answers.addArticle({
        id:'custom',
        title:'Custom Formatting',
        description:"Message bot for tutorial",
        message_text: makeCustom(query),
        parse_mode:'Markdown',
        thumb_url:'https://image.ibb.co/e7Lv7o/Slide9.png'
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

bot.on(/^\/under (.+)$/, (msg, props) => {
    const text = props.match[1];
    return bot.sendMessage(msg.from.id, makeUnderline(text));
});

bot.on(/^\/full (.+)$/, (msg, props) => {
    const text = props.match[1];
    return bot.sendMessage(msg.from.id, makeFullWidth(text));
});

bot.on(/^\/mock (.+)$/, (msg, props) => {
    const text = props.match[1];
    return bot.sendMessage(msg.from.id, makeMock(text));
});

bot.on(/^\/custom (.+)$/, (msg, props) => {
    const text = props.match[1];
    return bot.sendMessage(msg.from.id, makeCustom(text), {parseMode:'Markdown'});
});

bot.on('/customhelp', (msg,props) => {
    return bot.sendMessage(msg.from.id, fonts.customHelpText, {parseMode:'Markdown'});
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
    let mostRecentChar;
    messageText = ' ' + messageText + ' ';
    for (let i = 0; i < messageText.length; i++){
        currentChar = messageText.charAt(i);
        currentCharAsStrike = fonts.strikeThrough[currentChar];
        if(currentCharAsStrike){ //check if strike through equivalent exists
            if (mostRecentChar === ' '){ //start of a new word no need to cut down on strike through
                strikeThroughMessage+=currentCharAsStrike;
            }else{
                if(i === messageText.length - 1){ 
                    strikeThroughMessage+=currentCharAsStrike; //if last char, add strike through as is 
                }else{
                    strikeThroughMessage+=currentCharAsStrike.substring(1,3); //to prevent spacing issues within words, cut down on extra strike through
                }
                mostRecentChar = currentChar; //update most recent char
            }

        }else{
            strikeThroughMessage+=currentChar; //if not add the current char as is 
        }
    }
    return strikeThroughMessage;
}

/**
 * Method to convert a string into unicode full width text. Items that can't be converted will be left as is. 
 * @param {string} messageText string to be converted to full width text
 */
var makeFullWidth = (messageText) => {
    let fullWidthMessage = '';
    for(let i = 0; i < messageText.length; i++){
        currentChar = messageText.charAt(i);
        currentCharAsFullWidth = fonts.fullWidth[currentChar];
        if(currentCharAsFullWidth){
            fullWidthMessage+=currentCharAsFullWidth;
        }else{
            fullWidthMessage+=currentChar;
        }
    }
    return fullWidthMessage;
}

/**
 * Method to alternate case of each letter in a string. Items that can't be case shifted will be left as is
 * @param {string} messageText string to alternate case with
 */
var makeMock = (messageText) => {
    let mockMessage = '';
    messageText=messageText.toLowerCase();
    for (let i = 0; i < messageText.length; i++){
        currentChar = messageText.charAt(i);
        if(i%2 === 1){
            mockMessage+=currentChar.toUpperCase();
        }else{
            mockMessage+=currentChar.toLowerCase();
        }
    }
    return mockMessage; 
}

/**
 * Method to underline each letter in a string. Items that can't be underlined will be left as is. 
 * @param {string} messageText string to underline
 */
var makeUnderline = (messageText) => {
    let underMessage = '';

    for (let i = 0; i < messageText.length; i++){
        currentChar = messageText.charAt(i);
        currentCharAsUnder = fonts.underLine[currentChar];
        if (currentCharAsUnder){
            underMessage+=currentCharAsUnder;
        }else{
            underMessage+=currentChar;
        }
    }
    
    return underMessage;
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
            break;
        case 'f':
            return makeFullWidth(message);
            break;
        case 'm':
            return makeMock(message);
            break;
        case 'u':
            return makeUnderline(message);
        default:
            return message;
    }
}

bot.start();