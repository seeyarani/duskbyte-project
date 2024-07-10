<template>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 mt-10">
        <div v-if="error"
            class="error p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 w-full mt-2"
            role="alert">
            <span class="font-medium">{{ error }}</span>
        </div>
        <div
            class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create an account
                </h1>
                <form class="space-y-4 md:space-y-6" @submit.prevent="register">
                    <div>
                        <label for="name"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" name="name" id="name" v-model="name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                    <div>
                        <label for="email"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" name="email" id="email" v-model="email"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                    <div>
                        <label for="password"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password" v-model="password"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                    <div>
                        <label for="confirm-password"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                            password</label>
                        <input type="password" name="confirm-password" id="confirm-password" v-model="confirmPassword"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                    <button type="submit"
                        class="bg-indigo-600 bg-primary-600 dark:bg-primary-600 dark:focus:ring-primary-800 dark:hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 font-medium hover:bg-primary-700 px-5 py-2.5 rounded-lg text-center text-sm text-white w-full">Create
                        an account</button>
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account?
                        <router-link to="/login"
                            class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login
                            here</router-link>
                    </p>
                </form>
            </div>
        </div>
    </div>

</template>

<script>
import apiClient from '../services/api';

export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            error: ''
        };
    },
    methods: {
        async register() {
            if (!this.name || !this.email || !this.password || !this.confirmPassword) {
                this.error = 'Please fill all the values.';
                return;
            }
            if (this.password.length < 8 || this.confirmPassword.length < 8) {
                this.error = 'Password length should be greater than 8 characters.';
                return;
            }

            if (this.password !== this.confirmPassword) {
                this.error = 'Passwords do not match.';
                return;
            }

            try {
                const response = await apiClient.post('/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password
                });

                localStorage.setItem('accessToken', response.data.token);

                // Redirect to dashboard
                await this.$router.push('/dashboard');
            } catch (error) {
                this.error = error.response.data.error;
            }
        }
    }
};
</script>