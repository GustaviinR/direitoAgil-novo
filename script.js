function abrirModal(nome, especialidade, oab, descricao) {
    document.getElementById("advogado-nome").textContent = nome;
    document.getElementById("advogado-especialidade").textContent = `Especialidade: ${especialidade}`;
    document.getElementById("advogado-oab").textContent = `OAB: ${oab}`;
    document.getElementById("advogado-descricao").textContent = descricao;

    const modal = document.getElementById("modal-advogado");
    modal.classList.add("show");
}

function fecharModal() {
    const modal = document.getElementById("modal-advogado");
    modal.classList.remove("show");
}



document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem("token");

    // Verifica se o token existe
    if (token) {
        const decodedToken = decodeJWT(token);
        const nome = decodedToken.nome;
        const role = decodedToken.role;

        // Exibe o nome do usuário ou advogado
        document.getElementById("usuario-nome").innerText = `Bem-vindo, ${nome}`;
        document.getElementById("usuario-info").classList.remove("hidden"); // Mostra o nome
        document.getElementById("entrar-btn").style.display = "none"; // Oculta o botão de entrar

        // Habilita os botões de consulta
        document.getElementById("agendar-consulta-btn1").disabled = false;
        document.getElementById("agendar-consulta-btn2").disabled = false;
        document.getElementById("gerenciar-consultas-btn").disabled = false;
        

        // Opcionalmente, redireciona o usuário com base no role (usuário ou advogado)
        if (role === "advogado") {
            // Redireciona para uma página específica de advogado, caso necessário
            console.log("Advogado autenticado");
        }
    } else {
        // Se o token não existir, mantém os botões desabilitados
        document.getElementById("agendar-consulta-btn1").disabled = true;
        document.getElementById("agendar-consulta-btn2").disabled = true;
        document.getElementById("gerenciar-consultas-btn").disabled = true;
    }
});

// Função para decodificar o JWT
function decodeJWT(token) {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
}

// Função para realizar logout
function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "http://127.0.0.1:5500/login.html"; // Redireciona para a página de login
}


// Função para agendar consultas
function agendarConsulta() {
    window.location.href = "http://127.0.0.1:5500/agendamento.html";
}

function gerenciarConsultas() {
    window.location.href = "http://127.0.0.1:5500/consulta.html";
}