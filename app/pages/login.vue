<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <UCard class="w-full max-w-md">
      <template #header>
        <div class="text-center">
          <div class="flex justify-center mb-4">
            <UIcon
              name="i-lucide-dice-6"
              class="w-12 h-12 text-primary"
            />
          </div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            Sign in to TTRPG DB
          </h2>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Access your tabletop RPG database
          </p>
        </div>
      </template>

      <UForm
        :state="formState"
        :validate="validate"
        @submit="handleSubmit"
        class="space-y-4"
      >
        <UFormGroup
          label="Email"
          name="email"
          required
        >
          <UInput
            v-model="formState.email"
            type="email"
            placeholder="you@example.com"
            icon="i-lucide-mail"
            size="lg"
            :disabled="isLoading"
          />
        </UFormGroup>

        <UFormGroup
          label="Password"
          name="password"
          required
        >
          <UInput
            v-model="formState.password"
            type="password"
            placeholder="Enter your password"
            icon="i-lucide-lock"
            size="lg"
            :disabled="isLoading"
          />
        </UFormGroup>

        <div class="flex items-center justify-between">
          <UCheckbox
            v-model="formState.rememberMe"
            label="Remember me"
            :disabled="isLoading"
          />
          <UButton
            variant="link"
            size="sm"
            @click="showForgotPassword = true"
            :disabled="isLoading"
          >
            Forgot password?
          </UButton>
        </div>

        <UButton
          type="submit"
          block
          size="lg"
          :loading="isLoading"
          :disabled="isLoading"
        >
          Sign in
        </UButton>
      </UForm>

      <UDivider
        label="OR"
        class="my-6"
      />

      <div class="text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?
          <UButton
            variant="link"
            size="sm"
            to="/signup"
            :disabled="isLoading"
          >
            Sign up
          </UButton>
        </p>
      </div>
    </UCard>

    <!-- Forgot Password Modal -->
    <UModal v-model="showForgotPassword">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">
            Reset Password
          </h3>
        </template>

        <UForm
          :state="resetFormState"
          :validate="validateReset"
          @submit="handlePasswordReset"
          class="space-y-4"
        >
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <UFormGroup
            label="Email"
            name="email"
            required
          >
            <UInput
              v-model="resetFormState.email"
              type="email"
              placeholder="you@example.com"
              icon="i-lucide-mail"
              :disabled="isResetting"
            />
          </UFormGroup>

          <div class="flex gap-3 justify-end">
            <UButton
              variant="ghost"
              @click="showForgotPassword = false"
              :disabled="isResetting"
            >
              Cancel
            </UButton>
            <UButton
              type="submit"
              :loading="isResetting"
              :disabled="isResetting"
            >
              Send Reset Link
            </UButton>
          </div>
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
// Disable auth middleware for this page
definePageMeta({
  layout: false,
  middleware: []
})

// Composables
const { signIn, resetPassword } = useAuth()
const router = useRouter()
const route = useRoute()

// State
const isLoading = ref(false)
const isResetting = ref(false)
const showForgotPassword = ref(false)

const formState = reactive({
  email: '',
  password: '',
  rememberMe: false
})

const resetFormState = reactive({
  email: ''
})

// Validation
const validate = (state: typeof formState) => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Email is required' })
  else if (!isValidEmail(state.email)) errors.push({ path: 'email', message: 'Invalid email address' })
  if (!state.password) errors.push({ path: 'password', message: 'Password is required' })
  else if (state.password.length < 6) errors.push({ path: 'password', message: 'Password must be at least 6 characters' })
  return errors
}

const validateReset = (state: typeof resetFormState) => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Email is required' })
  else if (!isValidEmail(state.email)) errors.push({ path: 'email', message: 'Invalid email address' })
  return errors
}

// Helper function
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Handlers
const handleSubmit = async () => {
  isLoading.value = true

  try {
    const { data, error } = await signIn(formState.email, formState.password)

    if (!error && data) {
      // Get redirect URL from query params or default to dashboard
      const redirectTo = route.query.redirect as string || '/dashboard'
      await router.push(redirectTo)
    }
  } finally {
    isLoading.value = false
  }
}

const handlePasswordReset = async () => {
  isResetting.value = true

  try {
    const { error } = await resetPassword(resetFormState.email)

    if (!error) {
      showForgotPassword.value = false
      resetFormState.email = ''
    }
  } finally {
    isResetting.value = false
  }
}

// Check if already logged in
onMounted(() => {
  const user = useSupabaseUser()
  if (user.value) {
    // If already logged in, redirect to dashboard
    router.push('/dashboard')
  }
})
</script>
