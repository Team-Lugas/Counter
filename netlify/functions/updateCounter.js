const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    const counterFilePath = path.resolve(__dirname, '../../counter.json');
    console.log(`Updating counter value at: ${counterFilePath}`);

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    try {
        const newCounterValue = JSON.parse(event.body).counter;
        fs.writeFileSync(counterFilePath, JSON.stringify({ counter: newCounterValue }), 'utf-8');
        console.log(`New counter value: ${newCounterValue}`);
        return {
            statusCode: 200,
            body: JSON.stringify({ counter: newCounterValue }),
        };
    } catch (error) {
        console.error('Error updating counter value:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Unable to update counter value' }),
        };
    }
};
