<template>
  <div class="min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          How Can We Help?
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Have a question about the TTRPG Database? Found a bug? Want to suggest a feature?
          We're here to help! Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Contact Form -->
        <div class="lg:col-span-2">
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-mail" class="w-5 h-5 text-primary" />
                <h2 class="text-xl font-semibold">Send us a message</h2>
              </div>
            </template>

            <UForm
              :state="form"
              :validate="validate"
              @submit="submitForm"
              class="space-y-6"
            >
              <!-- Name Field -->
              <UFormGroup
                label="Your Name"
                name="name"
                required
                description="How should we address you?"
              >
                <UInput
                  v-model="form.name"
                  placeholder="John Doe"
                  icon="i-lucide-user"
                  size="lg"
                  :disabled="loading"
                />
              </UFormGroup>

              <!-- Email Field -->
              <UFormGroup
                label="Email Address"
                name="email"
                required
                description="We'll use this to respond to your inquiry"
              >
                <UInput
                  v-model="form.email"
                  type="email"
                  placeholder="john@example.com"
                  icon="i-lucide-at-sign"
                  size="lg"
                  :disabled="loading"
                />
              </UFormGroup>

              <!-- Message Field -->
              <UFormGroup
                label="Message"
                name="message"
                required
                :description="`Tell us what's on your mind (${form.message.length}/1000 characters)`"
              >
                <UTextarea
                  v-model="form.message"
                  placeholder="Describe your issue or question in detail..."
                  :rows="6"
                  :maxlength="1000"
                  :disabled="loading"
                  autoresize
                />
              </UFormGroup>

              <!-- Submit Button -->
              <div class="flex justify-end">
                <UButton
                  type="submit"
                  size="lg"
                  :loading="loading"
                  :disabled="loading || submitted"
                  icon="i-lucide-send"
                >
                  {{ loading ? 'Sending...' : 'Send Message' }}
                </UButton>
              </div>
            </UForm>

            <!-- Success Message -->
            <div v-if="submitted" class="mt-6">
              <UAlert
                icon="i-lucide-check-circle"
                color="success"
                variant="subtle"
                title="Message sent successfully!"
                description="Thank you for contacting us. We'll get back to you within 24-48 hours."
              />
            </div>
          </UCard>
        </div>

        <!-- Sidebar Info -->
        <div class="space-y-6">
          <!-- Quick Info Card -->
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-info" class="w-5 h-5 text-primary" />
                <h3 class="font-semibold">Quick Info</h3>
              </div>
            </template>

            <div class="space-y-4">
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white mb-1">Response Time</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  We typically respond within 24-48 hours during business days.
                </p>
              </div>

              <div>
                <h4 class="font-medium text-gray-900 dark:text-white mb-1">Business Hours</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Monday - Friday<br>
                  9:00 AM - 5:00 PM EST
                </p>
              </div>
            </div>
          </UCard>

          <!-- Common Topics Card -->
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-help-circle" class="w-5 h-5 text-primary" />
                <h3 class="font-semibold">Common Topics</h3>
              </div>
            </template>

            <ul class="space-y-3">
              <li class="flex items-start gap-2">
                <UIcon name="i-lucide-chevron-right" class="w-4 h-4 text-gray-400 mt-0.5" />
                <span class="text-sm text-gray-600 dark:text-gray-400">
                  Adding or editing game information
                </span>
              </li>
              <li class="flex items-start gap-2">
                <UIcon name="i-lucide-chevron-right" class="w-4 h-4 text-gray-400 mt-0.5" />
                <span class="text-sm text-gray-600 dark:text-gray-400">
                  Search and filtering issues
                </span>
              </li>
              <li class="flex items-start gap-2">
                <UIcon name="i-lucide-chevron-right" class="w-4 h-4 text-gray-400 mt-0.5" />
                <span class="text-sm text-gray-600 dark:text-gray-400">
                  Feature requests and suggestions
                </span>
              </li>
              <li class="flex items-start gap-2">
                <UIcon name="i-lucide-chevron-right" class="w-4 h-4 text-gray-400 mt-0.5" />
                <span class="text-sm text-gray-600 dark:text-gray-400">
                  Bug reports and technical issues
                </span>
              </li>
              <li class="flex items-start gap-2">
                <UIcon name="i-lucide-chevron-right" class="w-4 h-4 text-gray-400 mt-0.5" />
                <span class="text-sm text-gray-600 dark:text-gray-400">
                  Data import/export questions
                </span>
              </li>
            </ul>
          </UCard>

          <!-- Resources Card -->
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-book-open" class="w-5 h-5 text-primary" />
                <h3 class="font-semibold">Resources</h3>
              </div>
            </template>

            <div class="space-y-3">
              <UButton
                to="/about"
                variant="soft"
                block
                icon="i-lucide-info"
              >
                About TTRPG Database
              </UButton>
              <UButton
                to="/games"
                variant="soft"
                block
                icon="i-lucide-gamepad-2"
              >
                Browse Games
              </UButton>
              <UButton
                to="/dashboard"
                variant="soft"
                block
                icon="i-lucide-bar-chart"
              >
                View Dashboard
              </UButton>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormError, FormSubmitEvent } from '#ui/types'

interface HelpForm {
  name: string
  email: string
  message: string
}

const toast = useToast()

const form = ref<HelpForm>({
  name: '',
  email: '',
  message: ''
})

const loading = ref(false)
const submitted = ref(false)

// Form validation
const validate = (state: any): FormError[] => {
  const errors = []

  if (!state.name || state.name.trim().length < 2) {
    errors.push({ path: 'name', message: 'Name must be at least 2 characters' })
  }

  if (!state.email) {
    errors.push({ path: 'email', message: 'Email is required' })
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
    errors.push({ path: 'email', message: 'Please enter a valid email address' })
  }

  if (!state.message || state.message.trim().length < 10) {
    errors.push({ path: 'message', message: 'Message must be at least 10 characters' })
  }

  return errors
}

async function submitForm(event: FormSubmitEvent<HelpForm>) {
  loading.value = true

  try {
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: event.data
    })

    // Show success toast
    toast.add({
      title: 'Success!',
      description: 'Your message has been sent successfully. We\'ll get back to you soon.',
      icon: 'i-lucide-check-circle',
      color: 'success'
    })

    // Mark as submitted
    submitted.value = true

    // Reset form after a delay
    setTimeout(() => {
      form.value = {
        name: '',
        email: '',
        message: ''
      }
      submitted.value = false
    }, 5000)

  } catch (error: any) {
    console.error('Form submission error:', error)

    // Show error toast
    toast.add({
      title: 'Error',
      description: error.data?.statusMessage || 'Failed to send message. Please try again later.',
      icon: 'i-lucide-alert-circle',
      color: 'error'
    })
  } finally {
    loading.value = false
  }
}
</script>
