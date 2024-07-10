<template>
    <div class="min-h-full">
        <NavBar />
        <header class="bg-white shadow">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
            </div>
        </header>
        <main>
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h3>User Details:</h3>
                <p>Name: {{ this.user.name }}</p>
                <p>Email: {{ this.user.email }}</p>
            </div>
        </main>
    </div>
</template>

<script>

import apiClient from '../../services/api';
import { ref } from 'vue';
import NavBar from '@/components/NavBar.vue';


export default {
    components: {
        NavBar,
    },
    data() {
        return {
            user: '',
        };
    },
    created() {
        this.loadUserDetails();
    },
    methods: {
        async loadUserDetails() {
            try {
                const response = await apiClient.get('/user');
                this.user = response.data;
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        },
        async logout() {
            try {
                await apiClient.post('/logout');

                localStorage.removeItem('accessToken');

                this.$router.push('/');
            } catch (error) {
                console.error('Logout error:', error);
            }
        }
    }
};
</script>
