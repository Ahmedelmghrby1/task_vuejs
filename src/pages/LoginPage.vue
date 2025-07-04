<template>
  <q-page class="q-pa-md flex flex-center column">
    <q-card style="min-width: 300px">
      <q-card-section>
        <div class="text-h6">Login</div>
        <q-input v-model="username" label="Username" class="q-mt-md" />
        <q-input v-model="password" label="Password" type="password" class="q-mt-sm" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Login" color="primary" @click="login" />
      </q-card-actions>
      <q-card-section>
        <q-btn flat label="Register instead" to="/register" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useQuasar } from 'quasar'  // ✅ this import is required

const $q = useQuasar()              // ✅ this must be inside <script setup>
const router = useRouter()

const username = ref('')
const password = ref('')

const login = async () => {
  try {
    const res = await axios.post('http://localhost:3000/api/auth/login', {
      username: username.value,
      password: password.value
    })
    localStorage.setItem('token', res.data.token)
    router.push('/')
  } catch (err) {
    console.error(err)
    $q.notify({ type: 'negative', message: 'Login failed' }) // ✅ this works only if useQuasar() is used
  }
}
</script>


