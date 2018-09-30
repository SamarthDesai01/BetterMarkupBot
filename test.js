var str = "test is a meme";
var finalMessage = "";
const underLine ='\u0332';
for(var i = 0; i < str.length; i++){
    var currChar = str.charAt(i);
        finalMessage+=currChar;
        finalMessage+=underLine;
}


console.log(underLine + 's' + underLine + 'h' + underLine + 'i' + underLine + ' ' + underLine);

console.log(finalMessage);