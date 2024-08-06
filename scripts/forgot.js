document.getElementById('forgotPasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('enviar');
    submitBtn.disabled = true;
    const email = document.getElementById('forgotPasswordEmail').value.trim();
    const resultDiv = document.getElementById('forgotPasswordResult');
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qeHlmbWJwemp5cGlkdWt6bHFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyNTc5NjIsImV4cCI6MjAzNzgzMzk2Mn0._iRG2YBG6bRkYZG27BRbD-KnrAX1aBHqloTvHGlcNKQ'

    try {
        const response = await fetch('https://backendlogindl.vercel.app/api/auth/forgot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apiKey': apiKey,
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
