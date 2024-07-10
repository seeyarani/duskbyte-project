<template>
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
            <a href="https://flowbite.com" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Duskbyte</span>
            </a>
            <div class="flex items-center space-x-6 rtl:space-x-reverse">
                <button class="text-sm  text-blue-600 dark:text-blue-500 hover:underline" @click="logout">
                    Logout
                </button>
            </div>
        </div>
    </nav>
    <nav class="bg-gray-50 dark:bg-gray-700">
        <div class="max-w-screen-xl px-4 py-3 mx-auto">
            <div class="flex items-center">
                <ul class="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                    <li>
                        <router-link to="/dashboard"
                            class="text-gray-900 dark:text-white hover:underline">Dashboard</router-link>
                    </li>
                    <li v-if="is_admin">
                        <router-link to="/admin/users"
                            class="text-gray-900 dark:text-white hover:underline">Users</router-link>
                    </li>
                    <li v-if="is_admin">
                        <router-link to="/admin/projects"
                            class="text-gray-900 dark:text-white hover:underline">Projects</router-link>
                    </li>
                    <li v-if="is_admin">
                        <router-link to="/admin/tasks"
                            class="text-gray-900 dark:text-white hover:underline">Tasks</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import apiClient from '../services/api';

export default {
    name: 'NavBar',
    data() {
        return {
            is_admin: false,
        }
    },
    created() {
        this.getLoggedInUser();
    },
    methods: {
        async getLoggedInUser() {
            try {
                const response = await apiClient.get('/user');

                //Check if user is admin or not
                if (response.data.is_admin == 1) {
                    this.is_admin = true;
                }

            } catch (error) {
                console.error('Logout error:', error);
            }
        },
        async logout() {
            try {
                const response = await apiClient.post('/logout');

                localStorage.removeItem('accessToken');

                this.$router.push('/login');
            } catch (error) {
                this.error = error.response.data.error;
            }
        },
    }
}

</script>

<style scoped>
.navbar {
    background-color: #333;
    padding: 1rem;
}

.navbar-list {
    list-style: none;
    display: flex;
    gap: 1rem;
    margin: 0;
    padding: 0;
}

.navbar-item a {
    color: white;
    text-decoration: none;
}

.navbar-item a:hover {
    text-decoration: underline;
}
</style>