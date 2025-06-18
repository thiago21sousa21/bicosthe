// menu.js

document.addEventListener('DOMContentLoaded', () => {
    const navHtml = /*html*/`
        <style>
            /* --- Estilo Profissional para o Menu de Navegação --- */

/* Importando uma fonte mais moderna do Google Fonts (Opcional, mas recomendado) */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

/* Estilo base da barra de navegação */
.main-nav {
    background-color: #2c3e50; /* Um azul marinho/cinza escuro e sóbrio */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Sombra sutil para dar profundidade */
    font-family: 'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Fonte moderna com boas alternativas */
    width: 100%;
}

/* Estilo da lista (ul) que contém os links */
.main-nav ul {
    display: flex; /* Transforma a lista em um container flexível (essencial para o alinhamento) */
    align-items: center; /* Alinha os itens verticalmente ao centro */
    list-style-type: none; /* Remove os pontos (bullets) da lista */
    margin: 0;
    padding: 0 10px; /* Adiciona um pequeno preenchimento nas laterais da barra */
    height: 60px; /* Altura fixa para a barra de navegação */
}

/* Estilo para cada item da lista (li) */
.main-nav li {
    margin: 0 5px; /* Pequeno espaçamento entre os itens */
}

/* Estilo geral para todos os links (a) dentro do menu */
.main-nav li a {
    color: #ecf0f1; /* Cor de texto clara (quase branco) */
    text-decoration: none; /* Remove o sublinhado padrão dos links */
    padding: 20px 15px; /* Aumenta a área clicável do link */
    font-size: 16px;
    font-weight: 500; /* Deixa a fonte um pouco mais forte */
    display: block; /* Permite que o padding funcione corretamente */
    transition: background-color 0.3s ease, color 0.3s ease; /* Animação suave para o efeito hover */
    border-radius: 4px; /* Bordas levemente arredondadas */
}

/* Efeito ao passar o mouse sobre os links */
.main-nav li a:hover {
    background-color: #34495e; /* Cor de fundo um pouco mais clara ao passar o mouse */
    color: #ffffff; /* Texto fica branco puro para maior destaque */
}

/* --- Alinhamento e Itens Específicos --- */

/* Joga os itens de Login e Sair para a direita */
#loginMenuItem,
#logoutMenuItem {
    margin-left: auto; /* A "mágica" do Flexbox para empurrar para a direita */
}

/* Estilo de "Call to Action" (CTA) para o botão "Cadastrar Serviço" */
.main-nav li a[href*="novo-bico.html"] {
    background-color: #3498db; /* Cor de destaque (azul) */
    color: #ffffff;
    font-weight: 700;
}

.main-nav li a[href*="novo-bico.html"]:hover {
    background-color: #2980b9; /* Um azul um pouco mais escuro no hover */
}

/* Estilo para o botão de Sair (Logout) */
#logoutButton {
    color: #e74c3c; /* Cor vermelha para indicar uma ação de "saída" ou "destrutiva" */
    font-weight: bold;
}

#logoutButton:hover {
    background-color: #e74c3c;
    color: #ffffff;
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