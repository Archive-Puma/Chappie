<img src="https://cdn.rawgit.com/CosasDePuma/Chappie/563772d7/.img/icon.png" align="right" width="300">

# Peral
[![NodeJS Version](https://img.shields.io/badge/nodejs-8.9.4-yellowgreen.svg?style=flat)](https://nodejs.org/es/download/package-manager/) [![Electron](https://img.shields.io/badge/electron-1.8.4-7991de.svg?style=flat)](https://electronjs.org/) [![TMI.js](https://img.shields.io/badge/tmi.js-1.2.1-7454af.svg?style=flat)](https://electronjs.org/) [![License](https://img.shields.io/github/license/CosasDePuma/Peral.svg)](https://github.com/CosasDePuma/Peral/blob/master/LICENSE)

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

| panda/idle.gif | panda/attack.gif | panda/greetings.gif | panda/eat.gif | panda/dance.gif |
|:--:|:--:|:--:|:--:|:--:|
| ![Panda Idle](https://cdn.rawgit.com/CosasDePuma/Chappie/e3f3f85c/src/resources/pets/panda/idle.gif) | ![Panda Attack](https://cdn.rawgit.com/CosasDePuma/Chappie/e3f3f85c/src/resources/pets/panda/attack.gif) | ![Panda Greetings](https://cdn.rawgit.com/CosasDePuma/Chappie/e3f3f85c/src/resources/pets/panda/greetings.gif) | ![Panda Eat](https://cdn.rawgit.com/CosasDePuma/Chappie/e3f3f85c/src/resources/pets/panda/eat.gif) | ![Panda Dance](https://cdn.rawgit.com/CosasDePuma/Chappie/e3f3f85c/src/resources/pets/panda/dance.gif) |

GIFs must be deposited in the `src/resources/pets/[animal]` folder.
Current actions available are: **IDLE**, **ATTACK**, **GREETINGS**

Finally, line `src/index.js:1` must be changed with your animal name:
```js
const PET = 'panda';
```

:earth_africa: Scheme of contents
----
```js
Chappie
 < Source >
|_ src
  |_ resources
    |_ pets
      |_ panda
    |_ sounds
  |_ main.js
  |_ twitch.js
  |_ quotes.js
  |_ sounds.js
  |_ index.js
  |_ index.css
  |_ index.html
  |_ settings.json <- This file must be added manually 
 < Dependencies >
|_ package.json
|_ package-lock.json
 < Repository >
|_ .gitignore
|_ .gitlab-ci.yml
|_ README.md
|_ LICENSE
```

Please contact with [Kike Puma](https://linkedin.com/in/kikepuma) if you need more information.
