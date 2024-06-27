<script setup>

</script>

<template>
    <form @submit.prevent="onSubmit">
        Pica
        <h2 class="label-wrapper">
            <label for="new-todo-input" class="label__lg" style="color: black">
                Tarefas
            </label>
        </h2>
        <input
            type="text"
            id="new-todo-input"
            name="nova-tarefa"
            autocomplete="off"
            v-model.lazy.trim="label"
            class="input__lg" />
        <button type="submit" class="btn btn__primary btn__lg">Adicionar</button>
    </form>
</template>

<script>
export default {
    methods: {
        onSubmit() {
            if (this.label === "") {
                return;
            }
            this.$emit("adicionarTarefa", this.label);
            this.label = "";
        },
    },
    data() {
        return {
            label: "",
        };
    },
};
</script>

<style scoped>
/* Adicione aqui seu estilo personalizado, se necessário */
</style>
