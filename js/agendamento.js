// URL do backend
const baseURL = "http://localhost:3000"; // Atualize com a URL do seu backend

// Carrega os advogados na lista
async function loadAdvogados() {
    try {
        const response = await fetch(`${baseURL}/advogados`);
        const advogados = await response.json();

        const select = document.getElementById("advogado");
        select.innerHTML = '<option value="">Selecione</option>'; // Reseta o dropdown

        advogados.forEach(adv => {
            const option = document.createElement("option");
            option.value = adv.id_adv;
            option.textContent = `${adv.nome_adv} - ${adv.atuacao_adv}`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar advogados:", error);
    }
}

// Envia o agendamento ao backend
async function submitForm(event) {
    event.preventDefault();

    const token = localStorage.getItem("token"); // Pega o token do localStorage
    if (!token) {
        alert("Você precisa estar autenticado!");
        return;
    }

    const formData = {
        fk_id_user: null, // Será preenchido pelo backend via token
        fk_id_adv: document.getElementById("advogado").value,
        data_agend: document.getElementById("data").value,
        horario_agend: document.getElementById("horario").value,
        descricao: document.getElementById("descricao").value,
    };

    try {
        const response = await fetch(`${baseURL}/agendamentos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert("Consulta agendada com sucesso!");
            document.getElementById("agendamento-form").reset();
        } else {
            const error = await response.json();
            alert(`Erro: ${error.message}`);
        }
    } catch (error) {
        console.error("Erro ao agendar consulta:", error);
    }
}

// Adiciona eventos e inicializa
document.addEventListener("DOMContentLoaded", () => {
    loadAdvogados();
    document.getElementById("agendamento-form").addEventListener("submit", submitForm);
});
