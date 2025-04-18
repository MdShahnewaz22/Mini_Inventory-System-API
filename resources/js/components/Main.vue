<script setup>

import { useRouter } from 'vue-router';
import { ref, watch, onMounted } from "vue";
import api from "../api/axios";

const router = useRouter();

// Example: navigate to login page on a button click
function goToLogin() {
  router.push('/login');
}


</script>

<template>
  <div>
    <h1 style="text-align: center">Mini Inventory System</h1>

    <div style="display: flex; justify-content: center; margin-top: 50px; gap: 10px">
   <router-link to="/login">
  <button
    style="
      background-color: #33ff7d;
      color: white;
      font-weight: bold;
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
    "
  >
    Login
  </button>
</router-link>
       <router-link to="/registration">
        <button
          style="
            background-color: #33fffc;
            color: white;
            font-weight: bold;
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
          "
        >
          Registration
        </button>
      </router-link>
    </div>
  </div>
</template>


