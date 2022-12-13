const { AoiClient, LoadCommands } = require("aoi.js")
const config = require('./config.json')
 
const bot = new AoiClient({
  token: config.token,
  prefix: "N.",
  intents: "all",
  mobilePlatform: true
})

const CommandHandler = new LoadCommands(bot)
CommandHandler.load(bot.cmd,"./commands/")

bot.functionManager.createCustomFunction({
  name : '$roleIcon',
  type : 'djs',
  code : async (d) => {
    const data = d.util.aoiFunc(d) // this function opens data sent from interpreter
    const [ roleId, guildId = d.guild?.id ] = data.inside.splits //gets params
    const guild = await d.util.getGuild(d,guildId) //gets guild object
    if(!guild) return d.aoiError.fnError(d,"guild",{ inside: data.inside}) //sends invalid guild error
    data.result = guild.roles.cache.get(roleId)?.iconURL({ size: 1024, dynamic : true }) // returns icon
    return {
      code : d.util.setCode(data), //sets code 
    }
 }
})

bot.onMessage()
bot.onInteractionCreate()

bot.variables({
  a: 0,
})