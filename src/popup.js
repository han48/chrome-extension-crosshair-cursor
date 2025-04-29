document.addEventListener('DOMContentLoaded', () => {
    const enableButton = document.getElementById('mr4-cx-chc-enable');
    const disableButton = document.getElementById('mr4-cx-chc-disable');

    if (enableButton && disableButton) {
        enableButton.addEventListener('click', () => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'enable' });
            });
        });

        disableButton.addEventListener('click', () => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'disable' });
            });
        });
    } else {
        console.error('Enable or disable button not found in the DOM.');
    }
});