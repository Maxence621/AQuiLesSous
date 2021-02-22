const fs = require('fs');
const Discord = require('discord.js');
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

       message.reply('> ***Bonjour toi !*** voila l\'aide que tu m\'a demander :\n > \n > "**!bluehelp**" : Permet de voir les commandes disponibles\n > "**!ajouterDette <dette> <Utilisateur> **" : Permet d\'ajouter une dette\n > "**!afficherDette**" : Permet de voir les dettes à rembourser');

    }

});


const prefix = '!'; 

client.on('message', message => {
  var fs = require('fs');
  var IdAuteur = message.author.id;

  if (!message.content.startsWith(prefix)) return;
  const args = message.content.trim().split(/ +/g);
  const cmd = args[0].slice(prefix.length).toLowerCase(); 

  if (cmd === 'ajouterdette') {
    if (!args[1]) return message.reply('Veuillez ajouter des arguments !');
    if (args[4]) return message.reply('\n > Tu a mis trop d\'arguments !\n > "!ajouterdette <Dette> <Pseudo>" ');


    console.log(message.author.id);
    
    var fs = require('fs')
     fs.readFile('./dette.json', 'utf-8', function(err, data) {
       if (err) throw err

     var arrayOfObjects = JSON.parse(data);
  var Taille = Object.keys(arrayOfObjects.users).length;
     arrayOfObjects.users.push({
       auteur: IdAuteur,
       dette: args[1],
       pseudo: args[2]
     })

     
     if(Taille==Object.keys(arrayOfObjects.users).length){
      message.channel.send("une Erreur est survenue, veuillez réessayer ! ");
     }else{
      message.channel.send("Tu as bien ajouté cette dette !");
     }


    


  fs.writeFile('./dette.json', JSON.stringify(arrayOfObjects, null, 2), 'utf-8', function(err) {
    if (err) throw err
    console.log('Done! @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
  })
})
   
    }

});





client.on('message', message => {

    if (message.content === '!afficherdette') {
      var fs = require('fs');
      var IdAuteur = message.author.id;
      var string= "> Voici la liste de tes dette "+"<@"+IdAuteur+"> ! \n";

       fs.readFile('dette.json', 'utf-8', function(err, data) {
       if (err) throw err
      var arrayOfObjects = JSON.parse(data);
      var Taille = Object.keys(arrayOfObjects.users).length;
  
        for (var i = 0; i < Taille; i++) {
             if(IdAuteur == arrayOfObjects.users[i].auteur){
              console.log(arrayOfObjects.auteur[i]);
              console.log(arrayOfObjects.users[i]);
              console.log(arrayOfObjects.dette[i]);
              console.log('boucle i : '+ i);
              string += "> ***Dettes :*** "+arrayOfObjects.users[i].dette+"\n > ***à remboursé à : ***"+arrayOfObjects.users[i].pseudo+"\n\n ";
             }else{
              console.log("Boucle i :"+i);
              console.log("Taille :"+Taille);
              console.log(arrayOfObjects.auteur[i]);
              console.log(arrayOfObjects.users[i]);
              console.log(arrayOfObjects.dette[i]);
             }
        }
        message.channel.send(string);
        
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
