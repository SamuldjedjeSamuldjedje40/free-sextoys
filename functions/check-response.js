exports.handler = async (event, context) => {
    const page = event.queryStringParameters.page;
  
    const response = global.telegramResponse || {};
  
    if (response.page === page) {
      const action = response.action;
      global.telegramResponse = null;
      return {
        statusCode: 200,
        body: JSON.stringify({ action })
      };
    }
  
    return {
      statusCode: 200,
      body: JSON.stringify({ action: null })
    };
  };