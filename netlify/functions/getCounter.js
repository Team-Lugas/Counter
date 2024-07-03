const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    const counterFilePath = path.resolve(__dirname, '../../counter.json');

    try {
        const data = fs.readFileSync(counterFilePath, 'utf-8');
        const counter = JSON.parse(data);
        return {
            statusCode: 200,
            body: JSON.stringify(counter),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Unable to read counter value' }),
        };
    }
};
