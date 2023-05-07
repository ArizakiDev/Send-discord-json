const Discord = require('discord.js');
const request = require('request-promise-native');
require('dotenv').config();

const client = new Discord.Client();
const prefix = '!';
const url = 'site_internet.json'; // URL du fichier JSON à récupérer
const channelId = 'Salon_ID'; // ID du salon où envoyer l'embed
const token = process.env.TOKEN;

client.login(token);

let embedMessage;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  deleteLastEmbed(); // On supprime le dernier embed
  updateEmbed(); // On met à jour l'embed
  setInterval(updateEmbed, 60000); // On fait une requête toutes les minutes
});

client.on('message', message => {
  if (message.content === `${prefix}update`) {
    updateEmbed(); // Si la commande !update est utilisée, on met à jour l'embed
    message.delete(); // On supprime le message contenant la commande !update
  }
});

function updateEmbed() {
  request(url)
    .then(response => {
      const data = JSON.parse(response);
      const newEmbed = new Discord.MessageEmbed()
        .setTitle(data.title)
        .setDescription(data.description.replace(/\[(.+?)\]\((.+?)\)/g, '[$1]($2)')) // Remplace les balises de lien dans la description par les liens hypertexte
        .setColor('#00FF00');

      if (embedMessage) {
        embedMessage.edit(newEmbed); // Si le message existe déjà, on modifie l'embed qu'il contient
      } else {
        const channel = client.channels.cache.get(channelId);
        channel.send(newEmbed).then(message => {
          embedMessage = message; // On enregistre le message contenant l'embed pour pouvoir le modifier plus tard
        });
      }
    })
    .catch(error => {
      console.error(error);
      client.channels.cache.get(channelId).send('Une erreur est survenue lors de la mise à jour des données.'); // En cas d'erreur, on envoie un message dans le salon spécifié
    });
}

function deleteLastEmbed() {
  const channel = client.channels.cache.get(channelId);
  channel.messages.fetch({ limit: 1 }).then(messages => {
    const lastMessage = messages.first();
    if (lastMessage && lastMessage.embeds.length > 0) {
      lastMessage.delete(); // Si le dernier message contient un embed, on le supprime
    }
  }).catch(console.error);
}
