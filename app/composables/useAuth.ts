export const useAuth = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const router = useRouter()
  const toast = useToast()

  /**
   * Sign in with email and password
   */
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        throw error
      }

      toast.add({
        title: 'Success',
        description: 'You have been logged in successfully',
        color: 'success',
        icon: 'i-lucide-check-circle'
      })

      return { data, error: null }
    } catch (error: any) {
      toast.add({
        title: 'Login Failed',
        description: error.message || 'Invalid email or password',
        color: 'error',
        icon: 'i-lucide-alert-circle'
      })
      return { data: null, error }
    }
  }

  /**
   * Sign up with email and password
   */
  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })

      if (error) {
        throw error
      }

      toast.add({
        title: 'Success',
        description: 'Account created successfully. Please check your email to verify your account.',
        color: 'success',
        icon: 'i-lucide-check-circle'
      })

      return { data, error: null }
    } catch (error: any) {
      toast.add({
        title: 'Signup Failed',
        description: error.message || 'Failed to create account',
        color: 'error',
        icon: 'i-lucide-alert-circle'
      })
      return { data: null, error }
    }
  }

  /**
   * Sign out the current user
   */
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        throw error
      }

      toast.add({
        title: 'Signed Out',
        description: 'You have been logged out successfully',
        color: 'info',
        icon: 'i-lucide-log-out'
      })

      await router.push('/login')
    } catch (error: any) {
      toast.add({
        title: 'Error',
        description: error.message || 'Failed to sign out',
        color: 'error',
        icon: 'i-lucide-alert-circle'
      })
    }
  }

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = computed(() => !!user.value)

  /**
   * Get user email
   */
  const userEmail = computed(() => user.value?.email || '')

  /**
   * Reset password
   */
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })

      if (error) {
        throw error
      }

      toast.add({
        title: 'Password Reset Email Sent',
        description: 'Check your email for the password reset link',
        color: 'success',
        icon: 'i-lucide-mail'
      })

      return { error: null }
    } catch (error: any) {
      toast.add({
        title: 'Error',
        description: error.message || 'Failed to send password reset email',
        color: 'error',
        icon: 'i-lucide-alert-circle'
      })
      return { error }
    }
  }

  return {
    user: readonly(user),
    isAuthenticated: readonly(isAuthenticated),
    userEmail: readonly(userEmail),
    signIn,
    signUp,
    signOut,
    resetPassword
  }
}
