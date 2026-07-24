// Окно входа/регистрации
document.addEventListener('DOMContentLoaded', function() {
    let authModal = null;

    function createAuthModal() {
        if (document.getElementById('auth-modal')) return;
        
        const modal = document.createElement('div');
        modal.id = 'auth-modal';
        modal.className = 'auth-modal';
        modal.innerHTML = `
            <div class="auth-modal-content">
                <button class="auth-close">×</button>
                <h3>Добро пожаловать</h3>
                <div class="auth-tabs">
                    <button class="auth-tab active" data-tab="login">Вход</button>
                    <button class="auth-tab" data-tab="register">Регистрация</button>
                </div>
                <div class="auth-panels">
                    <div class="auth-panel active" id="login-panel">
                        <input type="email" placeholder="Email" class="auth-input" id="login-email">
                        <input type="password" placeholder="Пароль" class="auth-input" id="login-password">
                        <button class="auth-submit" id="login-submit">Войти</button>
                        <a href="#" class="auth-forgot">Забыли пароль?</a>
                    </div>
                    <div class="auth-panel" id="register-panel">
                        <input type="text" placeholder="Имя" class="auth-input" id="register-name">
                        <input type="email" placeholder="Email" class="auth-input" id="register-email">
                        <input type="password" placeholder="Пароль" class="auth-input" id="register-password">
                        <button class="auth-submit" id="register-submit">Зарегистрироваться</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        authModal = modal;
        
        document.querySelector('.auth-close').addEventListener('click', function() {
            authModal.classList.remove('active');
        });
        
        document.querySelectorAll('.auth-tab').forEach(function(tab) {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.auth-tab').forEach(function(t) { t.classList.remove('active'); });
                tab.classList.add('active');
                document.querySelectorAll('.auth-panel').forEach(function(p) { p.classList.remove('active'); });
                document.getElementById(tab.dataset.tab + '-panel').classList.add('active');
            });
        });
        
        document.getElementById('login-submit').addEventListener('click', function() {
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            if (email && password) {
                authModal.classList.remove('active');
            }
        });
        
        document.getElementById('register-submit').addEventListener('click', function() {
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            if (name && email && password) {
                authModal.classList.remove('active');
            }
        });
        
        authModal.addEventListener('click', function(e) {
            if (e.target === authModal) {
                authModal.classList.remove('active');
            }
        });
    }

    const userIcon = document.querySelector('.user-icon');
    if (userIcon) {
        userIcon.addEventListener('click', function() {
            if (!authModal) createAuthModal();
            authModal.classList.add('active');
        });
    }
});