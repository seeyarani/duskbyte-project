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
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <div
                        class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">

                    </div>

                    <div>
                        <router-link to="projects/create"
                            class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Add
                            Project</router-link>
                    </div>
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-10">
                        <thead class="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr class="bg-gray-800 text-base text-gray-300">
                                <th scope="col" class="px-6 py-3">
                                    Sr.No.
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Project Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Client Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(project, index) in projects" :key="project.id"
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row"
                                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {{ index + 1 }}
                                </th>
                                <th scope="row">
                                    {{ project.name }}
                                </th>
                                <td class="px-6 py-4">
                                    {{ project.client_name }}
                                </td>
                                <td class="px-6 py-4 flex gap-x-3">
                                    <router-link :to="{ name: 'EditProject', query: { projectId: project.id } }"
                                        class="text-blue-600"><svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg></router-link>

                                    <button type="button" @click="deleteProject(project.id)" class="text-red-600"><svg
                                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

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
    data() {
        return {
            projects: {},
        };
    },
    created() {
        this.loadData();
    },
    methods: {
        async loadData() {
            try {
                const response = await apiClient.get('admin/projects');

                this.projects = response.data;
            } catch (error) {
                console.error(error);
            }

        },
        async deleteProject(projectId) {
            if (confirm('Are you sure you want to delete?')) {
                try {
                    const response = await apiClient.post('admin/projects/delete', {
                        projectId: projectId
                    });

                    this.loadData();
                } catch (error) {
                    console.error(error);
                }

            }
        }
    }
};
</script>
