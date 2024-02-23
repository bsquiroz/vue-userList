<script setup lang="ts">
import { Ref, computed, ref } from "vue";
import Layout from "./components/Layout.vue";

type Ocupation = "frontend" | "backend" | "Q&A" | "DevOps";

type Filters =
    | "frontend"
    | "backend"
    | "Q&A"
    | "DevOps"
    | "active"
    | "inactive"
    | null;

interface User {
    id: string;
    name: string;
    state: boolean;
    ocupation: Ocupation;
}

const users: Ref<User[]> = ref(
    JSON.parse(localStorage.getItem("users")!) || []
);

const editing: Ref<User | null> = ref(
    JSON.parse(localStorage.getItem("editing")!) || null
);

const nameUser = ref(JSON.parse(localStorage.getItem("editing")!)?.name || "");
const ocupationUser = ref(
    JSON.parse(localStorage.getItem("editing")!)?.ocupation || ""
);
const filters: Ref<Filters> = ref(null);

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
    if (!nameUser.value) return alert("The name is required");
    if (!ocupationUser.value) return alert("The ocupation is required");

    if (editing.value) {
        alert("User edit");

        users.value = users.value.map((user) =>
            user.id === editing.value?.id
                ? {
                      ...user,
                      name: nameUser.value,
                      ocupation: ocupationUser.value,
                  }
                : user
        );

        nameUser.value = "";
        ocupationUser.value = "";
        filters.value = null;
        editing.value = null;
        localStorage.setItem("users", JSON.stringify(users.value));
        localStorage.setItem("editing", JSON.stringify(null));

        return;
    }

    users.value.unshift({
        id: crypto.randomUUID(),
        name: nameUser.value,
        state: false,
        ocupation: ocupationUser.value,
    });

    alert("User Create");

    nameUser.value = "";
    ocupationUser.value = "";
    filters.value = null;
    localStorage.setItem("users", JSON.stringify(users.value));
}

function fnEditing(id: string) {
    const userfind = users.value.find((user) => user.id === id);

    if (!userfind) return;

    editing.value = userfind;

    nameUser.value = userfind.name;
    ocupationUser.value = userfind.ocupation;

    localStorage.setItem("editing", JSON.stringify(userfind));
}

const usersFiltered = computed(() =>
    filters.value
        ? ["active", "inactive"].includes(filters.value)
            ? users.value.filter((user) =>
                  filters.value === "active" ? user.state : !user.state
              )
            : users.value.filter((user) => user.ocupation === filters.value)
        : users.value
);
</script>

<template>
    <Layout>
        <section class="flex flex-col gap-2">
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

            <section class="flex flex-wrap gap-2">
                <article
                    v-for="user in usersFiltered"
                    class="border-2 border-gray-500 p-2 rounded-md grid gap-1 flex-1"
                >
                    <p>
                        {{ user.name }} -
                        <span v-if="user.state" class="label bg-green-700"
                            >active</span
                        >
                        <span v-else class="label bg-red-700">inactive</span>
                    </p>
                    <p>
                        Rol:
                        <b class="bg-black px-2 rounded-sm text-xs">{{
                            user.ocupation
                        }}</b>
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

.input {
    @apply px-2 py-1 rounded-full outline-none text-black;
}
</style>
