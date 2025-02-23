<script setup lang="ts">
import type {FormError} from '#ui/types'

const toast = useToast()
const {loadMe} = useAuth()

const credentials = reactive({
    email: '',
    password: '',
})

const validate = (): FormError[] => {
    const errors: FormError[] = []

    if (!credentials.email.length) {
        errors.push({path: 'email', message: 'Pflichtfeld'})
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
        errors.push({path: 'email', message: 'Ungültige E-Mail'})
    }

    if (!credentials.password.length) {
        errors.push({path: 'password', message: 'Pflichtfeld'})
    } else if (credentials.password.length < 10) {
        errors.push({path: 'password', message: 'Muss mindestens 10 Zeichen enthalten'})
    }

    return errors
}

const submitting = ref(false)
const onSubmit = async () => {
    if (submitting.value) {
        return
    }

    try {
        submitting.value = true

        await $fetch('/api/logins', {
            method: 'POST',
            body: {
                email: credentials.email,
                password: credentials.password,
            },
        })

        await loadMe()

        await navigateTo('/')
    } catch (error) {
        console.error(error)

        toast.add({
            title: 'Fehler',
            description: 'Fehler beim Login',
            icon: 'i-heroicons-exclamation-circle',
            color: 'red',
        })
    } finally {
        submitting.value = false
    }
}
</script>

<template>
    <UContainer>
        <UForm
            :state="credentials"
            :validate="validate"
            :validate-on="['change', 'blur', 'submit']"
            @submit="onSubmit"
        >
            <UCard>
                <template #header>
                    <p class="text-2xl">Anmelden</p>
                </template>

                <div class="space-y-4">
                    <UFormGroup name="email" label="E-Mail">
                        <UInput
                            v-model="credentials.email"
                            size="sm"
                            type="email"
                            color="white"
                            variant="outline"
                            placeholder="beispiel@email.com"
                        />
                    </UFormGroup>

                    <UFormGroup name="password" label="Passwort">
                        <UInput
                            v-model="credentials.password"
                            type="password"
                            color="white"
                            variant="outline"
                            placeholder="Passwort"
                        />
                    </UFormGroup>

                    <p>
                        Noch keinen Account?
                        <NuxtLink class="underline" to="/register">Jetzt registrieren</NuxtLink>
                    </p>
                </div>

                <template #footer>
                    <UButton
                        :loading="submitting"
                        :disabled="submitting"
                        type="submit"
                        loading-icon="svg-spinners:bars-rotate-fade"
                        icon="ep:d-arrow-right"
                        color="primary"
                        variant="solid"
                    >
                        Absenden
                    </UButton>
                </template>
            </UCard>
        </UForm>
    </UContainer>
</template>
