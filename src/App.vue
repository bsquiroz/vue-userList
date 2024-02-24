<script setup lang="ts">
import { computed, ref } from "vue";
import { Filters, User } from "./interfaces";

import Layout from "./components/Layout.vue";
import Users from "./components/Users.vue";
import FormUser from "./components/FormUser.vue";
import Filter from "./components/Filters.vue";

const users = ref<User[]>(JSON.parse(localStorage.getItem("users")!) || []);

const editing = ref<User | null>(
    JSON.parse(localStorage.getItem("editing")!) || null
);

const nameUser = ref(JSON.parse(localStorage.getItem("editing")!)?.name || "");
const ocupationUser = ref(
    JSON.parse(localStorage.getItem("editing")!)?.ocupation || ""
);
const filters = ref<Filters>(null);

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

    console.log(nameUser.value);
    console.log(ocupationUser.value);

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

    console.log(nameUser.value);
    console.log(ocupationUser.value);
}

function fnEditing(id: string) {
    const userfind = users.value.find((user) => user.id === id);

    if (!userfind) return;

    editing.value = userfind;

    nameUser.value = userfind.name;
    ocupationUser.value = userfind.ocupation;

    localStorage.setItem("editing", JSON.stringify(userfind));
}

const usersFiltered = computed<User[]>(() =>
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
            <FormUser
                :editing="editing"
                @onSubmit="onSubmit"
                v-model:nameUser="nameUser"
                v-model:ocupationUser="ocupationUser"
            />

            <Filter v-model="filters" />

            <Users
                :changeState="changeState"
                :delUser="delUser"
                :fnEditing="fnEditing"
                :usersFiltered="usersFiltered"
            />
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
