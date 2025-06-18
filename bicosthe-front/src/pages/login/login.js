document.getElementById('loginForm').addEventListener('submit', async function (e) {
      e.preventDefault();

      const form = e.target;
      const email = form.email.value.trim();
      const senha = form.senha.value;

      try {
        const response = await axios.post('http://localhost:5000/signin', {
          email,
          senha
        });

        const { token, idsession, idusuario } = response.data;

        // Salva no localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('idsession', idsession);
        localStorage.setItem('idusuario', idusuario)

        document.getElementById('resposta').innerText = '✅ Login realizado com sucesso!';

        // Redirecionar para a página principal (opcional)
        window.location.href = '../feed/feed.html';

      } catch (error) {
        console.error(error);
        const mensagem = error.response?.data?.message || 'Erro ao fazer login.';
        document.getElementById('resposta').innerText = '❌ ' + mensagem;
      }
    });