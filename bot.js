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

	if (message.content === '!bluehelp') {

		message.reply('salut ! voici la liste de mes commandes : \n\n > "***!afficherdette***" : Affiche une liste de tes dettes personnelles \n > "***!ajouterdette <dette> <pseudo_du_joeur_a_rembourser>***" : Ajoute une dette dûe a un joueur \n > "***!modifierdette <nouvelle_dette> <pseudo_du_joeur_a_rembourser>***" : modifie la dette choisis avec le nouveau montant');

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


		var dette = args[1];
		var pseudo_dette = args[2];
		var correct0="0";


		
		client.query("select Count(*) from utilisateur where auteur='"+IdAuteur+"' and pseudo_dette='"+pseudo_dette+"'", (err, res) => {
			
			for (let row of res.rows) {
				if(row.count===correct0){
					console.log(row.count);
					client.query("INSERT INTO utilisateur (auteur, dette, pseudo_dette) VALUES ('"+IdAuteur+"','"+dette+"','"+pseudo_dette+"')", (err, res) => {
						if (err){
							throw err;
							message.channel.send("une erreur est survenue !");
							console.log(IdAuteur+","+args[1]+","+args[2]);
						} 
						for (let row of res.rows) {
							console.log(JSON.stringify(row));
						}
						message.channel.send("> tu as bien ajouté une dette "+"<@"+IdAuteur+"> ! \n > n'hésite pas a vérifié si tu ne l'a pas mis en double : '!afficherdette' ");

					});	

					
				}else{
					message.channel.send("> vous avez déja une dette avec cette personne, veuillez la modifier a la place ('!bluehelp')");
					
				}
			}
		});	






	};
});






bot.on('message', message => {
	var IdAuteur = message.author.id;

	if (!message.content.startsWith(prefix)) return;
	const args = message.content.trim().split(/ +/g);
	const cmd = args[0].slice(prefix.length).toLowerCase(); 

	if (cmd === 'modifierdette') {

		if (!args[1]) return message.reply('Veuillez ajouter des arguments !');
		if (args[4]) return message.reply('\n > Tu a mis trop d\'arguments !\n > "!ajouterdette <Dette> <Pseudo>" ');
		var correct1="1";

		var dette = args[1];
		var pseudo_dette = args[2];


		client.query("select Count(*) from utilisateur where auteur='"+IdAuteur+"' and pseudo_dette='"+pseudo_dette+"'", (err, res) => {
			
			for (let row of res.rows) {
				if(row.count===correct1){
					console.log(row.count);
					client.query("UPDATE utilisateur  SET dette = '"+dette+"'  WHERE  auteur='"+IdAuteur+"' AND pseudo_dette='"+pseudo_dette+"'", (err, res) => {
						if (err){
							throw err;
							message.channel.send("une erreur est survenue !");
							console.log(IdAuteur+","+args[1]+","+args[2]);
						} 
						for (let row of res.rows) {
							console.log(JSON.stringify(row));
						}
						message.channel.send("> AAAAAAAAAAAAAtu as bien modifier une dette "+"<@"+IdAuteur+"> ! \n");

					});	

				}else{
					message.channel.send("> AAAAAAAA ");
					
				}
			}

		});	



	};
});







bot.on('message', message => {

	if (message.content === '!afficherdette') {
		var IdAuteur = message.author.id;
		var string= " > Voici la liste de tes dette "+"<@"+IdAuteur+"> ! \n";


		client.query("SELECT * FROM utilisateur WHERE auteur ='"+IdAuteur+"'", (err, res) => {
			
			if (err){

				message.channel.send("une erreur est survenue !");
				throw err;
				console.log(IdAuteur+","+args[1]+","+args[2]);
			} 
			for (let row of res.rows) {
				
				string+= " > ***Dette : ***"+JSON.stringify(row.dette)+" ***Joueur a remboursé : ***"+JSON.stringify(row.pseudo_dette)+" \n ";

			}
			message.channel.send(string);

		});


	}
});



bot.on('message', message => {

	if (message.content === '!onBdd') {
		const client = new Client({
			connectionString: process.env.DATABASE_URL,
			ssl: {
				rejectUnauthorized: false
			}
		});
		client.connect();

	}

});
bot.on('message', message => {

	if (message.content === '!offBdd') {

		
		client.end();
	}

});



bot.on('message', message => {

	if (message.content === '!coucou') {

		message.reply('Bouh! :ghost:');

	}

});



// THIS  MUST  BE  THIS  WAY

bot.login(process.env.BOT_TOKEN);//BOT_TOKEN is the bot Secret
