<template>
    <div class="min-h-full">
        <NavBar />
        <header class="bg-white shadow">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold tracking-tight text-gray-900">Projects</h1>
            </div>
        </header>

        <main>
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div v-if="error"
                    class="error p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert">
                    <span class="font-medium">{{ error }}</span>
                </div>

                <form @submit.prevent="SubmitHandler">
                    <div class="space-y-12">
                        <div class="border-b border-gray-900/10 pb-12">
                            <h2 class="text-base font-semibold leading-7 text-gray-900">Edit Project</h2>
                            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div class="sm:col-span-3">
                                    <label for="project-name"
                                        class="block text-sm font-medium leading-6 text-gray-900">Project name</label>
                                    <div class="mt-2">
                                        <input type="text" name="project-name" v-model="project_name" id="project-name"
                                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>

                                <div class="sm:col-span-3">
                                    <label for="client_name"
                                        class="block text-sm font-medium leading-6 text-gray-900">Client
                                        Name</label>
                                    <div class="mt-2">
                                        <input id="client_name" name="client_name" type="text" autocomplete="email"
                                            v-model="client_name"
                                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                    <div class="mt-6 flex items-center justify-end gap-x-6">
                        <router-link to="/admin/projects"
                            class="text-sm font-semibold leading-6 text-gray-900">Cancel</router-link>
                        <button type="submit"
                            class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                    </div>
                </form>

            </div>
        </main>
    </div>
</template>

<script>

import apiClient from '../../../services/api';
import { ref } from 'vue';
import NavBar from '@/components/NavBar.vue';


export default {
    components: {
        NavBar,
    },
    props: ['projectId'],
    data() {
        return {
            projects: {},
            project_name: '',
            client_name: '',
            error: '',
        };
    },
    created() {
        this.loadData();
    },
    methods: {
        async loadData() {
            const response = await apiClient.post('admin/projects/edit', {
                projectId: this.projectId
            })

            this.project_name = response.data.name;
            this.client_name = response.data.client_name;
        },
        async SubmitHandler() {
            if (!this.project_name || !this.client_name) {
                this.error = 'Please fill all values';
                return;
            }

            try {
                const response = await apiClient.post('admin/projects/update', {
                    project_name: this.project_name,
                    client_name: this.client_name,
                    projectId: this.projectId,
                });

                await this.$router.push('/admin/projects');

            } catch (error) {
                console.log(error);
            }

        },
    }
};
</script>