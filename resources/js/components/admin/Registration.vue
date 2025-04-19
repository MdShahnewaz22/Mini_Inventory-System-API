<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from "../../api/axios";

const router = useRouter();
const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match!');
    return;
  }

  try {
    const response = await api.post('/register', {
      name: username.value,
      email: email.value,
      password: password.value,
      password_confirmation: confirmPassword.value
    });

    alert('Registration successful!');
    router.push('/login'); // Redirect to login route
  } catch (error) {
    alert('Registration failed. Check console for details.');
    console.error('Registration failed:', error.response?.data || error.message);
  }
};
</script>

<template>
  <div class="container">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <div class="input-group">
        <label for="username">Username</label>
        <input v-model="username" type="text" id="username" required />
      </div>
      <div class="input-group">
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" required />
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <div class="input-group">
        <label for="confirmPassword">Confirm Password</label>
        <input v-model="confirmPassword" type="password" id="confirmPassword" required />
      </div>
      <div class="input-group">
        <button type="submit">Register</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 20px;
}
.container {
  max-width: 400px;
  margin-top: 100px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
h2 {
  text-align: center;
  margin-bottom: 20px;
}
.input-group {
  margin-bottom: 15px;
}
.input-group label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
}
.input-group input {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.input-group button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
}
.input-group button:hover {
  background-color: #45a049;
}
</style>
