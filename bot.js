const Promise = require('bluebird')
const AppDAO = require('./dao')
const TaskRepository = require('./task_repository')
const dao = new AppDAO('./database.sqlite3')
const taskRepo = new TaskRepository(dao)

let taskId

var string ="";
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var pseudo ="";
var sous ="";
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: BOT_TOKEN,
   autorun: true
});


bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});





bot.on('message', function (user, userID, channelID, message, evt) { 
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch(cmd) {
            case 'commandes':
            bot.sendMessage({
                to: channelID,
                message: '> ***Bonjour toi !*** voila l\'aide que tu m\'a demander :\n > \n > "**!commandes**" : Permet de voir les commandes disponibles\n > "**!ajouterDette <Utilisateur> <dette>**" : Permet d\'ajouter une dette\n > "**!afficherDette**" : Permet de voir les dettes à rembourser'
            });
            break;
            // Ajouter si vous souhaitez d’autres commandes
        }
    }
});



bot.on('message', function (user, userID, channelID, message, evt) {
    if (message.startsWith("!afficherDette")) {
        console.log(message.substr(6));
 
           string+='> **Voici la liste de tes dettes !**\n '
     

        taskRepo.createTable()
        .then(() => taskRepo.getAll())
        .then((tasks) => {
          return new Promise((resolve, reject) => {


            tasks.forEach((task) => {
                var pseudo = (`${task.name}`)
                var dette = (`${task.dette}`)

                
                
                string+='> '+pseudo+'         ***Dette : ***'+dette+'€\n ';


            })

                bot.sendMessage({
                    to: channelID,
                    message:string
                    //'> '+pseudo+'         ***Dette : ***'+dette+'€'
                    
                });


        })
          resolve('success')
      })
        .catch((err) => {
          console.log('Error: ')
          console.log(JSON.stringify(err))
      })
    }


});


bot.on('message', function (user, userID, channelID, message, evt) {
    if (message.startsWith("!ajouterDette")) {
        console.log(message.substr(6));


        var Donnee = message.split(' ');
        Utilisateur = Donnee[1];
        Dette = Donnee[2];



        taskRepo.createTable()
        .then(() => taskRepo.createTable())
        .then((data) => {
          taskId = data.id
          const tasks = [
          {
              name: Utilisateur,
              dette: Dette,
              taskId
          }
          ]
          return Promise.all(tasks.map((task) => {
            const { name, dette, taskId } = task
            return taskRepo.create(name, dette, taskId)
        }))
      })



        bot.sendMessage({
            to: channelID,
            message: 'tu a normalement réussi ! n\'hésite pas a regarder avec "!afficherDette"'
        });


    }

});
