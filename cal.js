let display = document.getElementById('display');

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function calculateResult() {
    try {
        let expression = display.value;

        // Handle square root
        expression = expression.replace(/sqrt\(([^)]+)\)/g, 'Math.sqrt($1)');

        // Handle exponentiation
        expression = expression.replace(/\*\*/g, '^');

        // Evaluate the expression
        let result = eval(expression.replace(/\^/g, '**'));

        // Handle division by zero
        if (result === Infinity || isNaN(result)) {
            throw new Error("Division by zero or invalid operation");
        }

        // Format result to 2 decimal places
        display.value = result.toFixed(2);
    } catch (error) {
        display.value = "Error: " + error.message;
    }
}

// Enable keyboard input
document.addEventListener('keydown', function(event) {
    const key = event.key;

    // Allow numbers and operators
    if (!isNaN(key) || ['+', '-', '*', '/', '.', 'Enter', 'Backspace', 's', 'r', 'e', '%'].includes(key)) {
        if (key === 'Enter') {
            calculateResult();
        } else if (key === 'Backspace') {
            display.value = display.value.slice(0, -1);
        } else if (key === 's') { // For square root
            appendToDisplay('sqrt(');
        } else if (key === 'e') { // For exponentiation
            appendToDisplay('**');
        } else {
            appendToDisplay(key);
        }
    }
});