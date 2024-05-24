<template>
    <div id="app">
        <h1>Lista de Tarefas</h1>
        <to-do-form @adicionarTarefa="addToDo"></to-do-form>
        <h2 id="resumo-lista" ref="listSummary" tabindex="-1">{{ resumoLista }}</h2>
        <ul aria-labelledby="resumo-lista" class="stack-large">
            <li v-for="item in itensToDo" :key="item.id">
                <to-do-item
                    :label="item.label"
                    :done="item.done"
                    :id="item.id"
                    @checkbox-alterado="atualizarStatusDone(item.id)"
                    @item-excluido="excluirToDo(item.id)"
                    @item-editado="editarToDo(item.id, $event)">
                </to-do-item>
            </li>
        </ul>
    </div>
</template>

<script>
import ToDoItem from "./components/ToDoItem.vue";
import ToDoForm from "./components/ToDoForm.vue";
import { nanoid } from "nanoid";

export default {
    name: "app",
    components: {
        ToDoItem,
        ToDoForm,
    },
    data() {
        return {
            itensToDo: [
                { id: "todo-" + nanoid(), label: "Aprender Vue", done: false },
                {
                    id: "todo-" + nanoid(),
                    label: "Criar um projeto Vue com o CLI",
                    done: true,
                },
                { id: "todo-" + nanoid(), label: "Divertir-se", done: true },
                { id: "todo-" + nanoid(), label: "Criar uma lista de tarefas", done: false },
            ],
        };
    },
    methods: {
        addToDo(toDoLabel) {
            this.itensToDo.push({
                id: "todo-" + nanoid(),
                label: toDoLabel,
                done: false,
            });
        },
        atualizarStatusDone(toDoId) {
            const toDoParaAtualizar = this.itensToDo.find((item) => item.id === toDoId);
            toDoParaAtualizar.done = !toDoParaAtualizar.done;
        },
        excluirToDo(toDoId) {
            const indiceItem = this.itensToDo.findIndex((item) => item.id === toDoId);
            this.itensToDo.splice(indiceItem, 1);
            this.$refs.listSummary.focus();
        },
        editarToDo(toDoId, novaLabel) {
            const toDoParaEditar = this.itensToDo.find((item) => item.id === toDoId);
            toDoParaEditar.label = novaLabel;
        },
    },
    computed: {
        resumoLista() {
            const numeroItensConcluidos = this.itensToDo.filter(
                (item) => item.done,
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
    box-shadow:
        0 2px 4px 0 rgba(0, 0, 0, 0.2),
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
