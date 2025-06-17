// menu.js

document.addEventListener('DOMContentLoaded', () => {
    const navHtml = /*html*/`
        <style>
            .main-nav {
                background-color: #333;
                overflow: hidden;
                padding: 10px 0;
                margin-bottom: 20px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            }
            .main-nav ul {
                list-style-type: none;
                margin: 0;
                padding: 0;
                text-align: center; /* Centraliza os itens */
            }
            .main-nav ul li {
                display: inline-block; /* Alinha os itens na horizontal */
                margin: 0 15px; /* Espaçamento entre os itens */
            }
            .main-nav ul li a {
                color: white;
                text-decoration: none;
                padding: 8px 15px;
                display: block;
                border-radius: 5px;
                transition: background-color 0.3s ease;
            }
            .main-nav ul li a:hover {
                background-color: #575757;
            }
            .main-nav .active a {
                background-color: #007bff; /* Cor para a página ativa */
            }
        </style>
        <nav class="main-nav">
            <ul>
                <li><a href="../feed/feed.html">Feed de Bicos</a></li>
                <li><a href="../novo-bico/novo-bico.html">Cadastrar Serviço</a></li>
                <li><a href="../cadastro/cadastro.html">Cadastrar Usuário</a></li>
                <li id="loginMenuItem"><a href="../login/login.html">Login</a></li>
                <li id="logoutMenuItem" style="display: none;"><a href="#" id="logoutButton">Sair</a></li>
            </ul>
        </nav>
    `;

    // Cria um elemento div para o menu e insere o HTML
    const navContainer = document.createElement('div');
    navContainer.innerHTML = navHtml;

    // Adiciona o menu ao corpo da página, geralmente no início
    document.body.prepend(navContainer);

    // Lógica para mostrar/esconder Login/Sair e lidar com o logout
    const token = localStorage.getItem('token');
    const loginMenuItem = document.getElementById('loginMenuItem');
    const logoutMenuItem = document.getElementById('logoutMenuItem');
    const logoutButton = document.getElementById('logoutButton');

    if (token) {
        // Se há token, o usuário está logado
        if (loginMenuItem) loginMenuItem.style.display = 'none';
        if (logoutMenuItem) logoutMenuItem.style.display = 'inline-block';
    } else {
        // Se não há token, o usuário não está logado
        if (loginMenuItem) loginMenuItem.style.display = 'inline-block';
        if (logoutMenuItem) logoutMenuItem.style.display = 'none';
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            // Limpa o localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('idsession');
            localStorage.removeItem('idusuario');
            // Redireciona para a página de login ou feed
            window.location.href = '../login/login.html'; 
        });
    }

    // Marca o link ativo no menu
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = navContainer.querySelectorAll('.main-nav ul li a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.parentElement.classList.add('active');
        }
    });
});