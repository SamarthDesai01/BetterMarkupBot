const telebot = require('telebot');
const apikey = require('./apikey');
const bot =  new telebot(apikey.KEY);
const fonts = require('./fonts.js');

bot.on('inlineQuery', (msg) => {
    let query = msg.query;

    const answers = bot.answerList(msg.id);
    var tinyMessage = makeTiny(query);
    var smallCapsMessage = makeSmallCaps(query);
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
    })

    return bot.answerQuery(answers);


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

bot.start();