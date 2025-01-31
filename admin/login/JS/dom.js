
document.addEventListener('DOMContentLoaded', () => {
    const initialWelcome = document.getElementById('initialWelcome');
    const splashScreen = document.getElementById('splashScreen');
    const loginForm = document.getElementById('loginForm');
    const container = document.getElementById('container');
    
    initialWelcome.onclick = () => {
        initialWelcome.style.opacity = '0';
        setTimeout(() => {
            initialWelcome.style.display = 'none';
            container.classList.add('visible');
        
            setTimeout(() => {
                container.classList.add('active');
            }, 100);
        }, 500);
    };

    setTimeout(() => {
        splashScreen.style.opacity = '0';
        setTimeout(() => {
            splashScreen.style.display = 'none';
            loginForm.style.display = 'block';
        }, 500);
    }, 2000);

    container.onclick = () => {
        if (!container.classList.contains('active')) {
            container.classList.add('active');
        }
    };

    const passwordToggle = document.querySelector('.password-toggle');
    const passwordInput = document.querySelector('input[type="password"]');
    
    passwordToggle.onclick = (e) => {
        e.stopPropagation();
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
    };

    const form = document.querySelector('form');
    form.onclick = (e) => {
        e.stopPropagation();
    };

    document.getElementById('loginBtn').addEventListener('click', function() {
        document.getElementById('screen').classList.add('active');
    });
});