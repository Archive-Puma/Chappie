package main

import (
	"fmt" // Esta es la libreria estandar, como iostream o stdio.h

	"github.com/gempir/go-twitch-irc" // Importa la libreria de github que maneja el chat de Twitch
)

func main() {
	// Crea el bot poniendo el nombre de la cuenta y su oauth.
	// El oauth se puede conseguir en https://twitchapps.com/tmi/
	bot := twitch.NewClient("ChappieTheBot", "oauth:epjk8hx1qtk262s8kmhmagqujo61i2")

	// Defines lo que quieres que haga el bot cuando reciba un nuevo mensaje por el canal
	bot.OnNewMessage(func(channel string, user twitch.User, message twitch.Message) {
		// Comprobamos si es un comando
		if string(message.Text[0]) == "!" {
			bot.Say("suraei", "El mensaje es un comando")
		} else {
			// Comprobamos si el mensaje es del streamer
			if _, streamer := user.Badges["broadcaster"]; streamer {
				// Haces lo que quieras aquí
				bot.Say("suraei", fmt.Sprintf("%s, la streamer, ha escrito: %s", user.DisplayName, message.Text))
				// Comprobamos si el mensaje es de un sub
			} else if _, sub := user.Badges["subscriber"]; sub {
				// Haces lo que quieras aquí
				bot.Say("suraei", fmt.Sprintf("Tu sub %s ha escrito: %s", user.DisplayName, message.Text))
				// El mensaje es de un no-sub
			} else {
				// Haces lo que quieras aquí
				bot.Say("suraei", fmt.Sprintf("%s, que no es sub, ha escrito: %s", user.DisplayName, message.Text))
			}
		}
	})

	// Haces que el bot se una a un canal
	bot.Join("suraei")

	// Enciendes el bot
	err := bot.Connect()

	// Si hay un error, muestralo
	if err != nil {
		panic(err)
	}
}
