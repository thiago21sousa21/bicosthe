  const token = localStorage.getItem('token');
    const idusuario = localStorage.getItem('idusuario');

    if (!token || !idusuario) {
      // Se não estiver logado, redireciona para a página de login
      window.location.href = 'login.html';
    }

    function formatDateToMySQL(datetimeStr) {
        //essa função aqui está recebendo uma data como paratro e mudando o formato original que era iso (ex: 2024-10-26T17:30:00) para
        //o formato AAAA-MM-DD HH:MM:SS por que o banco de dados esta esperando nesse formato
        const date = new Date(datetimeStr);
        const pad = (n) => n.toString().padStart(2, '0');

        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    document.getElementById('servicoForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;

    const data = {
        // aqui esta sendo criado um objeto (no python seria um dicionario) esse objeto vai ser enviado ele tem os campos titulo, valor...
        valor: parseFloat(form.valor.value),
        titulo: form.titulo.value,
        descricao: form.descricao.value,
        dataInicio: formatDateToMySQL(form.dataInicio.value),
        dataFim: formatDateToMySQL(form.dataFim.value),
        idregiao: parseInt(form.idregiao.value),
        usuarioId: parseInt(localStorage.getItem('idusuario')),
        contato_visivel: form.contato_visivel.checked,
        categorias: form.categorias.value.split(',').map(id => parseInt(id.trim()))
    };

    try {
        const res = await axios.post('http://localhost:5000/novo-bico', data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        });

        document.getElementById('resposta').innerText = '✅ Serviço cadastrado com sucesso!';
        form.reset();
    } catch (err) {
        console.error(err);
        const mensagem = err.response?.data || err.message;
        document.getElementById('resposta').innerText = '❌ Erro ao cadastrar serviço: ' + mensagem;
    }
    });