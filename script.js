const alunos = JSON.parse(localStorage.getItem('alunos')) || [];



function renderListaAlunos() {
    const lista = document.getElementById('listaAlunos');
    lista.innerHTML = '';
    alunos.forEach((aluno, index) => {
        const alunoItem = document.createElement('li');
        alunoItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        alunoItem.innerHTML = `
            ${aluno.nome} -  ${aluno.telefone} - ${aluno.modalidade}
            <button class="btn btn-danger" onclick="removerAluno(${index})">Remover</button>
        `;
        lista.appendChild(alunoItem);
    });
    localStorage.setItem('alunos', JSON.stringify(alunos));
}

function adicionarAluno(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const modalidade = document.getElementById('modalidade').value;
    if (nome && telefone && modalidade) {
        alunos.push({ nome, telefone, modalidade});
        document.getElementById('cadastroForm').reset();
        renderListaAlunos();
    }
}

let alunoIndexParaEditar = null; // Variável para rastrear o índice do aluno em edição

function renderListaAlunos() {
    const lista = document.getElementById('listaAlunos');
    lista.innerHTML = '';
    alunos.forEach((aluno, index) => {
        const alunoItem = document.createElement('li');
        alunoItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        alunoItem.innerHTML = `
            ${index + 1}. ${aluno.nome} - ${aluno.telefone} - ${aluno.modalidade}
            <div>
                <button class="btn btn-info btn-sm mr-2" onclick="editarAluno(${index})">
                    <img src='img/editing.png'>
                </button>
                <button class="btn btn-danger btn-sm" onclick="removerAluno(${index})">Remover</button>
            </div>
        `;
        lista.appendChild(alunoItem);
    });
}



function adicionarOuEditarAluno(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const modalidade = document.getElementById('modalidade').value;

    if (alunoIndexParaEditar !== null) {
        // Atualiza o aluno existente
        alunos[alunoIndexParaEditar] = { nome, telefone, modalidade };
        alunoIndexParaEditar = null; // Reseta o índice para null após editar
        document.getElementById('cadastroForm').querySelector('button[type="submit"]').textContent = "Cadastrar Aluno"; // Volta o botão para "Cadastrar"
    } else {
        // Adiciona um novo aluno
        alunos.push({ nome, telefone, modalidade });
    }

    document.getElementById('cadastroForm').reset(); // Limpa o formulário
    renderListaAlunos(); // Atualiza a lista
}

function editarAluno(index) {
    const aluno = alunos[index];
    document.getElementById('nome').value = aluno.nome;
    document.getElementById('telefone').value = aluno.telefone;
    document.getElementById('modalidade').value = aluno.modalidade;
    localStorage.setItem('alunoIndexParaEditar', index);
    localStorage.setItem('alunoParaEditar', JSON.stringify(aluno));
    
    alunoIndexParaEditar = index; // Define o índice para edição
    document.getElementById('cadastroForm').querySelector('button[type="submit"]').textContent = "Salvar Alterações"; // Altera o botão para "Salvar Alterações"
   
        window.location.href = `editar.html?index=${index}`;
    
    
}

document.getElementById('cadastroForm').addEventListener('submit', adicionarOuEditarAluno);




function removerAluno(index) {
    const confirmarExclusao = confirm("Tem certeza que deseja excluir este aluno?");
    if (confirmarExclusao) {
        alunos.splice(index, 1);
        renderListaAlunos();
    }
}


// Funções para alternar entre cadastro e lista
function mostrarLista() {
    document.getElementById('cadastroSection').style.display = 'none';
    document.getElementById('listaSection').style.display = 'block';
    renderListaAlunos();
}

function mostrarCadastro() {
    document.getElementById('cadastroSection').style.display = 'block';
    document.getElementById('listaSection').style.display = 'none';
}

// Adiciona eventos aos botões de alternância
document.getElementById('verAlunosBtn').addEventListener('click', mostrarLista);
document.getElementById('voltarBtn').addEventListener('click', mostrarCadastro);

// Evento de envio do formulário
document.getElementById('cadastroForm').addEventListener('submit', adicionarAluno);

// Renderiza a lista inicialmente, se houver dados
renderListaAlunos();
