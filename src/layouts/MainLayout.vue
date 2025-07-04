<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Task Manager</q-toolbar-title>
        <q-btn v-if="auth" label="Logout" flat @click="logout" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view /> <!-- <q-page> will render here -->
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const auth = !!localStorage.getItem('token')

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>
