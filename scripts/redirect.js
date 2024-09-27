const token = new URLSearchParams(window.location.search).get('token');
        const email = new URLSearchParams(window.location.search).get('email');

        // Tenta abrir o aplicativo
        window.location.href = `teamo://reset-password?token=${token}&email=${email}`;

        // Redireciona para a página web após 3 segundos se o aplicativo não abrir
        setTimeout(() => {
            document.querySelector('.message').textContent = 'Não conseguimos abrir o aplicativo. Redirecionando para a página da web...';
            window.location.href = `https://logindl.vercel.app/reset.html?token=${token}&email=${email}`;
        }, 3000);