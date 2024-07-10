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

                <form class="space-y-6" @submit.prevent="login">
                    <div>
                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email
                            address</label>
                        <div class="mt-2">
                            <input id="email" type="email" autocomplete="email" v-model="email"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password"
                                class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div class="text-sm">
                                <router-link to="/forgot-password"
                                    class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot
                                    password?</router-link>

                            </div>
                        </div>
                        <div class="mt-2">
                            <input id="password" type="password" autocomplete="current-password" v-model="password"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                            in</button>
                    </div>
                </form>

                <p class="mt-10 text-center text-sm text-gray-500">
                    Not Registered?
                    <router-link to="/register">Sign Up here</router-link>

                </p>
            </div>
        </div>
    </div>
</template>

<script>
import apiClient from '../services/api';

export default {
    data() {
        return {
            email: '',
            password: '',
            error: ''
        };
    },
    methods: {
        async login() {
            if (!this.email || !this.password) {
                this.error = 'Please fill the values.';
                return;
            }
            if (this.password.length < 8) {
                this.error = 'Password length should be greater than 8 characters.';
                return;
            }

            try {
                const response = await apiClient.post('/login', {
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
