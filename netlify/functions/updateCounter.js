const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    const counterFilePath = path.resolve(__dirname, '../../counter.json');

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    try {
        const newCounterValue = JSON.parse(event.body).counter;
        fs.writeFileSync(counterFilePath, JSON.stringify({ counter: newCounterValue }));
        return {
            statusCode: 200,
            body: JSON.stringify({ counter: newCounterValue }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Unable to update counter value' }),
        };
    }
};
