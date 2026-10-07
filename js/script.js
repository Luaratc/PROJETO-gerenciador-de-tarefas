const formulario = document.getElementById("form-tarefa");
const listaTarefas = document.getElementById("lista-tarefas");
const filtroStatus = document.getElementById("filtro-status");
const filtroCategoria = document.getElementById("filtro-categoria");
const totalTarefas = document.getElementById("total-tarefas");
const totalPendentes= document.getElementById("total-pendentes");
const totalConcluidas = getElementById("total=concluidas");

function atualizarIndicadores(){
    const total= tarefas.length;

    let concluidas=0;
    let pendentes=0;
    
    for (let i=0;i<tarefas.length;i++){
        const tarefa = tarefas [i];
        
        if (tarefa.concluida===true){
            concluidas+=1;
        }else{
            pendentes+=1;
        }
    }
    totalTarefas.textContent=total;
    totalConcluidas.textContent=concluidas;
    tarefasPendentes.textContent=pendentes;

}

function exibirTarefas() {
    atualizarIndicadores();
    listaTarefas.innerHTML = "";

    const statusSelecionado = filtroStatus.value;
    const categoriaSelecionada = filtroCategoria.value;

    const tarefasFiltradas= tarefas.filter(function (tarefa){
        let checagemStatus=false;
        let checagemCategoria=false;

        if(statusSelecionado==="Todas"){
            checagemStatus=true;
        }else if (statusSelecionado==="Concluidas" && tarefa.concluida===true){
            checagemStatus=true;
        }else if(statusSelecionado==="Pendentes" && tarefa.concluida===false){
            checagemStatus=true;
        }

        if(categoriaSelecionada==="Todas"){
            checagemCategoria=true;
        }else if(tarefa.categoria===categoriaSelecionada){
            checagemCategoria=true;
        }

        if(checagemStatus===true && checagemCategoria===true){
            return true;
        }else{
            return false;
        }

    });

    for (let i = 0; i < tarefasFiltradas.length; i++) {
        const tarefa = tarefasFiltradas[i];

        const item = document.createElement("div");

        const descricao = document.createElement("p");
        descricao.textContent = tarefa.descricao;
        item.appendChild(descricao);

        const categoria = document.createElement("p");
        categoria.textContent = tarefa.categoria;
        item.appendChild(categoria);

        const prioridade = document.createElement("p");
        prioridade.textContent = tarefa.prioridade;
        item.appendChild(prioridade);

        const data = document.createElement("p");
        data.textContent = tarefa.data;
        item.appendChild(data);

        const status = document.createElement("p");
        if (tarefa.concluida) {
            status.textContent = "Concluída";
        } else {
            status.textContent = "Pendente";
        }
        item.appendChild(status);


        if (!tarefa.concluida) {
            const botaoConcluir = document.createElement("button");
            botaoConcluir.textContent = "Concluir";
            botaoConcluir.type = "button";

            botaoConcluir.addEventListener("click", function () {
                tarefa.concluida = true;
                exibirTarefas();
            })
            item.appendChild(botaoConcluir);
        }

        if (tarefa.concluida) {
            const botaoDesfazer = document.createElement("button");
            botaoDesfazer.textContent = "Desfazer Conclusão";
            botaoDesfazer.type = "button";

            botaoDesfazer.addEventListener("click", function () {
                tarefa.concluida = false;
                exibirTarefas();
            })
            item.appendChild(botaoDesfazer);
        }

        const excluirTarefa = document.createElement("button");
        excluirTarefa.textContent = "Excluir";
        excluirTarefa.type = "button";
        excluirTarefa.addEventListener("click", function () {
            const posicaoReal= tarefas.indexOf(tarefa);
            if(posicaoReal >= 0){
                tarefas.splice(posicaoReal,1);
                exibirTarefas();
            }
        })
        item.appendChild(excluirTarefa);
        listaTarefas.appendChild(item);
    }
}


let tarefas = [];
filtroCategoria.addEventListener("change", exibirTarefas);
filtroStatus.addEventListener("change", exibirTarefas);

formulario.addEventListener('submit', function (event) {
    event.preventDefault();
    const descricao = document.getElementById("descricao").value;
    const categoria = document.getElementById("categoria").value;
    const prioridade = document.getElementById("prioridade").value;
    const data = document.getElementById("data").value;

    const tarefa = {
        descricao: descricao,
        categoria: categoria,
        prioridade: prioridade,
        data: data,
        concluida: false
    }

    tarefas.push(tarefa);
    exibirTarefas();
    console.log(tarefas);
});