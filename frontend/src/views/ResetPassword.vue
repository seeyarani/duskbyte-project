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
                    Reset Password
                </h1>

                <form class="space-y-6" @submit.prevent="submit">
                    <div>
                        <label for="password"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" v-model="password"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                    <div>
                        <label for="confirm-password"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                            password</label>
                        <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••"
                            v-model="confirmPassword"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>

                    <div>
                        <button type="submit"
                            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Reset
                        </button>
                    </div>
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
            password: '',
            confirmPassword: '',
            email: this.$route.params.email || '',
            error: ''
        };
    },
    methods: {
        async submit() {
            if (!this.password || !this.confirmPassword) {
                this.error = 'Please fill the values.';
                return;
            }

            if (this.password.length < 8 || this.confirmPassword.length < 8) {
                this.error = 'Password length should be greater than 8 characters';
                return;
            }

            if (this.password !== this.confirmPassword) {
                this.error = 'Passwords do not match';
                return;
            }

            const urlParams = new URLSearchParams(window.location.search);
            const email = urlParams.get('email');
            const token = urlParams.get('token');

            try {
                const response = await apiClient.post('/reset-password', {
                    password: this.password,
                    email: email,
                    token: token,
                });

                await this.$router.push('/login');
            } catch (error) {
                this.error = error.response.data.error;
            }
        }
    }
};

</script>