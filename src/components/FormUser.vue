<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useformUserStore } from "../stores/formUser";

const { editing, nameUser, ocupationUser } = storeToRefs(useformUserStore());
const { onSubmit } = useformUserStore();
</script>

<template>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-2">
        <h1 className="text-5xl font-bold text-center">User List</h1>
        <h2 class="text-center text-2xl">
            {{ editing ? "Update user" : "Create user" }}
        </h2>
        <div class="grid">
            <label>Name user</label>
            <input
                class="input placeholder:text-black"
                type="text"
                v-model="nameUser"
                :placeholder="'ej: John doe'"
            />
        </div>

        <div class="grid">
            <label>Rol user</label>
            <select v-model="ocupationUser" class="input">
                <option disabled value="">Please select one</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="Q&A">Q&A</option>
                <option value="DevOps">DevOps</option>
            </select>
        </div>
        <button
            class="bg-green-500 w-1/2 m-auto px-3 py-2 rounded-full"
            :class="{ 'bg-yellow-500': editing }"
        >
            {{ editing ? "Edit" : "Create" }}
        </button>
    </form>
</template>
