document.addEventListener('DOMContentLoaded', () => {
    // Funções comuns para ambas as páginas
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        const errors = [];
    
        // Verifica o comprimento mínimo
        if (password.length < 6) {
            errors.push('A senha deve ter pelo menos 6 caracteres.');
        }
    
        // Verifica se a senha contém pelo menos 2 números
        const numberCount = (password.match(/\d/g) || []).length;
        if (numberCount < 2) {
            errors.push('A senha deve conter pelo menos 2 números.');
        }
    
        // Verifica se a senha contém pelo menos 1 caractere especial
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (!specialCharRegex.test(password)) {
            errors.push('A senha deve conter pelo menos 1 caractere especial.');
        }
    
        // Retorna o array de mensagens de erro
        return errors;
    };

    // Função para lidar com a criação de conta
    const handleSignUp = async () => {
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value.trim();
        const resultDiv = document.getElementById('signupResult');

        // Valida a senha
        const errors = validatePassword(password);

        // Se houver erros, exibe a primeira mensagem de erro
        if (errors.length > 0) {
            resultDiv.innerHTML = errors[0]; // Exibe apenas a primeira mensagem de erro
            resultDiv.style.color = 'red';
            return;
        }

        // Verifica se o email é válido
        if (!validateEmail(email)) {
            resultDiv.textContent = 'Email inválido.';
            resultDiv.style.color = 'red';
            return;
        }

        // Chamada para a API de registro
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            resultDiv.textContent = data.message;
            resultDiv.style.color = response.ok ? 'green' : 'red';

            if (response.ok) {
                setTimeout(() => {
                    window.location.href = 'index.html'; // Redireciona após 2 segundos
                }, 2000);
            }
        } catch (err) {
            resultDiv.textContent = 'Erro ao criar conta. Tente novamente mais tarde.';
            resultDiv.style.color = 'red';
        }
    };

    // Função para lidar com o login
    const handleLogin = async () => {
        const emailInput = document.querySelector('input[type="string"]').value.trim();
        const passwordInput = document.querySelector('input[type="password"]').value.trim();
        const resultDiv = document.getElementById('result');

        try {
            const response = await fetch('https://loginbackend-2ff9.onrender.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: emailInput, password: passwordInput }),
            });

            const data = await response.json();
            resultDiv.textContent = data.message;
            resultDiv.style.color = response.ok ? 'green' : 'red';

            if (response.ok) {
                localStorage.setItem('authToken', data.token); // Armazena o token no localStorage
                setTimeout(() => {
                    window.location.href = 'https://davidlucas.vercel.app';
                }, 2000);
            }
        } catch (err) {
            resultDiv.textContent = 'Erro ao fazer login. Tente novamente mais tarde.';
            resultDiv.style.color = 'red';
        }
    };

    // Página de Login
    if (document.getElementById('convertBtn')) {
        const loginButton = document.getElementById('convertBtn');
        loginButton.addEventListener('click', handleLogin);
    }

    // Página de Criação de Conta
    if (document.getElementById('signupBtn')) {
        const signupButton = document.getElementById('signupBtn');
        signupButton.addEventListener('click', handleSignUp);
    }
});
