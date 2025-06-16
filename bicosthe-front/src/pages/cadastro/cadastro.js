const form = document.getElementById('formCadastro');
    const mensagem = document.getElementById('mensagem');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const dados = {
        cpf: form.cpf.value,
        nome: form.nome.value,
        email: form.email.value,
        senha: form.senha.value,
        celular: form.celular.value
      };

      try {
        const resposta = await axios.post('http://localhost:5000/signup', dados); // Altere para o endpoint real da sua API
        mensagem.textContent = 'Cadastro realizado com sucesso!';
        mensagem.style.color = 'green';
        form.reset();
      } catch (erro) {
        mensagem.textContent = 'Erro ao cadastrar. Verifique os dados.';
        mensagem.style.color = 'red';
        console.error(erro);
      }
    });