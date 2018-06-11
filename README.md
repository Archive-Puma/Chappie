<img src="https://cdn.rawgit.com/CosasDePuma/Chappie/563772d7/.img/icon.png" align="right" width="300">

# Chappie
[![NodeJS Version](https://img.shields.io/badge/nodejs-8.9.4-yellowgreen.svg?style=flat)](https://nodejs.org/es/download/package-manager/) [![Electron](https://img.shields.io/badge/electron-1.8.4-7991de.svg?style=flat)](https://electronjs.org/) [![TMI.js](https://img.shields.io/badge/tmi.js-1.2.1-7454af.svg?style=flat)](https://electronjs.org/) [![License](https://img.shields.io/github/license/CosasDePuma/Peral.svg)](https://github.com/CosasDePuma/Peral/blob/master/LICENSE) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FCosasDePuma%2FChappie.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FCosasDePuma%2FChappie?ref=badge_shield)

:vhs: Clone me!
----
Clone or download the Github project:
```bash
git clone https://github.com/cosasdepuma/chappie.git Chappie
  or
git clone https://gitlab.com/cosasdepuma/chappie.git Chappie
```

:electric_plug: Dependencies
----
Enter to the directory:
```sh
cd Chappie
```

Install all the npm modules:
```js
npm i
```

:page_facing_up: Configuration
----
The `credentials.json` file must be created in the `src` folder according to the following format:

```json
{
    "MLAB_DOCUMENT": "aaaabbbbccccddddeeeeffff",
    "MLAB_APIKEY": "0000AAAA0000AAAA0000AAAA0000AAAA",
    "TWITCH_CLIENT_ID": "0000xxxx0000AAAA0000xxxx000AAA",
    "TWITCH_OAUTH": "oauth:xxxxxxxxxxxxxxxxx0000000000000"
}
```

You can customize the bot to fit your Twitch channel by modifying the `config.json` file in the `src` folder.

```json
{
  "owner": "YOUR_CHANNEL_NAME",
  "bot_name": "ChappieTheBot",
  "pet": "panda",
  "follow_check_interval": 5,
  "points": {
    "name": "My Awesome Coin",
    "per_view": 5,
    "reward_interval": 5
  },
  "blacklist": [
      "YOUR_CHANNEL_NAME",
      "ChappieTheBot",
      "Moobot",
      "Nigthbot",
      "StreamElements"
  ],
  "debug": false,
  "credentials_path": "src/credentials.json"
}
```

### Description of the fields in the config.json file

| Key | Value | Optional? |
|:--:|:--:|:--:|
| **owner** | Owner of the channel where the bot will be | :heavy_multiplication_x: |
| **bot_name** | Name of the Twitch account that will be used by the bot | :heavy_multiplication_x: |
| **pet** | Name of the folder that contains the GIFs within the path `resources/pets` | :heavy_multiplication_x: |
| **follow_check_interval** | Interval in which it will be checked if there has been a new follow (in seconds) | :heavy_multiplication_x: |
| **points. name** | Channel currency name | :heavy_multiplication_x: |
| **points. per_view** | Number of points given to each viewer | :heavy_multiplication_x: |
| **points. reward_interval** | Reward interval to each viewer for watching the channel | :heavy_multiplication_x: |
| **blacklist** | Users that the bot will ignore (will not give them points either) | :heavy_multiplication_x: |
| **debug** | Enable debug console logs (dev only) | :heavy_check_mark: |
| **credentials_path** | Path of the `credentials.json` file | :heavy_multiplication_x: |


:see_no_evil: Run the program!
----
Run the application through NodeJS:
```sh
npm test
```

You can also install Electron globally on your computer through the command `npm install -g electron` and running the program with:
```js
electron .
```

:hammer: Compilation
----
You can create an executable according to your Operating System by installing and running `electron-packager` module:

```js
npm install --save-dev electron-packager
npm run-script build
```

:hamster: Pets and more Pets!
----
If you want to change the default pet, you should download three GIFs like this and rename it to **[action].gif**

| IDLE | ATTACK | GREETINGS | EAT | DANCE |
|:--:|:--:|:--:|:--:|:--:|
| panda/idle.gif | panda/attack.gif | panda/greetings.gif | panda/eat.gif | panda/dance.gif |
| ![Panda Idle](https://cdn.rawgit.com/CosasDePuma/Chappie/b7e8ac60/src/resources/pets/panda/idle.gif) | ![Panda Attack](https://cdn.rawgit.com/CosasDePuma/Chappie/b7e8ac60/src/resources/pets/panda/attack.gif) | ![Panda Greetings](https://cdn.rawgit.com/CosasDePuma/Chappie/b7e8ac60/src/resources/pets/panda/greetings.gif) | ![Panda Eat](https://cdn.rawgit.com/CosasDePuma/Chappie/b7e8ac60/src/resources/pets/panda/eat.gif) | ![Panda Dance](https://cdn.rawgit.com/CosasDePuma/Chappie/b7e8ac60/src/resources/pets/panda/dance.gif) |
| rabbit/idle.gif | rabbit/attack.gif | rabbit/greetings.gif | rabbit/eat.gif | rabbit/dance.gif |
| ![Rabbit Idle](https://cdn.rawgit.com/CosasDePuma/Chappie/b7e8ac60/src/resources/pets/rabbit/idle.gif) | ![Rabbit Attack](https://cdn.rawgit.com/CosasDePuma/Chappie/b7e8ac60/src/resources/pets/rabbit/attack.gif) | ![Rabbit Greetings](https://cdn.rawgit.com/CosasDePuma/Chappie/b7e8ac60/src/resources/pets/rabbit/greetings.gif) | ![Rabbit Eat](https://cdn.rawgit.com/CosasDePuma/Chappie/b7e8ac60/src/resources/pets/rabbit/eat.gif) | ![Rabbit Dance](https://cdn.rawgit.com/CosasDePuma/Chappie/b7e8ac60/src/resources/pets/rabbit/dance.gif) |

GIFs must be deposited in the `src/resources/pets/[animal]` folder.

Current actions available are: **IDLE**, **ATTACK**, **GREETINGS**, **EAT**, **DANCE**

:earth_africa: Scheme of contents
----
```js
Chappie
 < Repository >
|__ .img
|__ .gitignore
|__ LICENSE
|__ README.md
< Dependencies >
|__ package.json
|__ package-lock.json
 < Source >
|__ src
  |__ resources
    |__ pets
      |__ panda
      |__ rabbit
    |__ sounds
  |__ components
    |__ commands.js
    |__ config.js
    |__ events.js
    |__ pet.js
    |__ quotes.js
    |__ sounds.js
    |__ twitch.js
  |__ views
    |__ index.html
    |__ index.css
  |__ main.js
  |__ config.json
  |__ credentials.json <- This file must be added manually 
```

Please contact with [Kike Puma](https://linkedin.com/in/kikepuma) if you need more information.
