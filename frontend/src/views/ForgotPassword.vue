<template>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 mt-10">
        <div v-if="error"
            class="error p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 w-full mt-2"
            role="alert">
            <span class="font-medium">{{ error }}</span>
        </div>
        <div v-if="success"
            class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 w-full mt-2"
            role="alert">
            <span class="font-medium">{{ success }}</span>
        </div>
        <div
            class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Forgot Password
                </h1>

                <form class="space-y-6" @submit.prevent="submit">
                    <div>
                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email
                            address</label>
                        <div class="mt-2">
                            <input id="email" type="email" autocomplete="email" v-model="email"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>


                    <div>
                        <button type="submit"
                            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            id="send_button">Send
                        </button>
                    </div>
                </form>

                <p class="mt-10 text-center text-sm text-gray-500">
                    <router-link to="/" class="underline">Login here</router-link>
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
            error: '',
            success: '',
        };
    },
    methods: {
        async submit() {
            if (!this.email) {
                this.error = 'Please fill the value.';
                return;
            }

            document.getElementById("send_button").disabled = true;

            this.success = "We are currently sending an email. Please check your inbox."

            try {
                const response = await apiClient.post('/forgot-password', {
                    email: this.email
                });

                await this.$router.push('/login');
            } catch (error) {
                this.error = error.response.data.error;
            }
        }
    }
};

</script>