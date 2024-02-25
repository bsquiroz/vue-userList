<script setup lang="ts">
import Layout from "./components/Layout.vue";
import Users from "./components/Users.vue";
import FormUser from "./components/FormUser.vue";
import Filter from "./components/Filters.vue";
</script>

<template>
    <Layout>
        <section class="flex flex-col gap-2">
            <FormUser />
            <Filter />
            <Users />
        </section>
    </Layout>
</template>

<style>
.label {
    @apply px-2 rounded-md text-xs uppercase font-bold;
}
.btn {
    @apply px-1 rounded-sm font-bold text-sm cursor-pointer text-black hover:opacity-90;
}

.input {
    @apply px-2 py-1 rounded-full outline-none text-black;
}
</style>
