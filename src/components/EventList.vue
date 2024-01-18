<template>
  <q-list>
    <q-item clickable @click="createEvent">
      <q-item-section avatar>
        <q-icon name="mdi-plus" />
      </q-item-section>
      <q-item-section>Create event</q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
const createEvent = () => {
  console.log('createEvent');
};
</script>
