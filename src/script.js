document.addEventListener('DOMContentLoaded', (event) => {
    const counterElement = document.getElementById('counter');
    const incrementButton = document.getElementById('incrementButton');
    
    // Function to get the current counter value from the server
    async function getCounterValue() {
        try {
            let response = await fetch('/.netlify/functions/getCounter');
            if (response.ok) {
                let data = await response.json();
                counterElement.textContent = data.counter;
            }
        } catch (error) {
            console.error('Error fetching counter value:', error);
        }
    }

    // Function to update the counter value on the server
    async function updateCounterValue(newCounterValue) {
        try {
            let response = await fetch('/.netlify/functions/updateCounter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ counter: newCounterValue })
            });
            if (response.ok) {
                let data = await response.json();
                counterElement.textContent = data.counter;
            }
        } catch (error) {
            console.error('Error updating counter value:', error);
        }
    }

    // Initial load of the counter value
    getCounterValue();

    incrementButton.addEventListener('click', () => {
        let currentCounterValue = parseInt(counterElement.textContent);
        let newCounterValue = currentCounterValue + 1;
        updateCounterValue(newCounterValue);
    });
});
