const Promise = require('bluebird')
const AppDAO = require('./dao')
const TaskRepository = require('./task_repository')
const dao = new AppDAO('./database.sqlite3')
const taskRepo = new TaskRepository(dao)
let taskId
var string ="";
var pseudo ="";
var sous ="";



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

       message.reply('> ***Bonjour toi !*** voila l\'aide que tu m\'a demander :\n > \n > "**!bluehelp**" : Permet de voir les commandes disponibles\n > "**!ajouterDette <Utilisateur> <dette>**" : Permet d\'ajouter une dette\n > "**!afficherDette**" : Permet de voir les dettes à rembourser');

       }

});


client.on('message', message => {

    if (message.content === '!afficherDette') {
     string+='> **Voici la liste de tes dettes !**\n '
     /*
     taskRepo.createTable()
        .then(() => taskRepo.getAll());
        .then((tasks) => {
          return new Promise((resolve, reject) => {
            tasks.forEach((task) => {
                var pseudo = (`${task.name}`);
                var dette = (`${task.dette}`);
                string+='> '+pseudo+'         ***Dette : ***'+dette+'€\n ';


            })
     
*/
       message.reply(string);

       }

});



client.on('message', message => {

    if (message.content === '!coucou') {

       message.reply('Bouh! :ghost:');

       }

});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
