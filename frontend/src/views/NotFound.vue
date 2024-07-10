<template>
    <div class="not-found-container">
        <h1 class="not-found-title">404 - Page Not Found</h1>
        <p class="not-found-message">The page you are looking for does not exist.</p>
        <router-link to="/login" class="not-found-link">Go to Home</router-link>
    </div>
</template>

<script>
export default {
    name: 'NotFound'
}
</script>

<style scoped>
.not-found-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    background-color: #f8f9fa;
}

.not-found-title {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #343a40;
}

.not-found-message {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: #6c757d;
}

.not-found-link {
    font-size: 1.25rem;
    color: #007bff;
    text-decoration: none;
    border: 1px solid #007bff;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    transition: background-color 0.3s, color 0.3s;
}

.not-found-link:hover {
    background-color: #007bff;
    color: #fff;
}
</style>