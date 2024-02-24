<script setup lang="ts">
const filters = defineModel();
</script>

<template>
    <div class="grid">
        <label for="">Filtrar por</label>
        <select class="input" v-model="filters">
            <option disabled value="">Please select one</option>
            <option value="">All</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="Q&A">Q&A</option>
            <option value="DevOps">DevOps</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
        </select>
    </div>
</template>
