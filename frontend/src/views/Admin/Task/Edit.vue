<template>
    <div class="min-h-full">
        <NavBar />
        <header class="bg-white shadow">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold tracking-tight text-gray-900">Tasks</h1>
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
                            <h2 class="text-base font-semibold leading-7 text-gray-900">Edit Task</h2>
                            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div class="sm:col-span-3">
                                    <label for="title"
                                        class="block text-sm font-medium leading-6 text-gray-900">Title</label>
                                    <div class="mt-2">
                                        <input type="text" name="title" v-model="title" id="title"
                                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>

                                <div class="sm:col-span-3">
                                    <label for="description"
                                        class="block text-sm font-medium leading-6 text-gray-900">Description</label>
                                    <div class="mt-2">
                                        <input id="description" name="description" type="text" v-model="description"
                                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                            </div>
                            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div class="sm:col-span-3">
                                    <label for="assign_to"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Assign
                                        To</label>
                                    <select id="assign_to" v-model="assign_to"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected value="" disabled>Select User</option>
                                        <option v-for="user in users" :value="user.id" :key="user.id">{{
                                            user.name }}</option>
                                    </select>
                                </div>

                                <div class="sm:col-span-3">
                                    <label for="project"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an
                                        Project</label>
                                    <select id="project" v-model="project_id"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected value="" disabled>Select Project</option>
                                        <option v-for="project in projects" :value="project.id" :key="project.id">{{
                                            project.name }}</option>

                                    </select>
                                </div>
                            </div>

                            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div class="sm:col-span-3">
                                    <label for="priority"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select
                                        Priority</label>
                                    <select id="priority" v-model="priority"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected value="" disabled>Select Priority</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>

                                <div class="sm:col-span-3">
                                    <label for="due_date"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Due
                                        Date</label>

                                    <input type="date" v-model="due_date"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                </div>
                            </div>

                        </div>

                    </div>

                    <div class="mt-6 flex items-center justify-end gap-x-6">
                        <router-link to="/admin/tasks"
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
    props: ['taskId'],
    data() {
        return {
            tasks: {},
            users: {},
            projects: {},
            title: '',
            description: '',
            assign_to: '',
            project_id: '',
            priority: '',
            due_date: '',
            error: '',
        };
    },
    created() {
        this.loadData();
        this.loadUserData();
        this.loadProjectData();
    },
    methods: {
        async loadData() {
            const response = await apiClient.post('admin/tasks/edit', {
                taskId: this.taskId
            })

            this.title = response.data.title;
            this.description = response.data.description;
            this.assign_to = response.data.user_id;
            this.project_id = response.data.project_id;
            this.priority = response.data.deadline_priority;

            // Extract the date part only (YYYY-MM-DD)
            this.due_date = response.data.due_on.split(' ')[0];
        },
        async loadUserData() {
            try {
                const response = await apiClient.get('admin/users');

                this.users = response.data;
            } catch (error) {
                console.error(error);
            }

        },
        async loadProjectData() {
            try {
                const response = await apiClient.get('admin/projects');

                this.projects = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async SubmitHandler() {
            if (!this.title || !this.description || !this.assign_to || !this.project_id || !this.priority || !this.due_date) {
                this.error = 'Please fill all values';
                return;
            }

            try {
                const response = await apiClient.post('admin/tasks/update', {
                    title: this.title,
                    description: this.description,
                    user_id: this.assign_to,
                    project_id: this.project_id,
                    priority: this.priority,
                    due_date: this.due_date,
                    taskId: this.taskId,
                });

                await this.$router.push('/admin/tasks');

            } catch (error) {
                console.log(error);
            }

        },
    }
};
</script>