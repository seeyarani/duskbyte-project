<template>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 mt-10">
        <p v-if="error" class="error">{{ error }}</p>
        <div
            class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Verification
                </h1>

                <form class="space-y-6" @submit.prevent="submit">
                    <div>
                        <label for="email_verification_code"
                            class="block text-sm font-medium leading-6 text-gray-900">Email Verification
                            Code</label>
                        <div class="mt-2">
                            <input id="email_verification_code" type="text" v-model="email_verification_code"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>


                    <div>
                        <button type="submit"
                            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Verify
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
import { useRouter } from 'vue-router';
import apiClient from '../services/api';

export default {
    data() {
        return {
            email_verification_code: '',
            email: this.$route.params.email || '',
            error: ''
        };
    },
    setup() {
        const router = useRouter();
        return { router };
    },
    methods: {
        async submit() {
            if (!this.email_verification_code) {
                this.error = 'Please fill the values.';
                return;
            }

            if (this.email_verification_code.length !== 6) {
                this.error = 'Please enter six digit number.';
                return;
            }

            try {
                const response = await apiClient.post('/verification', {
                    email_verification_code: this.email_verification_code,
                });

                // await this.$router.push('/reset-password');
                await this.$router.push({
                    name: 'ResetPassword',
                });
            } catch (error) {
                console.error('Login error:', error);
                this.error = 'Verification failed.Please enter correct code.';
            }
        }
    }
};

</script>

<style>
.error {
    color: red;
}
</style>