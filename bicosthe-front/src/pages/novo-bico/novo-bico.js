const token = localStorage.getItem('token');
const idusuario = localStorage.getItem('idusuario');

if (!token || !idusuario) {
  // Se não estiver logado, redireciona para a página de login
  window.location.href = '../login/login.html';
}

function formatDateToMySQL(datetimeStr) {
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

async function fetchAndPopulateRegions() {
    try {
        const response = await axios.get('http://localhost:5000/zonas', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
       
        const regioes = response.data;
        const regiaoSelect = document.getElementById('regiao');
        regioes.forEach(regiao => {
            const option = document.createElement('option');
            option.value = regiao.idzona;
            option.textContent = regiao.zona; // Assuming 'nome' is the property for region name
            regiaoSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao buscar regiões:', error);
        document.getElementById('resposta').innerText = '❌ Erro ao carregar regiões.';
    }
}

async function fetchAndPopulateCategories() {
    try {
        const response = await axios.get('http://localhost:5000/categories', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const categorias = response.data;
        const categoriasSelect = document.getElementById('categorias');
        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria.idcategoria;
            option.textContent = categoria.nome; // Assuming 'nome' is the property for category name
            categoriasSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        document.getElementById('resposta').innerText = '❌ Erro ao carregar categorias.';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAndPopulateRegions();
    fetchAndPopulateCategories();
});

document.getElementById('servicoForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const selectedCategories = Array.from(form.categorias.selectedOptions).map(option => parseInt(option.value));
    console.log('Categorias selecionadas:', selectedCategories); // Log selected categories

    const data = {
        valor: parseFloat(form.valor.value),
        titulo: form.titulo.value,
        descricao: form.descricao.value,
        dataInicio: formatDateToMySQL(form.dataInicio.value),
        dataFim: formatDateToMySQL(form.dataFim.value),
        idregiao: parseInt(form.idregiao.value),
        usuarioId: parseInt(localStorage.getItem('idusuario')),
        contato_visivel: false, // Default to false, as per requirement
        categorias: selectedCategories
    };

    console.log('Dados do formulário:', data); // Log the data being sent

    try {
        const res = await axios.post('http://localhost:5000/novo-bico', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        document.getElementById('resposta').innerText = '✅ Serviço cadastrado com sucesso!';
        form.reset();
        // Re-fetch and populate categories/regions if you want them to reset after submission
        fetchAndPopulateRegions();
        fetchAndPopulateCategories();
    } catch (err) {
        const mensagem = err.response?.data || err; // Access 'message' from the error response
        document.getElementById('resposta').innerText = '❌ Erro ao cadastrar serviço: ' + mensagem;
    }
});