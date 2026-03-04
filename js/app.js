// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('SW Registered'))
            .catch(err => console.log('SW Registration failed: ', err));
    });
}

// Simple Sidebar Toggle for Mobile/Small tablets
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            link.parentElement.classList.add('active');

            // Add a subtle haptic-like scaling effect on click
            link.style.transform = 'scale(0.95)';
            setTimeout(() => link.style.transform = 'scale(1)', 100);
        });
    });

    // Add orientation change handling if needed
    window.addEventListener('orientationchange', () => {
        console.log('Orientation changed to: ' + window.orientation);
    });

    // PWA Install Logic
    let deferredPrompt;
    const installBtn = document.getElementById('install-btn');
    const installBanner = document.getElementById('install-banner');
    const closeBanner = document.getElementById('close-banner');

    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI notify the user they can install the PWA
        installBtn.style.display = 'block';
    });

    if (installBtn) {
        installBtn.addEventListener('click', (e) => {
            // hide our user interface that shows our A2HS button
            installBtn.style.display = 'none';
            // Show the prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                deferredPrompt = null;
            });
        });
    }

    // iOS Detection (since beforeinstallprompt isn't supported)
    const isIos = () => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        return /iphone|ipad|ipod/.test(userAgent);
    };

    const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

    if (isIos() && !isInStandaloneMode()) {
        installBanner.style.display = 'flex';
    }

    if (closeBanner) {
        closeBanner.addEventListener('click', () => {
            installBanner.style.display = 'none';
        });
    }
});
