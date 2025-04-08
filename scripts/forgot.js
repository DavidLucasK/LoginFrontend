document.getElementById('forgotPasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('enviar');
    submitBtn.disabled = true;
    const email = document.getElementById('forgotPasswordEmail').value.trim();
    const resultDiv = document.getElementById('forgotPasswordResult');
    try {
        const response = await fetch('https://backendlogindl.vercel.app/api/auth/forgot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        resultDiv.textContent = data.message;
        resultDiv.style.color = response.ok ? 'green' : 'red';
    } catch (err) {
        resultDiv.textContent = 'Erro ao enviar solicitação. Tente novamente mais tarde.';
        resultDiv.style.color = 'red';
    }
});
