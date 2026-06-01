document.addEventListener("DOMContentLoaded", () => {
    // 1. DOM Element Selectors
    const diceTypeSelect = document.getElementById("dice-type");
    const diceCountInput = document.getElementById("dice-count");
    const rollBtn = document.getElementById("btn-roll");
    const clearBtn = document.getElementById("btn-clear");
    const rollsOutput = document.getElementById("rolls-output");
    const totalOutput = document.getElementById("total-output");
    const diceIcon = document.querySelector("#diceimg");

    // 2. Helper Map to convert "d6", "d20" strings to actual maximum numbers
    const diceSidesMap = {
        'd4': 4, 'd6': 6, 'd8': 8, 'd10': 10, 'd12': 12, 'd20': 20, 'd100': 100
    };

    // 3. Roll Button Event Listener
    rollBtn.addEventListener("click", () => {
        // Trigger the spin animation
        triggerIconSpin();

        // Gather input values
        const selectedType = diceTypeSelect.value;
        const maxSides = diceSidesMap[selectedType] || 6;
        const diceCount = parseInt(diceCountInput.value) || 1;

        // Generate the random numbers based on the user's input
        const rolls = [];
        let sum = 0;
        
        for (let i = 0; i < diceCount; i++) {
            const randomRoll = Math.floor(Math.random() * maxSides) + 1;
            rolls.push(randomRoll);
            sum += randomRoll;
        }

        // Display outputs dynamically on separate lines
        rollsOutput.textContent = rolls.join(", ");
        totalOutput.textContent = `Total: ${sum}`;
    });

    // 4. Clear Button Event Listener
    clearBtn.addEventListener("click", () => {
        resetForm();
    });

    // 5. Trigger Spin Functionality
    function triggerIconSpin() {
        // Remove the class first if it was already there so it can re-trigger on subsequent clicks
        diceIcon.classList.remove("spinning");
        
        // Force a DOM reflow to make the browser register the animation reset
        void diceIcon.offsetWidth; 
        
        // Add the class back to make it spin
        diceIcon.classList.add("spinning");
    }

    // 6. Reset Form & Outputs Functionality
    function resetForm() {
        // Reset interactive inputs to defaults
        diceTypeSelect.value = "d4";
        diceCountInput.value = "1"; // Updated to 3 to match your HTML template default

        // Reset dynamic output displays to empty text fields
        rollsOutput.textContent = "";
        totalOutput.textContent = "";

        // Explicitly strip the spinning animation class to make sure it rests
        diceIcon.classList.remove("spinning");
    } // <--- FIXED: Closes the resetForm function
}); // <--- FIXED: Closes the DOMContentLoaded wrapper