//! ARRAYS

let heroInventory = ["Rusty Sword", "Leather Armor", "Health Potion"];
console.log(heroInventory)

heroInventory.push("Magic Ring")
console.log(heroInventory)

heroInventory = heroInventory.filter(item => item !== "Leather Armor");
console.log(heroInventory)



//! LOOPS



let mysteriousLocations = ["Whispering Forest", "Echoing Caves", "Shimmering Riverside", "Crumbling Tower"];

for (let i = 0; i < mysteriousLocations.length; i++) {
    let location = mysteriousLocations[i];
    console.log("Exploring: " + location);
    
    if (location === "Echoing Caves") {
        console.log("Found the Ancient Tome in " + location + "!");
        heroInventory.push("Mysterious Tome");
    }
}

console.log("Updated Inventory:", heroInventory);



//! EVENTS
document.addEventListener('DOMContentLoaded', function() {
    let ghoulHealth = 100;
    const fightButton = document.getElementById('fight');
    const decipherButton = document.getElementById('decipher');
    const tomeContent = document.getElementById('tome-content');
    const healthDisplay = document.getElementById('ghoul-health');
    const ghoulShriek = new Audio('./shriek-sound.mp3');


    
    hideElement(decipherButton);
    hideElement(tomeContent);

    function updateHealthDisplay() {
        if (healthDisplay) {
            healthDisplay.textContent = `Ghoul's Health: ${ghoulHealth}`;
        } else {
            console.error("Element with id 'ghoul-health' not found in the DOM");
        }
    }


    if (fightButton) {
        fightButton.addEventListener('click', function() {
            if (ghoulHealth > 0) {
                const weapon = "Rusty Sword";
                ghoulHealth = Math.max(0, ghoulHealth - 10);
                console.log(`You attack the ghoul with your ${weapon}, dealing 10 damage!`);
                updateHealthDisplay();

                if (ghoulHealth <= 0) {
                    console.log("Victory! You have defeated the ghoul!");
                    fightButton.disabled = true;
                    showElement(decipherButton);
                    showElement(tomeContent);
                }
            }
        });

        fightButton.addEventListener('mouseenter', function() {
            ghoulShriek.play();
        });
    } else {
        console.error("Button with id 'fight' not found in the DOM");
    }


    //! DOM Manipulation for Decryption
    if (decipherButton) {
        decipherButton.addEventListener('click', decipherMessage);
    } else {
        console.error("Button with id 'decipher' not found in the DOM");
    }
});


function decipherMessage() {
    const crypticSpans = document.querySelectorAll('span.cryptic');
    const decipheredMessage = Array.from(crypticSpans)
        .map(span => span.textContent)
        .join(' ');
    
    displayDecipheredMessage(decipheredMessage);
    checkForNewItem(decipheredMessage);
}


function displayDecipheredMessage(message) {
    const messageDisplay = document.createElement('p');
    messageDisplay.textContent = "Deciphered message: " + message;
    document.body.appendChild(messageDisplay);
}


let inventoryDisplayed = false;

function checkForNewItem(message) {
    if (message.toLowerCase().includes("the light bringer")) {
        const newItem = "The Light Bringer Ring";
        if (!heroInventory.includes(newItem)) {
            heroInventory.push(newItem);
            console.log(`New item added to inventory: ${newItem}`);
            console.log("Updated Inventory:", heroInventory);
            
            // Display the updated inventory on the page
            displayUpdatedInventory(true);
        }
    }
}

function displayUpdatedInventory(show = false) {
    // Remove the existing inventory display if it exists
    const existingInventory = document.getElementById('inventory-display');
    if (existingInventory) {
        existingInventory.remove();
    }

    // Create a new inventory display
    const inventoryDisplay = document.createElement('div');
    inventoryDisplay.id = 'inventory-display';
    inventoryDisplay.innerHTML = `<h3>Hero's Inventory:</h3>
        <ul>${heroInventory.map(item => `<li>${item}</li>`).join('')}</ul>`;
    
    // Set the initial display style
    inventoryDisplay.style.display = show ? '' : 'none';
    
    // Append the new inventory display to the body
    document.body.appendChild(inventoryDisplay);

    inventoryDisplayed = show;
}

function decipherMessage() {
    const crypticSpans = document.querySelectorAll('span.cryptic');
    const decipheredMessage = Array.from(crypticSpans)
        .map(span => span.textContent)
        .join(' ');
   
    displayDecipheredMessage(decipheredMessage);
    checkForNewItem(decipheredMessage);

    // Show the inventory after deciphering
    if (!inventoryDisplayed) {
        displayUpdatedInventory(true);
    }
}

// Call displayUpdatedInventory after initial inventory setup
document.addEventListener('DOMContentLoaded', function() {
    // ... (existing DOMContentLoaded code)

    // Display initial inventory, but keep it hidden
    displayUpdatedInventory(false);
});


function hideElement(element) {
    if (element) {
        element.style.display = 'none';
    }
}


function showElement(element) {
    if (element) {
        element.style.display = '';
    }
}