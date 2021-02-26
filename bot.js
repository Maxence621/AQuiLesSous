const fs = require('fs');
const Discord = require('discord.js');
const bot = new Discord.Client();

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();












 

bot.on('ready', () => {

    console.log('I am ready!');

});

 

bot.on('message', message => {

    if (message.content === '!pancakes') {

       message.reply('Tu veux un pancake ? :pancakes:');

       }

});



bot.on('message', message => {

    if (message.content === '!test') {

       message.reply('oui tu as bien lancé le bot test !');

    }

});


const prefix = '!'; 

bot.on('message', message => {
  var IdAuteur = message.author.id;

  if (!message.content.startsWith(prefix)) return;
  const args = message.content.trim().split(/ +/g);
  const cmd = args[0].slice(prefix.length).toLowerCase(); 

  if (cmd === 'ajouterdette') {
    if (!args[1]) return message.reply('Veuillez ajouter des arguments !');
    if (args[4]) return message.reply('\n > Tu a mis trop d\'arguments !\n > "!ajouterdette <Dette> <Pseudo>" ');


   // console.log(message.author.id);
   //console.log(IdAuteur);

  	var dette = args[1];
  	var pseudo_dette = args[2];




     client.query("INSERT INTO utilisateur (auteur, dette, pseudo_dette) VALUES ('"+IdAuteur+"','"+dette+"','"+pseudo_dette+"')", (err, res) => {
  		if (err){
  			throw err;
  			message.channel.send("une erreur est survenue !");
  			console.log(IdAuteur+","+args[1]+","+args[2]);
  		} 
  		for (let row of res.rows) {
  		  console.log(JSON.stringify(row));
  		}
  		client.end();
	});

    
   
    }

});





bot.on('message', message => {

    if (message.content === '!afficherdette') {
      var fs = require('fs');
      var IdAuteur = message.author.id;
      var string= "\n > Voici la liste de tes dette "+"<@"+IdAuteur+"> ! \n";

     
      client.query("SELECT * FROM utilisateur WHERE auteur ='"+IdAuteur+"'", (err, res) => {
  		if (err){
  			throw err;
  			message.channel.send("une erreur est survenue !");
  			console.log(IdAuteur+","+args[1]+","+args[2]);
  		} 
  		for (let row of res.rows) {
  			string+= " > ***Dette : ***"+JSON.stringify(row.dette)+" ***Joueur a remboursé : ***"+JSON.stringify(row.pseudo_dette)+" \n \n ";
  		  
  		}
  		message.channel.send(string);
  		client.end();
	});


    }
});





bot.on('message', message => {

    if (message.content === '!coucou') {

       message.reply('Bouh! :ghost:');

       }

});

 

// THIS  MUST  BE  THIS  WAY

bot.login(process.env.BOT_TOKEN);//BOT_TOKEN is the bot Secret
