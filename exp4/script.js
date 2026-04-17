// DOM Content Loaded - ensures HTML and scripts are fully parsed before running
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DOM Manipulation (Vanilla JS) ---
    // Objective: Update content dynamically on button click

    const updateBtn = document.getElementById('btn-update'); 
    const titleElement = document.getElementById('dynamic-title');
    const textElement = document.getElementById('dynamic-text');
    const displayBox = document.getElementById('target-box'); // Changed from glass-card

    const contentVariants = [
        { title: "Updated!", text: "Content changed via JavaScript." },
        { title: "Another Click", text: "Here is some new text." },
        { title: "DOM Demo", text: "Basic DOM manipulation in action." },
        { title: "Experiment 4", text: "Click to cycle through text." }
    ];

    let contentIndex = 0;

    updateBtn.addEventListener('click', () => {
        // Cycle through content
        contentIndex = (contentIndex + 1) % contentVariants.length;
        const newContent = contentVariants[contentIndex];

        // Update the DOM elements
        titleElement.textContent = newContent.title;
        textElement.textContent = newContent.text;

        // Simple highlight effect (gold background flash)
        displayBox.style.backgroundColor = "#fff3cd";
        setTimeout(() => {
            displayBox.style.backgroundColor = "white";
        }, 300);
    });
});


// --- 2. jQuery Effects ---
// Objective: Implement Hide, Show, Toggle, and Animate
$(document).ready(function() {

    const targetBox = $('#target-box');

    // Hide Effect
    $('#btn-hide').click(function() {
        targetBox.hide(); // Default fast hide
    });

    // Show Effect
    $('#btn-show').click(function() {
        targetBox.show(); // Default fast show
    });

    // Animate Effect
    $('#btn-animate').click(function() {
        const box = targetBox;
        
        // Simple, standard jQuery animation
        box.animate({
            opacity: 0.5,
            marginLeft: "50px",
            height: "toggle" // classic jQuery animation trick
        }, 1000, function() {
            // Callback to reset or do something else
            box.animate({
                opacity: 1,
                marginLeft: "0px",
                height: "toggle"
            }, 1000);
        });
    });

});
