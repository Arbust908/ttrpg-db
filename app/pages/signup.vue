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
            Create your account
          </h2>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Join TTRPG DB to manage your collection
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
            placeholder="Create a password"
            icon="i-lucide-lock"
            size="lg"
            :disabled="isLoading"
          />
        </UFormGroup>

        <UFormGroup
          label="Confirm Password"
          name="confirmPassword"
          required
        >
          <UInput
            v-model="formState.confirmPassword"
            type="password"
            placeholder="Confirm your password"
            icon="i-lucide-lock-keyhole"
            size="lg"
            :disabled="isLoading"
          />
        </UFormGroup>

        <div>
          <UCheckbox
            v-model="formState.agreeToTerms"
            :disabled="isLoading"
          >
            <template #label>
              <span class="text-sm">
                I agree to the
                <UButton
                  variant="link"
                  size="xs"
                  class="p-0 h-auto"
                  @click.prevent="showTerms = true"
                >
                  Terms and Conditions
                </UButton>
              </span>
            </template>
          </UCheckbox>
        </div>

        <UButton
          type="submit"
          block
          size="lg"
          :loading="isLoading"
          :disabled="isLoading || !formState.agreeToTerms"
        >
          Create Account
        </UButton>
      </UForm>

      <UDivider
        label="OR"
        class="my-6"
      />

      <div class="text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?
          <UButton
            variant="link"
            size="sm"
            to="/login"
            :disabled="isLoading"
          >
            Sign in
          </UButton>
        </p>
      </div>
    </UCard>

    <!-- Terms Modal -->
    <UModal v-model="showTerms">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">
            Terms and Conditions
          </h3>
        </template>

        <div class="prose prose-sm dark:prose-invert max-h-96 overflow-y-auto">
          <h4>1. Acceptance of Terms</h4>
          <p>
            By creating an account and using TTRPG DB, you agree to these terms and conditions.
          </p>

          <h4>2. User Account</h4>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials
            and for all activities that occur under your account.
          </p>

          <h4>3. Content</h4>
          <p>
            You retain ownership of any content you add to your TTRPG collection. We do not claim
            ownership of your data.
          </p>

          <h4>4. Privacy</h4>
          <p>
            We respect your privacy and will not share your personal information with third parties
            without your consent.
          </p>

          <h4>5. Service Availability</h4>
          <p>
            While we strive to maintain service availability, we cannot guarantee uninterrupted access
            to TTRPG DB.
          </p>

          <h4>6. Modifications</h4>
          <p>
            We reserve the right to modify these terms at any time. Continued use of the service
            constitutes acceptance of modified terms.
          </p>
        </div>

        <template #footer>
          <div class="flex justify-end">
            <UButton
              @click="showTerms = false"
            >
              Close
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>

    <!-- Success Modal -->
    <UModal v-model="showSuccess">
      <UCard>
        <template #header>
          <div class="flex items-center gap-3">
            <UIcon
              name="i-lucide-check-circle"
              class="w-6 h-6 text-success"
            />
            <h3 class="text-lg font-semibold">
              Account Created Successfully!
            </h3>
          </div>
        </template>

        <div class="space-y-4">
          <p class="text-gray-600 dark:text-gray-400">
            Your account has been created. Please check your email to verify your account before signing in.
          </p>
          <p class="text-sm text-gray-500">
            We've sent a verification link to <strong>{{ formState.email }}</strong>
          </p>
        </div>

        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton
              variant="ghost"
              @click="showSuccess = false"
            >
              Close
            </UButton>
            <UButton
              to="/login"
            >
              Go to Login
            </UButton>
          </div>
        </template>
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
const { signUp } = useAuth()
const router = useRouter()

// State
const isLoading = ref(false)
const showTerms = ref(false)
const showSuccess = ref(false)

const formState = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false
})

// Validation
const validate = (state: typeof formState) => {
  const errors = []

  // Email validation
  if (!state.email) {
    errors.push({ path: 'email', message: 'Email is required' })
  } else if (!isValidEmail(state.email)) {
    errors.push({ path: 'email', message: 'Invalid email address' })
  }

  // Password validation
  if (!state.password) {
    errors.push({ path: 'password', message: 'Password is required' })
  } else if (state.password.length < 6) {
    errors.push({ path: 'password', message: 'Password must be at least 6 characters' })
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(state.password)) {
    errors.push({ path: 'password', message: 'Password must contain uppercase, lowercase, and number' })
  }

  // Confirm password validation
  if (!state.confirmPassword) {
    errors.push({ path: 'confirmPassword', message: 'Please confirm your password' })
  } else if (state.password !== state.confirmPassword) {
    errors.push({ path: 'confirmPassword', message: 'Passwords do not match' })
  }

  return errors
}

// Helper function
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Handlers
const handleSubmit = async () => {
  if (!formState.agreeToTerms) {
    return
  }

  isLoading.value = true

  try {
    const { data, error } = await signUp(formState.email, formState.password)

    if (!error && data) {
      // Show success modal
      showSuccess.value = true
    }
  } finally {
    isLoading.value = false
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
