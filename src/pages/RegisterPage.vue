<template>
  <q-page class="q-pa-md flex flex-center column">
    <q-card style="min-width: 300px">
      <q-card-section>
        <div class="text-h6">Register</div>
        <q-input v-model="username" label="Username" class="q-mt-md" />
        <q-input v-model="password" label="Password" type="password" class="q-mt-sm" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Register" color="primary" @click="register" />
      </q-card-actions>
      <q-card-section>
        <q-btn flat label="Back to login" to="/login" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const router = useRouter()
const username = ref('')
const password = ref('')

const register = async () => {
  try {
    await api.post('/auth/register', { username: username.value, password: password.value })
    $q.notify({ type: 'positive', message: 'Registered! Now login.' })
    router.push('/login')
  } catch {
    $q.notify({ type: 'negative', message: 'Registration failed' })
  }
}
</script>
