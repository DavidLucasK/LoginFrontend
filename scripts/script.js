document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qeHlmbWJwemp5cGlkdWt6bHFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyNTc5NjIsImV4cCI6MjAzNzgzMzk2Mn0._iRG2YBG6bRkYZG27BRbD-KnrAX1aBHqloTvHGlcNKQ';

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

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

    const handleSignUp = async () => {
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value.trim();
        const resultDiv = document.getElementById('signupResult');

        const errors = validatePassword(password);

        if (errors.length > 0) {
            resultDiv.textContent = errors[0];
            resultDiv.style.color = 'red';
            return;
        }

        if (!validateEmail(email)) {
            resultDiv.textContent = 'Email inválido.';
            resultDiv.style.color = 'red';
            return;
        }

        try {
            const response = await fetch('https://ojxyfmbpzjypidukzlqf.supabase.co/auth/v1/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': apiKey
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 429) {
                    resultDiv.textContent = 'Muitas requisições. Tente novamente mais tarde.';
                } else {
                    resultDiv.textContent = data.message || 'Erro ao criar conta.';
                }
                resultDiv.style.color = 'red';
            } else {
                resultDiv.textContent = 'Conta criada com sucesso!';
                resultDiv.style.color = 'green';
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            }
        } catch (err) {
            console.error('Erro ao criar conta:', err);
            resultDiv.textContent = 'Erro ao criar conta. Tente novamente mais tarde.';
            resultDiv.style.color = 'red';
        }
    };

    const handleLogin = async () => {
        const emailInput = document.getElementById('loginEmail').value.trim();
        const passwordInput = document.getElementById('loginPassword').value.trim();
        const resultDiv = document.getElementById('result');

        try {
            const response = await fetch('https://ojxyfmbpzjypidukzlqf.supabase.co/auth/v1/token?grant_type=password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': apiKey
                },
                body: JSON.stringify({ email: emailInput, password: passwordInput }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 429) {
                    resultDiv.textContent = 'Muitas requisições. Tente novamente mais tarde.';
                } else {
                    resultDiv.textContent = data.message || 'Erro ao fazer login.';
                }
                resultDiv.style.color = 'red';
            } else {
                resultDiv.textContent = 'Login bem-sucedido!';
                resultDiv.style.color = 'green';
                localStorage.setItem('authToken', data.access_token);
                setTimeout(() => {
                    window.location.href = 'https://davidlucas.vercel.app';
                }, 2000);
            }
        } catch (err) {
            console.error('Erro ao fazer login:', err);
            resultDiv.textContent = 'Erro ao fazer login. Tente novamente mais tarde.';
            resultDiv.style.color = 'red';
        }
    };

    const loginButton = document.getElementById('loginBtn');
    if (loginButton) {
        loginButton.addEventListener('click', handleLogin);
    }

    const signupButton = document.getElementById('signupBtn');
    if (signupButton) {
        signupButton.addEventListener('click', handleSignUp);
    }
});
