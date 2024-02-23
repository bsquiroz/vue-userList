<script setup lang="ts">
import { Ref, ref } from "vue";
import Layout from "./components/Layout.vue";

interface User {
    id: string;
    name: string;
    state: boolean;
}

const users: Ref<User[]> = ref(
    JSON.parse(localStorage.getItem("users")!) || []
);

const editing: Ref<User | null> = ref(
    JSON.parse(localStorage.getItem("editing")!) || null
);
const nameUser = ref(JSON.parse(localStorage.getItem("editing")!)?.name || "");

function changeState(id: string) {
    users.value = users.value.map((user) =>
        user.id === id ? { ...user, state: !user.state } : user
    );

    localStorage.setItem("users", JSON.stringify(users.value));
}

function delUser(id: string) {
    const res = confirm("Are you sure to delete this user?");
    if (!res) return alert("Cancel action");
    users.value = users.value.filter((user) => user.id !== id);
    localStorage.setItem("users", JSON.stringify(users.value));
}

function onSubmit() {
    if (!nameUser) return alert("The name is required");

    if (editing.value) {
        alert("User edit");

        users.value = users.value.map((user) =>
            user.id === editing.value?.id
                ? { ...user, name: nameUser.value }
                : user
        );

        nameUser.value = "";
        editing.value = null;
        localStorage.setItem("users", JSON.stringify(users.value));
        localStorage.setItem("editing", JSON.stringify(null));
        return;
    }

    users.value.push({
        id: crypto.randomUUID(),
        name: nameUser.value,
        state: false,
    });

    alert("User Create");

    nameUser.value = "";
    localStorage.setItem("users", JSON.stringify(users.value));
}

function fnEditing(id: string) {
    const userfind = users.value.find((user) => user.id === id);

    if (!userfind) return;

    editing.value = userfind;
    nameUser.value = userfind.name;

    localStorage.setItem("editing", JSON.stringify(userfind));
}
</script>

<template>
    <Layout>
        <h1 className="text-3xl font-bold">User List</h1>

        <form
            @submit.prevent="onSubmit"
            class="max-w-80 flex flex-col gap-2 my-5"
        >
            <h2>{{ editing ? "Update user" : "Create user" }}</h2>
            <input
                class="px-2 py-1 rounded-full outline-none text-black"
                type="text"
                v-model="nameUser"
                :placeholder="'ej: John doe'"
            />
            <button
                class="btn w-1/2 m-auto bg-green-500"
                :class="{ 'bg-yellow-500': editing }"
            >
                {{ editing ? "Edit" : "Create" }}
            </button>
        </form>

        <section class="flex flex-wrap gap-2">
            <article
                v-for="user in users"
                class="border-2 border-gray-500 p-2 rounded-md grid gap-1 flex-1"
            >
                <p>
                    {{ user.name }} -
                    <span v-if="user.state" class="label bg-green-700"
                        >active</span
                    >
                    <span v-else class="label bg-red-700">inactive</span>
                </p>
                <p class="text-xs font-bold font-mono">
                    {{ user.id.split("-").join("").slice(0, 10) }}...
                </p>
                <section class="flex gap-1">
                    <button
                        class="btn bg-red-500"
                        @click="() => delUser(user.id)"
                    >
                        del
                    </button>
                    <button
                        class="btn bg-yellow-500"
                        @click="() => fnEditing(user.id)"
                    >
                        edit
                    </button>
                    <button
                        class="btn bg-blue-500"
                        @click="() => changeState(user.id)"
                    >
                        change state
                    </button>
                </section>
            </article>
        </section>
    </Layout>
</template>

<style scoped>
.label {
    @apply px-2 rounded-md text-xs uppercase font-bold;
}
.btn {
    @apply px-1 rounded-sm font-bold text-sm cursor-pointer text-black hover:opacity-90;
}
</style>
