
<script setup>
import { ref } from "vue";
import api from "../../api/axios";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    const response = await api.post("/login", {
      email: email.value,
      password: password.value,
    });

    // Store token or user info if needed
    // console.log("Login success:", response.data);

    // Redirect to home or dashboard
     localStorage.setItem('token', response.data.token);
    //  console.log(response.data.token);
    router.push("/home");
  } catch (error) {
    // console.error("Login error:", error.response?.data || error.message);
    alert("Login failed. Please check your credentials.");
  }
};
</script>

<template>
  <div class="container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="input-group">
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" required />
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <div class="input-group">
        <button type="submit">Login</button>
      </div>
      <a href="#" class="forgot-password">Forgot Password?</a>
    </form>
  </div>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 10;
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
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
}
.input-group button:hover {
  background-color: #45a049;
}
.input-group .forgot-password {
  text-align: center;
  display: block;
  margin-top: 10px;
  font-size: 14px;
}
</style>
