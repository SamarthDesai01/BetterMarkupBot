# BetterMarkupBot
BetterMarkupBot or [@BarkupBot](https://telegram.me/BarkupBot) for short is a Telegram Bot written in Node.js designed to offer powerful formatting and markup tools available anywhere on the platform.

## Use
Barkup offers text formatting tools far beyond what Telegram natively offers. Besides the usual bold and italic formatting options built into Telegram by default Barkup also includes superscript, small caps, strike through, underline, unicode full width, and mock text formatting options. 

These tools are available via direct messaging to the bot or via inline queries so you can access these options within any conversation on Telegram. 

### Direct Message Command List
Each command followed by your message will cause the bot to reply with your exact message in the formatting option you specified. 

|Command   |     Output        |Tag|
|----------|------------------|---|
|/bold     |Bold text         |(b)|
|/italics  |Italicized text   |(i)|
|/tiny     |Superscript text  |(t)|
|/smallcaps|Small caps text   |(s)|
|/strthr   |Strike through text|(-)|
|/under    |Underlined text    |(u)|
|/full     |Full width text    |(f)|
|/mock     |mOcK tExT          |(m)|
|/australian |Australian text  |(a)|
|/custom   |Custom formatted text|N/A|
|/customhelp|Custom use guide|   N/A|

### Inline Query Use
The bot can be accessed from any chat and doesn't require any commands to be inputted. Simply type:

`@BarkupBot Your Message`

and you'll immediately be greeted with all the formatting options available to you in Direct Message mode as such:

![Inline](https://image.ibb.co/nKZZ5J/Capture.png)

### Using The Custom Formatting Option

Barkup's most unique feature is its ability to only format certain words instead of applying a specified formatting option to the entire message. This gives the user immense flexibility in utilizing Barkup's many formatting options.

Barkup utilizes its own easy to use tag system to specify your desired formatting and where you'd like to apply it.

Simply place anything you'd like between the appropriate tags and Barkup will take care of the rest. 

Examples:

`/custom The name is Bond.  (i)James, Bond.(i)`

![Custom Formatting Bot](https://image.ibb.co/ev5DFJ/customformatting.png)

```
//Select the Custom Formatting Option within the inline query list to make this work
@BarkupBot Barkup Bot is (-)a great(-) the (b)best(b) way to (i)format(i) text!
```

![Custom Formatting Inline](https://image.ibb.co/fAdN9d/customformattinginline.png)




