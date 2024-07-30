document.getElementById('resetPasswordBtn').addEventListener('click', handleResetPassword);
document.getElementById('togglePasswords').addEventListener('click', togglePasswordsVisibility);

let passwordsVisible = false;

function togglePasswordsVisibility() {
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const button = document.getElementById('togglePasswords');

    passwordsVisible = !passwordsVisible;

    newPasswordInput.type = passwordsVisible ? 'string' : 'password';
    confirmPasswordInput.type = passwordsVisible ? 'string' : 'password';
    button.textContent = passwordsVisible ? 'Ocultar Senhas' : 'Mostrar Senhas';
}

async function handleResetPassword(event) {
    event.preventDefault();

    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qeHlmbWJwemp5cGlkdWt6bHFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyNTc5NjIsImV4cCI6MjAzNzgzMzk2Mn0._iRG2YBG6bRkYZG27BRbD-KnrAX1aBHqloTvHGlcNKQ';

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
        document.getElementById('result').textContent = 'As senhas não coincidem.';
        return;
    }

    try {
        const response = await fetch(`https://backendlogindl.vercel.app/api/auth/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apiKey': apiKey,
            },
            body: JSON.stringify({ token, newPassword })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('result').textContent = 'Senha redefinida com sucesso!';
        } else {
            document.getElementById('result').textContent = data.message || 'Erro ao redefinir a senha.';
        }
    } catch (error) {
        console.error('Erro ao redefinir a senha:', error);
        document.getElementById('result').textContent = 'Erro no servidor. Por favor, tente novamente mais tarde.';
    }
}
