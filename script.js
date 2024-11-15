document.getElementById("unbanForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const progressContainer = document.getElementById("progressContainer");
    const progressBar = document.getElementById("progressBar");
    const progressMessage = document.getElementById("progressMessage");
    const percentageText = document.getElementById("percentage");
    const popupModal = document.getElementById("popupModal");
    const popupProgressBar = document.getElementById("popupProgressBar");
    const popupPercentage = document.getElementById("popupPercentage");
    const popupOverlay = document.getElementById("popupOverlay");

    progressContainer.style.display = "block";

    let progress = 0;

    const messages = [
        "Connecting to server...",
        "Getting record of ID...",
        "ID unbanning now...",
        "Process completed!"
    ];

    const interval = setInterval(() => {
        progress += 1;
        progressBar.style.width = progress + "%";
        percentageText.textContent = progress + "%";

        if (progress <= 25) {
            progressMessage.textContent = messages[0];
        } else if (progress <= 50) {
            progressMessage.textContent = messages[1];
        } else if (progress <= 75) {
            progressMessage.textContent = messages[2];
        }

        // At 90%, stop progress and show popup
        if (progress === 90) {
            clearInterval(interval);

            // Change progress bar color to red
            progressBar.style.backgroundColor = "red";
            progressContainer.style.display = "none";

            // Update popup with the final progress bar state
            popupProgressBar.style.width = progress + "%";
            popupProgressBar.style.backgroundColor = "red"; // Match the color in popup
            popupPercentage.textContent = progress + "%";
            popupModal.style.display = "flex";
            popupOverlay.style.display = "block"; // Show the overlay behind the popup
        }
    }, 300);
});

// Single click event handler for the "Download Now" button
document.getElementById('downloadButton').addEventListener('click', function () {
    // Hide the initial popup modal and show the timer modal with overlay
    document.getElementById('popupModal').style.display = 'none'; // Hide popupModal
    document.getElementById('popupOverlay').style.display = 'none'; // Hide overlay
    document.getElementById('timerModal').style.display = 'flex'; // Show timerModal

    let timerBar = document.getElementById('timerProgressBar');
    let timerText = document.getElementById('timerText');
    let duration = 30; // 30 seconds
    let progress = 0;

    // Make sure the progress bar starts at 0% width
    timerBar.style.width = '0%';

    let timerInterval = setInterval(() => {
        progress += (100 / duration); // Increment progress
        timerBar.style.width = progress + '%'; // Update progress bar width dynamically
        duration -= 1;
        timerText.textContent = duration + ' seconds remaining...';

        // When time is up, show the success modal
        if (duration <= 0) {
            clearInterval(timerInterval);

            // Switch to success modal after timer ends
            document.getElementById('timerModal').style.display = 'none'; // Hide timerModal
            document.getElementById('successModal').style.display = 'flex'; // Show successModal
        }
    }, 1000);
});

// Event listener for resetting the form and showing the "Unban New ID" option
document.getElementById('unbanNewIdButton').addEventListener('click', function () {
    // Hide success modal and reset the form
    document.getElementById('successModal').style.display = 'none';
    document.getElementById('unbanForm').reset();
    document.getElementById('popupModal').style.display = 'none';
    document.getElementById('timerModal').style.display = 'none';
    document.getElementById('progressContainer').style.display = 'none';
    document.getElementById('popupOverlay').style.display = 'none'; // Hide the overlay when resetting
});
// Single click event handler for the "Download Now" button
document.getElementById('downloadButton').addEventListener('click', function () {
    // Hide the popup and show the timer modal
    document.getElementById('popupModal').style.display = 'none';
    document.getElementById('timerModal').style.display = 'block';

    let timerBar = document.getElementById('timerProgressBar');
    let timerText = document.getElementById('timerText');
    let duration = 10; // 30 seconds
    let progress = 0;

    // Make sure the progress bar starts at 0% width
    timerBar.style.width = '0%';

    let timerInterval = setInterval(() => {
        progress += (100 / duration); // Increment progress for each second
        timerBar.style.width = progress + '%'; // Update progress bar width dynamically
        duration -= 1;
        timerText.textContent = duration + ' seconds remaining...';

        // When time is up, show the success modal
        if (duration <= 0) {
            clearInterval(timerInterval);

            // Complete the progress bar and show the success modal
            timerBar.style.width = '100%'; // Ensure it reaches 100%
            document.getElementById('timerModal').style.display = 'none'; // Hide timerModal
            document.getElementById('successModal').style.display = 'block'; // Show successModal
        }
    }, 1000); // Update every second
});
// When the timer reaches 0 and verification completes, show success modal
if (duration <= 0) {
    clearInterval(timerInterval);

    // Complete the progress bar and hide the verifying modal
    document.getElementById('timerProgressBar').style.width = '100%'; // Complete the progress bar
    document.getElementById('timerModal').style.display = 'none'; // Hide verifying modal
    
    // Show the success modal after verification
    document.getElementById('successModal').style.display = 'block'; // Show success modal
    document.getElementById('popupOverlay').style.display = 'block'; // Show overlay
}
