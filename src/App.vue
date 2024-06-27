<template>
    <div id="app">
        <h1>Lista de Tarefas</h1>
        <to-do-form @adicionarTarefa="addToDo"></to-do-form>
        <h2 id="resumo-lista" ref="listSummary" tabindex="-1">{{ resumoLista }}</h2>
        <ul aria-labelledby="resumo-lista" class="stack-large">
            <li v-for="item in itensToDo" :key="item.id">
                <to-do-item
                    :label="item.descricao"
                    :done="item.concluida"
                    :id="item.id"
                    @checkbox-alterado="atualizarStatusDone(item.id)"
                    @item-excluido="excluirToDo(item.id)"
                    @item-editado="editarToDo(item.id, $event)"
                    @aumentar-prioridade="aumentarPrioridade(item.id)"
                    @diminuir-prioridade="diminuirPrioridade(item.id)">
                </to-do-item>
            </li>
        </ul>
    </div>
</template>

<script>
import ToDoItem from "./components/ToDoItem.vue";
import ToDoForm from "./components/ToDoForm.vue";
import api from "./plugins/api.js";

export default {
    name: "app",
    components: {
        ToDoItem,
        ToDoForm,
    },
    data() {
        return {
            itensToDo: [],
        };
    },
    async created() {
        try {
            const response = await api.get("/tarefas");
            this.itensToDo = response.data;
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        async aumentarPrioridade(toDoId) {
            const response = await api.post(`/tarefas/mudarPrioridade/${toDoId}`, {
                novaPrioridade: 1,
            });
            this.itensToDo = response.data;
        },
        async diminuirPrioridade(toDoId) {
            try {
                const response = await api.post(`/tarefas/mudarPrioridade/${toDoId}`, {
                    novaPrioridade: -1,
                });
                this.itensToDo = response.data;
            } catch (error) {
                console.error('Erro ao mudar prioridade:', error);
                throw error;
            }
        },
        async addToDo(descricao) {
            try {
                const response = await api.post("/tarefas", {
                    descricao: descricao,
                    concluida: false,
                });
                this.itensToDo.push(response.data);
            } catch (error) {
                console.error(error);
            }
        },
        async atualizarStatusDone(toDoId) {
            try {
                const response = await api.put(`/tarefas/${toDoId}`, {
                    concluida: !this.itensToDo.find((item) => item.id === toDoId).concluida,
                    descricao: this.itensToDo.find((item) => item.id === toDoId).descricao,
                });
                const toDoAtualizado = response.data;
                const indiceItem = this.itensToDo.findIndex((item) => item.id === toDoId);
                this.itensToDo.splice(indiceItem, 1, toDoAtualizado);
            } catch (error) {
                console.error(error);
            }
        },
        async excluirToDo(toDoId) {
            try {
                const response = await api.delete(`/tarefas/${toDoId}`);
                if (response.status === 204) { // No Content
                    this.itensToDo = this.itensToDo.filter((item) => item.id !== toDoId);
                }
                console.log(response);
            } catch (error) {
                console.error('Erro ao excluir tarefa:', error);
                throw error;
            }
        },
        async editarToDo(toDoId, novaLabel) {
            try {
                const response = await api.put(`/tarefas/${toDoId}`, {
                    concluida: this.itensToDo.find((item) => item.id === toDoId).concluida,
                    descricao: novaLabel,
                });
                const toDoAtualizado = response.data;
                const indiceItem = this.itensToDo.findIndex((item) => item.id === toDoId);
                this.itensToDo.splice(indiceItem, 1, toDoAtualizado);
            } catch (error) {
                console.error(error);
            }
        },
    },
    computed: {
        resumoLista() {
            const numeroItensConcluidos = this.itensToDo.filter(
                (item) => item.concluida,
            ).length;
            return `${numeroItensConcluidos} de ${this.itensToDo.length} itens concluídos`;
        },
    },
};
</script>

<style>
/* Estilos globais */
.btn {
    padding: 0.8rem 1rem 0.7rem;
    border: 0.2rem solid #4d4d4d;
    cursor: pointer;
    text-transform: capitalize;
}

.btn__danger {
    color: #fff;
    background-color: #ca3c3c;
    border-color: #bd2130;
}

.btn__filter {
    border-color: lightgrey;
}

.btn__danger:focus {
    outline-color: #c82333;
}

.btn__primary {
    color: #fff;
    background-color: #000;
}

.btn-group {
    display: flex;
    justify-content: space-between;
}

.btn-group > * {
    flex: 1 1 auto;
}

.btn-group > * + * {
    margin-left: 0.8rem;
}

.label-wrapper {
    margin: 0;
    flex: 0 0 100%;
    text-align: center;
}

[class*="__lg"] {
    display: inline-block;
    width: 100%;
    font-size: 1.9rem;
}

[class*="__lg"]:not(:last-child) {
    margin-bottom: 1rem;
}

@media screen and (min-width: 620px) {
    [class*="__lg"] {
        font-size: 2.4rem;
    }
}

.visually-hidden {
    position: absolute;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px 1px 1px 1px);
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: rect(1px, 1px, 1px, 1px);
    white-space: nowrap;
}

[class*="stack"] > * {
    margin-top: 0;
    margin-bottom: 0;
}

.stack-small > * + * {
    margin-top: 1.25rem;
}

.stack-large > * + * {
    margin-top: 2.5rem;
}

@media screen and (min-width: 550px) {
    .stack-small > * + * {
        margin-top: 1.4rem;
    }

    .stack-large > * + * {
        margin-top: 2.8rem;
    }
}

/* Fim dos estilos globais */
#app {
    background: #fff;
    margin: 2rem 0 4rem 0;
    padding: 1rem;
    padding-top: 0;
    position: relative;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
    0 2.5rem 5rem 0 rgba(0, 0, 0, 0.1);
}

@media screen and (min-width: 550px) {
    #app {
        padding: 4rem;
    }
}

#app > * {
    max-width: 50rem;
    margin-left: auto;
    margin-right: auto;
}

#app > form {
    max-width: 100%;
}

#app h1 {
    display: block;
    min-width: 100%;
    width: 100%;
    text-align: center;
    margin: 0;
    margin-bottom: 1rem;
}
</style>
