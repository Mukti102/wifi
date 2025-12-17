document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.forms['login'];
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            const username = loginForm.username.value;
            if (!username) {
                e.preventDefault();
                alert('Silakan masukkan kode voucher atau username.');
            }
        });
    }

    // Auto-focus logic for MikroTik
    const errorMsg = document.querySelector('.error-msg');
    if (errorMsg && errorMsg.innerText.trim() !== '$(error)') {
        // If there's an error, shake the card
        const card = document.querySelector('.card');
        card.style.animation = 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both';
    }

    // Dynamic greeting based on time
    console.log('Fiberasinet Hotspot Loaded');
});

// Add shake animation style dynamically
const style = document.createElement('style');
style.innerHTML = `
    @keyframes shake {
        10%, 90% { transform: translate3d(-1px, 0, 0); }
        20%, 80% { transform: translate3d(2px, 0, 0); }
        30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
        40%, 60% { transform: translate3d(4px, 0, 0); }
    }
`;
document.head.appendChild(style);
