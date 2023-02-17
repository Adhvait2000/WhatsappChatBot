const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});
 

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

function getWord()
{
    words = ['crazy', 'apple', 'chess', 'house', 'shake'];
    return words[Math.floor(Math.random()*words.length)]; 
}

//logic for how wordle works
function getResponse(input, word)
{
    let output = '⬜️⬜️⬜️⬜️⬜️';
    let output_l = output.split('');
    let word_l = word.split('');
    let input_l = input.split('');

    for(let i=0; i<5; i++)
    {
        if(word_l[i] == input_l[i])
        {
            output_l[i] = '🟩';
            word_l[i] = '#';
            input_l[i] = '*';
        }
    }

    for(let i=0; i<5; i++)
    {
        for(let j=0; j<5; j++)
        {
            if(input_l[i] == word_l[j])
            {
                output_l[i] = '🟧';
                input_l[i] = '*';
                word_l[j] = '#';
            }
        }
    }
    return output_l.join('');
}

word = getWord();

client.on('message', msg=>{
    guess = msg.body;
    response = getResponse(guess, word);
    if(guess.length != 5)
    {
        client.sendMessage(message.from, 'Please enter a 5 letter word');
    }
    else if(chances == 5)
    {
        client.sendMessage(message.from, 'You have no more chance');
    }
    else
    {
        response = getResponse(guess, word);
        client.sendMessage(msg.from, response);
        chances +=1;
    }
});

client.initialize();
 