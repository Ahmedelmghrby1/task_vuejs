<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="q-pa-md">

      <!-- Top Row with Logout Button -->
      <div class="row items-center justify-between q-mb-md">
        <div class="text-h6">Task Manager</div>
        <q-btn
          label="Logout"
          icon="logout"
          color="negative"
          outline
          rounded
          @click="logout"
        />
      </div>

      <!-- Input for New Task -->
      <q-input
        v-model="newTask"
        label="New Task"
        @keyup.enter="addTask"
        class="q-mb-sm"
      />

      <!-- Add Task Button -->
      <q-btn
        label="Add Task"
        color="primary"
        @click="addTask"
        class="q-mb-md"
      />

      <!-- Task List -->
      <q-list bordered class="q-mt-md">
        <q-item v-for="task in tasks" :key="task.id">
          <q-item-section>
            <q-input
              v-model="task.title"
              dense
              @blur="updateTask(task)"
            />
          </q-item-section>
          <q-item-section side>
            <q-btn
              dense
              icon="delete"
              color="negative"
              @click="deleteTask(task.id)"
            />
          </q-item-section>
        </q-item>
      </q-list>

      <!-- Loading Spinner -->
      <q-inner-loading :showing="loading" />
    </q-card>
  </q-page>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const router = useRouter()

const tasks = ref([])
const newTask = ref('')
const loading = ref(false)

const API_URL = 'http://localhost:3000/api'

// ✅ Helper: Get auth headers with token
const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

// ✅ Fetch all tasks
const fetchTasks = async () => {
  loading.value = true
  try {
    const res = await axios.get(`${API_URL}/tasks`, getAuthHeaders())
    tasks.value = res.data
  } catch (err) {
    console.error('Error fetching tasks:', err)
    $q.notify({ type: 'negative', message: 'Failed to fetch tasks' })
  } finally {
    loading.value = false
  }
}

// ✅ Add new task
const addTask = async () => {
  if (!newTask.value) return
  try {
    await axios.post(`${API_URL}/tasks`, { title: newTask.value }, getAuthHeaders())
    newTask.value = ''
    fetchTasks()
  } catch {
    $q.notify({ type: 'negative', message: 'Failed to add task' })
  }
}

// ✅ Update a task
const updateTask = async (task) => {
  try {
    await axios.put(`${API_URL}/tasks/${task.id}`, { title: task.title }, getAuthHeaders())
  } catch {
    $q.notify({ type: 'negative', message: 'Failed to update task' })
  }
}

// ✅ Delete a task
const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/tasks/${id}`, getAuthHeaders())
    fetchTasks()
  } catch {
    $q.notify({ type: 'negative', message: 'Failed to delete task' })
  }
}

// ✅ Logout
const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

// ✅ Load tasks on mount
onMounted(fetchTasks)
</script>

