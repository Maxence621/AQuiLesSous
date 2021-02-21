const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();



 

client.on('ready', () => {

    console.log('I am ready!');

});

 

client.on('message', message => {

    if (message.content === '!pancakes') {

       message.reply('Tu veux un pancake ? :pancakes:');

       }

});

client.on('message', message => {

    if (message.content === '!bluehelp') {

       message.reply('> ***Bonjour toi !*** voila l\'aide que tu m\'a demander :\n > \n > "**!bluehelp**" : Permet de voir les commandes disponibles\n > "**!ajouterDette <Utilisateur> <dette>**" : Permet d\'ajouter une dette\n > "**!afficherDette**" : Permet de voir les dettes à rembourser');

       }

});


client.on('message', message => {

    if (message.content === '!afficherDette') {
     
     
     fs.readFile('./dette.json', 'utf-8', function(err, data) {
  if (err) throw err

  var arrayOfObjects = JSON.parse(data)
  arrayOfObjects.users.push({
    auteur: "Noemie",
    dette: 2900,
    pseudo: "akityio"
  })

  console.log(arrayOfObjects.users[0])

  fs.writeFile('./dette.json', JSON.stringify({arrayOfObjects},null ,3), 'utf-8', function(err) {
    if (err) throw err
    console.log('Done!')
  })
})
    
    }

});



client.on('message', message => {

    if (message.content === '!coucou') {

       message.reply('Bouh! :ghost:');

       }

});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
