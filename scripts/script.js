document.addEventListener('DOMContentLoaded', () => {
    // Variáveis para URLs e API Key
    const backendUrl = 'https://backendlogindl.vercel.app';
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qeHlmbWJwemp5cGlkdWt6bHFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyNTc5NjIsImV4cCI6MjAzNzgzMzk2Mn0._iRG2YBG6bRkYZG27BRbD-KnrAX1aBHqloTvHGlcNKQ'

    // Função para validar e-mail
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // Função para validar senha
    const validatePassword = (password) => {
        const errors = [];

        if (password.length < 6) {
            errors.push('A senha deve ter pelo menos 6 caracteres.');
        }

        const numberCount = (password.match(/\d/g) || []).length;
        if (numberCount < 2) {
            errors.push('A senha deve conter pelo menos 2 números.');
        }

        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (!specialCharRegex.test(password)) {
            errors.push('A senha deve conter pelo menos 1 caractere especial.');
        }

        return errors;
    };

    // Função para manipular o registro de usuário
    const handleSignUp = async () => {
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value.trim();
        const resultDiv = document.getElementById('signupResult');

        const errors = validatePassword(password);

        if (errors.length > 0) {
            resultDiv.innerHTML = errors[0];
            resultDiv.style.color = 'red';
            return;
        }

        if (!validateEmail(email)) {
            resultDiv.textContent = 'Email inválido.';
            resultDiv.style.color = 'red';
            return;
        }

        try {
            const response = await fetch(`${backendUrl}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apiKey': apiKey,
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            resultDiv.textContent = data.message || 'Conta criada com sucesso!';
            resultDiv.style.color = response.ok ? 'green' : 'red';

            if (response.ok) {
                console.log('Usuário registrado:', data);
                setTimeout(() => {
                    window.location.href = 'index.html'; // Redirecionar após o registro
                }, 2000);
            }
        } catch (err) {
            console.error('Erro ao criar conta:', err);
            resultDiv.textContent = 'Erro ao criar conta. Tente novamente mais tarde.';
            resultDiv.style.color = 'red';
        }
    };

    // Função para manipular o login de usuário
    const handleLogin = async () => {
        const emailInput = document.querySelector('input[type="string"]').value.trim();
        const passwordInput = document.querySelector('input[type="password"]').value.trim();
        const resultDiv = document.getElementById('result');
        console.log('Email:', emailInput);
        console.log('Senha:', passwordInput);

        try {
            const response = await fetch(`${backendUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apiKey': apiKey,
                },
                body: JSON.stringify({ email: emailInput, password: passwordInput }),
            });

            const data = await response.json();
            resultDiv.textContent = data.message || 'Login bem-sucedido!';
            resultDiv.style.color = response.ok ? 'green' : 'red';

            if (response.ok) {
                console.log('Login bem-sucedido, token recebido:', data.token);
                localStorage.setItem('authToken', data.token);
                setTimeout(() => {
                    window.location.href = 'https://davidlucas.vercel.app'; // Redirecionar após o login
                }, 2000);
            }
        } catch (err) {
            console.error('Erro ao fazer login:', err);
            resultDiv.textContent = 'Erro ao fazer login. Tente novamente mais tarde.';
            resultDiv.style.color = 'red';
        }
    };

    // Adicionar event listeners aos botões
    if (document.getElementById('signupBtn')) {
        const signupButton = document.getElementById('signupBtn');
        signupButton.addEventListener('click', handleSignUp);
    }

    if (document.getElementById('loginBtn')) {
        const loginButton = document.getElementById('loginBtn');
        loginButton.addEventListener('click', handleLogin);
    }
});
