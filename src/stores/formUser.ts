import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { Filters, User } from "../interfaces";

export const useformUserStore = defineStore("formUser", () => {
    const users = ref<User[]>(JSON.parse(localStorage.getItem("users")!) || []);

    const editing = ref<User | null>(
        JSON.parse(localStorage.getItem("editing")!) || null
    );

    const nameUser = ref(
        JSON.parse(localStorage.getItem("editing")!)?.name || ""
    );
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

    return {
        users,
        editing,
        nameUser,
        ocupationUser,
        filters,
        changeState,
        delUser,
        onSubmit,
        fnEditing,
        usersFiltered,
    };
});
