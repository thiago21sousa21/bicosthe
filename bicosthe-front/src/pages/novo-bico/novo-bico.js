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

// --- Funções para popular os Dropdowns ---

async function fetchAndPopulateZonas() { // Renomeado de Regions para Zonas
    try {
        const response = await axios.get('http://localhost:5000/zonas', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
       
        const zonas = response.data;
        const zonaSelect = document.getElementById('zona'); // Referencia o novo select de zona
        zonaSelect.innerHTML = '<option value="">Selecione uma Zona</option>'; // Limpa e adiciona placeholder
        zonas.forEach(zona => {
            const option = document.createElement('option');
            option.value = zona.idzona;
            option.textContent = zona.zona;
            zonaSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao buscar zonas:', error);
        document.getElementById('resposta').innerText = '❌ Erro ao carregar zonas.';
    }
}

async function fetchAndPopulateBairros(idZona = null) { // Agora aceita idZona como parâmetro
    const bairroSelect = document.getElementById('bairro');
    bairroSelect.innerHTML = '<option value="">Selecione um Bairro</option>'; // Limpa e adiciona placeholder
    bairroSelect.disabled = true; // Desabilita por padrão

    if (!idZona) { // Se nenhuma zona for selecionada, não busca bairros
        return;
    }

    try {
        const response = await axios.get(`http://localhost:5000/bairros?idzona=${idZona}`, { // Requisição com filtro
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        const bairros = response.data;
        
        bairros.forEach(bairro => {
            const option = document.createElement('option');
            option.value = bairro.idbairro;
            option.textContent = bairro.bairro;
            bairroSelect.appendChild(option);
        });
        bairroSelect.disabled = false; // Habilita o select de bairro após carregar
    } catch (error) {
        console.error('Erro ao buscar bairros:', error);
        document.getElementById('resposta').innerText = '❌ Erro ao carregar bairros.';
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
        categoriasSelect.innerHTML = ''; // Limpa antes de popular
        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria.idcategoria;
            option.textContent = categoria.nome;
            categoriasSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        document.getElementById('resposta').innerText = '❌ Erro ao carregar categorias.';
    }
}

// --- Event Listeners ---

document.addEventListener('DOMContentLoaded', () => {
    fetchAndPopulateZonas(); // Popula as zonas ao carregar a página
    fetchAndPopulateCategories(); // Popula as categorias
    // fetchAndPopulateBairros() NÃO é chamado aqui, pois depende da seleção de zona
});

// Listener para o select de zona
document.getElementById('zona').addEventListener('change', (e) => {
    const selectedZonaId = e.target.value;
    if (selectedZonaId) {
        fetchAndPopulateBairros(selectedZonaId); // Busca e popula bairros para a zona selecionada
    } else {
        // Se "Selecione uma Zona" for escolhido, limpa e desabilita bairros
        const bairroSelect = document.getElementById('bairro');
        bairroSelect.innerHTML = '<option value="">Selecione um Bairro</option>';
        bairroSelect.disabled = true;
    }
});

document.getElementById('servicoForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const selectedCategories = Array.from(form.categorias.selectedOptions).map(option => parseInt(option.value));

    const data = {
        valor: parseFloat(form.valor.value),
        titulo: form.titulo.value,
        descricao: form.descricao.value,
        dataInicio: formatDateToMySQL(form.dataInicio.value),
        dataFim: formatDateToMySQL(form.dataFim.value),
        // ATENÇÃO: idbairro é o nome do campo no formulário
        idbairro: parseInt(form.idbairro.value), // Agora pegando do campo correto 'idbairro'
        usuarioId: parseInt(localStorage.getItem('idusuario')),
        contato_visivel: false, 
        categorias: selectedCategories
    };

    console.log('Dados do formulário:', data);

    try {
        const res = await axios.post('http://localhost:5000/novo-bico', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        document.getElementById('resposta').innerText = '✅ Serviço cadastrado com sucesso!';
        form.reset();
        // Após o reset, repopular as zonas e categorias
        fetchAndPopulateZonas();
        fetchAndPopulateCategories();
        // O campo de bairro será desabilitado e limpo pelo evento 'change' da zona (já que a zona será resetada)
    } catch (err) {
        const mensagem = err.response?.data || err.message; // Melhorado para pegar 'message' do erro
        document.getElementById('resposta').innerText = '❌ Erro ao cadastrar serviço: ' + mensagem;
    }
});