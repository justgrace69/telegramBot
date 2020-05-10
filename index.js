
require('dotenv').config();
const Telegraf = require('telegraf');
const api = require('covid19-api');
const Markup = require('telegraf/markup');
const CONTRIES_LIST = require('./constants')

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply(`
Привет, ${ctx.message.from.first_name} 😷
Статистика по Коронавирусу 🦠.
Введи название страны  на английском и получи статистику.
Получи полный список стран конмадой /help

`, Markup.keyboard([
   ['Russia', 'Belarus', 'Ukraine']
]).resize().extra()));
bot.help((ctx) => ctx.reply(CONTRIES_LIST));

bot.on('text', async (ctx) => {
   let data = {};
   try {
      data = await api.getReportsByCountries(ctx.message.text);
      const formatData = `
Страна: ${data[0][0].country} 
Заболело: ${data[0][0].cases} 
Умерло: ${data[0][0].deaths} 
Выздоровело: ${data[0][0].recovered} 
   `;
      ctx.reply(formatData);
   } catch {
      ctx.reply('Такой страны не существует');
   }

});
bot.launch();
