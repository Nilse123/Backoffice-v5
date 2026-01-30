<template>
  <div>
    <UApp>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <AppToast
        :message="toastMessage"
        :type="toastType"
        :duration="toastDuration"
        v-model="toastVisible"
      />
    </UApp>
  </div>
</template>

<script setup lang="ts">
import AppToast from '~/components/AppToast.vue'
import { useToast } from '~/composables/useToast'

const { toastMessage, toastType, toastVisible, toastDuration } = useToast()
</script>

