const telebot = require('telebot');
const apikey = require('./apikey');
const bot =  new telebot(apikey.KEY);
const fonts = require('./fonts.js');

bot.on('inlineQuery', (msg) => {
    //console.log(JSON.stringify(msg, undefined, 4));
    let query = msg.query;

    const answers = bot.answerList(msg.id);

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
        description: makeTiny(query), 
        message_text: makeTiny(query)
    });

    return bot.answerQuery(answers);


});

var makeTiny = (messageText) => {
    let tinyMessage = '';
    let currentChar;
    messageText = messageText.toLowerCase();
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

bot.start();