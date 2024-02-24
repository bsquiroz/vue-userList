<script setup lang="ts">
import { User } from "../interfaces";

interface Props {
    usersFiltered: User[];
    delUser: (id: string) => void;
    fnEditing: (id: string) => void;
    changeState: (id: string) => void;
}

const { changeState, delUser, fnEditing, usersFiltered } = defineProps<Props>();
</script>

<template>
    <section class="flex flex-wrap gap-2">
        <article
            v-for="user in usersFiltered"
            class="border-2 border-gray-500 p-2 rounded-md grid gap-1 flex-1"
        >
            <p>
                {{ user.name }} -
                <span v-if="user.state" class="label bg-green-700">active</span>
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
                <button class="btn bg-red-500" @click="() => delUser(user.id)">
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
</template>
