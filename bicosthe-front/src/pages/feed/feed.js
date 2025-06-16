       const API_BASE_URL = 'http://localhost:5000'; // Sua API rodando localmente

        const bicosListDiv = document.getElementById('bicosList');
        const zonaSelect = document.getElementById('zona');
        const bairroSelect = document.getElementById('bairro');
        const categoriaSelect = document.getElementById('categoria');
        const valorMinInput = document.getElementById('valor-min');
        const valorMaxInput = document.getElementById('valor-max');
        const applyFiltersButton = document.getElementById('apply-filters');
        const loadingMessage = document.getElementById('loadingMessage');

        let allBairros = []; // Para armazenar todos os bairros e filtrar por zona

        // --- Funções de Ajuda ---
        function formatCurrency(value) {
            return parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }

        function renderBicos(bicos) {
            bicosListDiv.innerHTML = ''; 

            if (bicos.length === 0) {
                bicosListDiv.innerHTML = '<div class="loading-message">Nenhum bico encontrado com os filtros aplicados.</div>';
                return;
            }

            bicos.forEach(bico => {
                const bicoCard = document.createElement('div');
                bicoCard.className = 'bico-card';

                const bairroNome = bico.bairro_nome || 'Não informado'; 
                const zonaNome = bico.zona_nome || 'Não informada'; 
                const categoriasNomes = bico.categorias && bico.categorias.length > 0
                    ? bico.categorias.map(cat => cat.nome).join(', ') 
                    : 'Não informada';

                bicoCard.innerHTML = `
                    <h4>${bico.titulo}</h4>
                    <p>${bico.descricao}</p>
                    <p class="location">Bairro: ${bairroNome}, Zona: ${zonaNome}</p>
                    <p class="category">Categoria: ${categoriasNomes}</p>
                    <p class="price">${formatCurrency(bico.valor)}</p>
                `;
                bicosListDiv.appendChild(bicoCard);
            });
        }

        // --- Funções para Carregar Filtros Independentemente ---

        async function populateZonas() {
            zonaSelect.innerHTML = '<option value="">Carregando Zonas...</option>';
            zonaSelect.classList.add('loading');
            zonaSelect.disabled = true;

            try {
                const response = await axios.get(`${API_BASE_URL}/zonas`);
                zonaSelect.innerHTML = '<option value="">Todas as Zonas</option>';
                response.data.forEach(zona => {
                    const option = document.createElement('option');
                    option.value = zona.idzona;
                    option.textContent = zona.zona.charAt(0).toUpperCase() + zona.zona.slice(1);
                    zonaSelect.appendChild(option);
                });
            } catch (error) {
                console.error('Erro ao carregar Zonas:', error.response ? error.response.data : error.message);
                zonaSelect.innerHTML = '<option value="">Erro ao carregar Zonas</option>';
                // Mesmo com erro, pode ser útil tentar carregar novamente ou dar feedback
            } finally {
                zonaSelect.classList.remove('loading');
                zonaSelect.disabled = false;
            }
        }

        async function populateBairros() {
            bairroSelect.innerHTML = '<option value="">Carregando Bairros...</option>';
            bairroSelect.classList.add('loading');
            bairroSelect.disabled = true;

            try {
                const response = await axios.get(`${API_BASE_URL}/bairros`);
                allBairros = response.data; // Armazena todos os bairros
                populateBairrosSelect(allBairros); // Popula o select com todos
            } catch (error) {
                console.error('Erro ao carregar Bairros:', error.response ? error.response.data : error.message);
                bairroSelect.innerHTML = '<option value="">Erro ao carregar Bairros</option>';
            } finally {
                bairroSelect.classList.remove('loading');
                bairroSelect.disabled = false;
            }
        }

        function populateBairrosSelect(bairrosToDisplay) {
            bairroSelect.innerHTML = '<option value="">Todos os Bairros</option>';
            bairrosToDisplay.forEach(bairro => {
                const option = document.createElement('option');
                option.value = bairro.idbairro; 
                option.textContent = bairro.bairro;
                bairroSelect.appendChild(option);
            });
        }

        async function populateCategorias() {
            categoriaSelect.innerHTML = '<option value="">Carregando Categorias...</option>';
            categoriaSelect.classList.add('loading');
            categoriaSelect.disabled = true;

            try {
                const response = await axios.get(`${API_BASE_URL}/categories`);
                categoriaSelect.innerHTML = '<option value="">Todas as Categorias</option>';
                response.data.forEach(categoria => {
                    const option = document.createElement('option');
                    option.value = categoria.idcategoria; 
                    option.textContent = categoria.nome;
                    categoriaSelect.appendChild(option);
                });
            } catch (error) {
                console.error('Erro ao carregar Categorias:', error.response ? error.response.data : error.message);
                categoriaSelect.innerHTML = '<option value="">Erro ao carregar Categorias</option>';
            } finally {
                categoriaSelect.classList.remove('loading');
                categoriaSelect.disabled = false;
            }
        }

        // Função principal para buscar bicos (mantida)
        async function fetchBicos() {
            loadingMessage.style.display = 'block'; 
            bicosListDiv.innerHTML = ''; 

            const params = {
                zona: zonaSelect.value,
                bairro: bairroSelect.value,
                categoria: categoriaSelect.value,
                valorMin: valorMinInput.value,
                valorMax: valorMaxInput.value
            };

            Object.keys(params).forEach(key => {
                if (params[key] === '' || params[key] === null || params[key] === undefined) {
                    delete params[key];
                }
            });

            try {
                console.log('Buscando bicos com os seguintes parâmetros:', params);
                const response = await axios.get(`${API_BASE_URL}/bicos`, { params });
                renderBicos(response.data);
            } catch (error) {
                console.error('Erro ao buscar bicos:', error.response ? error.response.data : error.message);
                bicosListDiv.innerHTML = '<div class="loading-message" style="color: red;">Erro ao carregar os bicos. Tente novamente.</div>';
            } finally {
                loadingMessage.style.display = 'none'; 
            }
        }

        // --- Event Listeners e Inicialização ---
        applyFiltersButton.addEventListener('click', fetchBicos);

        zonaSelect.addEventListener('change', () => {
            const selectedZonaId = zonaSelect.value;
            let filteredBairros = allBairros;

            if (selectedZonaId) {
                filteredBairros = allBairros.filter(bairro => String(bairro.idzona) === selectedZonaId);
            }
            populateBairrosSelect(filteredBairros);
            //fetchBicos(); // Dispara nova busca de bicos ao mudar a zona
        });

        // Carregar TUDO ao carregar a página
        document.addEventListener('DOMContentLoaded', async () => {
            // Carrega os filtros independentemente
            await populateZonas();
            await populateBairros();
            await populateCategorias();

            // Carrega os bicos iniciais (sem filtros aplicados inicialmente)
            fetchBicos(); 
        });