![logo](https://i.imgur.com/tLIpoQo.png)

# [HordeBot](https://github.com/XdayronDev/HordeBot) 
Un bot de Discord multipropósito con muchos NSFW y comandos divertidos, así como utilidad y moderación. 
* Vaya a [] () para obtener una lista completa de comandos.
* El prefix predeterminado es ! entonces el comando de ayuda sería !help
# [Invita al bot a tu servidor!](https://discord.com/oauth2/authorize?client_id=858987930882277388&scope=bot&permissions=8) 
* Utilice el enlace anterior si no desea seguir los pasos a continuación.
### Requisitos
* Node.js
* Windows Build tools 2017
* python 2.7 y superior (asegúrese de agregar Python a la ruta o las variables ambientales)
* Windows o Linux
* Conocimientos básicos sobre el uso de cd en un símbolo del sistema
* Saber cómo instalar los node_modules usando NPM
* Para usuarios no avanzados, el bot no funcionará si no lo descarga desde la página de lanzamiento.
Si sabe cómo funciona esto, puede descargar este proyecto directamente e instalar los módulos usted mismo.
Instalar todo usted mismo puede ser mejor en términos de mantener los módulos actualizados.
# **Guia de Instalacion**
*Ahora puede descargar el bot desde la página de lanzamiento para que pueda seguir esta guía de configuración más fácilmente.
## Obtener sus credenciales
* Ve a [Discord Developer Portal](https://discordapp.com/developers/applications/)
* Crea una nueva aplicacion.
* Vaya a la pestaña bot y luego haga clic en agregar bot.
### Token
Tu token es lo que usas para iniciar sesión en el bot
* En la pestaña del bot, haga clic en copiar donde dice token.
* Una vez que haya copiado el token, ahora puede pegarlo en el archivo de config.
* **ASEGÚRESE DE PEGARLO ENTRE LAS MARCAS DEL HABLA.**
 ### Tu ID de Discord
 * Para obtener tu ID, vaya a la configuración de la discord y vaya a "Apariencia".
 * Una vez que esté en la pestaña Apariencia, desplácese hacia abajo hasta encontrar "Modo de desarrollador".
 * Activa el "Modo de desarrollador"
 * Ahora que el modo de desarrollador está activado, escriba un mensaje en cualquier servidor, luego haga clic derecho en su nombre y luego haga clic en copiar id.
 * Pegue el ID copiado en la sección "clientID" de su config.
 
 * Si siguió los pasos correctamente, el archivo config.json ahora debería verse así:
  ```js 
  {
  "token": "TutokenDiscord",
  "prefix": "!",
  "clientID": "TuID"

}
  ```
  * Ahora puede guardar la configuración y pasar al proceso de instalación.
## Añadir el bot a su servidor:
1. Vaya a [Discord Developer Portal](https://discordapp.com/developers/applications/) and click on your application.
2. Vaya a la pestaña **General Information** y debería ver su Client ID.
3. Clicke copy.
4. Ahora que tiene su ID de cliente, vaya a este sitio web [Discord Permissions Calculator](https://discordapi.com/permissions.html#8)
5. Pegue su ClientId en donde dice **ClientID** y luego seleccione los permisos que desee.
6. Una vez que haya terminado de hacer eso, haga clic en el enlace de invitación que generó el sitio web y debería llevarlo a la página de invitación de sus bots.
7. Invita su Bot a los servidores que desee.
8. Pruebe el bot para ver si funciona escribiendo !ping y si el comando funciona, entonces ha completado todos los pasos correctamente..
# Bien hecho!
XdayronDev 
