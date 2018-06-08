class Config {
    constructor() {
        // Nombre del streamer
        this.OWNER = "Wyld";
        // Nombre de la cuenta del bot
        this.BOT_NAME = "ChappieTheBot";
        // Nombre de la moneda
        this.POINTS_NAME = "trozos de bambú";
        // Puntos dados en cada ronda a los que estén viendo el stream
        this.POINTS_VIEW = 5;
        // Tiempo entre cada ronda de reparto de puntos (en segundos)
        this.POINTS_VIEW_INTERVAL = 5;
        // Lista negra: Cuentas que no recibirán puntos por view
        this.POINTS_VIEW_BLACKLIST = [
            this.OWNER,
            this.BOT_NAME,
            "Moobot",
            "StreamElements"
        ];
        // Lista negra: Cuentas que el bot ignorará
        this.VIEWERS_BLACKLIST = [
            this.OWNER,
            this.BOT_NAME,
            "Moobot",
            "StreamElements"
        ];

        // Formateamos todo a minúsculas
        this.toLowerCase();
    }
}

// Formateamos todo a minúsculas
Config.prototype.toLowerCase = function () {
    this.OWNER = this.OWNER.toLowerCase();
    this.BOT_NAME = this.BOT_NAME.toLowerCase();
    for(let index in this.VIEWERS_BLACKLIST)
        this.VIEWERS_BLACKLIST[index] = this.VIEWERS_BLACKLIST[index].toLowerCase();
    for(let index in this.POINTS_VIEW_BLACKLIST)
        this.POINTS_VIEW_BLACKLIST[index] = this.POINTS_VIEW_BLACKLIST[index].toLowerCase();
}

module.exports = new Config();