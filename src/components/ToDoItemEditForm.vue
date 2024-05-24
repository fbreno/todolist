<template>
    <form class="stack-small" @submit.prevent="onSubmit">
        <div>
            <label class="edit-label">Editar Nome para &quot;{{ label }}&quot;</label>
            <input
                :id="id"
                ref="labelInput"
                type="text"
                autocomplete="off"
                v-model.lazy.trim="novoNome" />
        </div>
        <div class="btn-group">
            <button type="button" class="btn" @click="onCancel">
                Cancelar
                <span class="visually-hidden">editando {{ label }}</span>
            </button>
            <button type="submit" class="btn btn__primary">
                Salvar
                <span class="visually-hidden">edição para {{ label }}</span>
            </button>
        </div>
    </form>
</template>
<script>
export default {
    props: {
        label: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            novoNome: this.label,
        };
    },
    methods: {
        onSubmit() {
            if (this.novoNome && this.novoNome !== this.label) {
                this.$emit("item-editado", this.novoNome);
            }
        },
        onCancel() {
            this.$emit("edicao-cancelada");
        },
    },
    mounted() {
        const labelInputRef = this.$refs.labelInput;
        labelInputRef.focus();
    },
};
</script>
<style scoped>
.edit-label {
    font-family: Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #0b0c0c;
    display: block;
    margin-bottom: 5px;
}
input {
    display: inline-block;
    margin-top: 0.4rem;
    width: 100%;
    min-height: 4.4rem;
    padding: 0.4rem 0.8rem;
    border: 2px solid #565656;
}
form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
form > * {
    flex: 0 0 100%;
}
</style>
