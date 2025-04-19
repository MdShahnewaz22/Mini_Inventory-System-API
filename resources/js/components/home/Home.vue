<script setup>
import { ref, watch, onMounted } from "vue";
import api from "../../api/axios";

const showCategoryForm = ref(false);
const showProductForm = ref(false);

const newCategory = ref({ name: "" });
const newProduct = ref({ name: "", price: "", quantity: "", category_id: "" });

const categories = ref([]);
const products = ref([]);

// Fetch all categories
const fetchCategories = async () => {
  try {
    const response = await api.get("/categories");
    categories.value = response.data.data;
  } catch (error) {
    console.error("Error fetching categories:", error.response?.data || error.message);
  }
};

// Fetch all products
const fetchProducts = async () => {
  try {
    const response = await api.get("/products");
    products.value = response.data.data;
  } catch (error) {
    console.error("Error fetching products:", error.response?.data || error.message);
  }
};

// Submit new category
const submitCategory = async () => {
  try {
    await api.post("/categories", newCategory.value);
    alert("Category created successfully!");
    newCategory.value.name = "";
    await fetchCategories();
  } catch (error) {
    alert("Error creating category");
  }
};

// Submit new product
const submitProduct = async () => {
  try {
    if (newProduct.value.id) {
      // Update product
      await api.put(`/products/${newProduct.value.id}`, newProduct.value);
      alert("Product updated successfully!");
    } else {
      // Create new product
      await api.post("/products", newProduct.value);
      alert("Product created successfully!");
    }

    // Reset form and refresh product list
    newProduct.value = { id: null, name: "", price: "", quantity: "", category_id: "" };
    fetchProducts();
  } catch (error) {
    alert("Error submitting product");
    console.error(error);
  }
};


const editProduct = (product) => {
  showProductForm.value = true;
  newProduct.value = { ...product };
};

const deleteProduct = async (id) => {
  if (!confirm("Are you sure you want to delete this product?")) return;
  try {
    await api.delete(`/products/${id}`);
    alert("Product deleted!");
    fetchProducts();
  } catch (error) {
    alert("Error deleting product");
  }
};

// Initial fetch
onMounted(() => {
  fetchCategories();
  fetchProducts();
});

const logout = async () => {
  try {
    await api.post("/logout");
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    window.location.href = "/login";
  } catch (error) {
    console.log(error);
    alert("Failed to logout");
  }
};
</script>

<template>
 <div class="d-flex justify-content-end p-3">
  <button @click="logout" class="btn btn-danger">Logout</button>
</div>

  <div style="display: flex; gap: 10px; align-items: flex-start">
    <!-- Left: Category Section (Always Visible) -->
    <div style="flex: 1; margin-left: 40px">
      <button
        @click="showCategoryForm = !showCategoryForm"
        style="background-color: #3358ff; color: white; font-weight: bold; padding: 8px 16px; border: none; border-radius: 4px;"
      >
        {{ showCategoryForm ? "Close" : "Add Category" }}
      </button>

      <div v-if="showCategoryForm">
        <h3>New Category</h3>
        <input v-model="newCategory.name" placeholder="Category Name" />
        <button
          @click="submitCategory"
          style="background-color: #28a745; color: white; font-weight: bold; padding: 8px 16px; border: none; border-radius: 4px;"
        >
          Submit
        </button>
      </div>

      <h4>Categories List:</h4>
      <table cellpadding="5">
        <thead style="background-color: #33ff64; color: white;">
          <tr>
            <th style="padding: 0 20px;">SL</th>
            <th style="padding: 0 20px;">Category Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <td>{{ category.id }}</td>
            <td>{{ category.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Right: Product Section (Only if categories exist) -->
    <div v-if="categories.length" style="flex: 3">
      <button
        @click="showProductForm = !showProductForm"
        style="background-color: #3358ff; color: white; font-weight: bold; padding: 8px 16px; border: none; border-radius: 4px;"
      >
        {{ showProductForm ? "Close" : "Add Product" }}
      </button>

      <div v-if="showProductForm">
        <h3>New Product</h3>
        <input v-model="newProduct.name" placeholder="Product Name" />
        <input v-model.number="newProduct.price" placeholder="Price" type="number" />
        <input v-model.number="newProduct.quantity" placeholder="Quantity" type="number" />
        <select v-model.number="newProduct.category_id">
          <option disabled value="">Select Category</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
        <button
          @click="submitProduct"
          style="background-color: #28a745; color: white; font-weight: bold; padding: 8px 16px; border: none; border-radius: 4px;"
        >
          Submit
        </button>
      </div>

      <h4>Product List:</h4>
      <table cellpadding="5">
        <thead style="background-color: #33ff64; color: white;">
          <tr>
            <th style="padding: 0 20px;">SL</th>
            <th style="padding: 0 20px;">Name</th>
            <th style="padding: 0 20px;">Price</th>
            <th style="padding: 0 20px;">Quantity</th>
            <th style="padding: 0 20px;">Category Name</th>
            <th style="padding: 0 20px;">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(product, index) in products" :key="product.id">
            <td>{{ index + 1 }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.quantity }}</td>
            <td>{{ product.category.name }}</td>
            <td>
              <button class="btn btn-success" @click="editProduct(product)">Edit</button>
              <!-- <button @click="deleteProduct(product.id)">Delete</button> -->
              <button class="btn btn-danger" @click="deleteProduct(product.id)">Delete</button>

            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
table {
  border-collapse: collapse;
}
th,
td {
  border: 2px solid black;
  text-align: center;
}
button {
  margin: 10px;
}
input {
  display: block;
  margin: 5px 0;
  padding: 6px;
}
</style>
