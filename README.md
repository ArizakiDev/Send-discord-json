# Send-discord-json
script qui envoie les données d'un fichier json sur un serveur discord

- Installez les dépendances où faites npm i
- créé un .env qui contient la structure suivante: 
```TOKEN=Votre_Token```

- ajouter l'id du salon ou vous souhaitez que les informations s'envoyent (index.js ligne 8)
- ajouter l'url jusqu'au .json du site ou vous souhaitez récupérer les infos (exemple: https://example.com/src/config.json; ligne 7 dans index.js)
- faites F5 dans [visual studio](https://code.visualstudio.com) ou créé un fichier "start.bat" avec le code suivant:
@echo off &nbsp
node index.js &nbsp
pause

- le script se met à jours toutes les minutes

- Amusez-vous. faites "!update" pour forcer la mise à jours
