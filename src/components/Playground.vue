<template>
  <div class="inline-block space-y-2 relative">
    <!-- Selected Quality -->
    <div
      :class="['flex items-center justify-center cursor-pointer rounded-full p-3 w-28', {
        'hidden': !selectedQuality,
        'bg-green-200': selectedQuality && selectedQuality.color === 'green',
        'bg-yellow-200': selectedQuality && selectedQuality.color === 'yellow',
        'bg-red-200': selectedQuality && selectedQuality.color === 'red',
      }]"
      @click="toggleQualityOptions"
    >
      <p :class="['font-chips-semibold-bolder', selectedQuality ? `text-${selectedQuality.color}-800` : '']">
        {{ selectedQuality ? selectedQuality.label : '' }}
      </p>
    </div>

    <!-- Option -->
    <div v-if="isQualityShown" class="absolute">
      <div
        v-for="option in qualityOptions"
        :key="option.value"
        :class="['flex items-center justify-center cursor-pointer rounded-full p-3 w-28', {
          'hidden': option.label === selectedQuality.label,
          'bg-green-200': option.color === 'green',
          'bg-yellow-200': option.color === 'yellow',
          'bg-red-200': option.color === 'red',
        }]"
        @click="selectQuality(option) && closeQuality"
      >
        <p :class="['font-chips-semibold-bolder', `text-${option.color}-800`]">
          {{ option.label }}
        </p>
      </div>
    </div>

    {{ qualityInfo }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LtDataQuality',
  props: {
    qualityInfo: String,
  },
  data() {
    return {
      selectedQuality: null,
      isQualityShown: false,
      qualityOptions: [
        { value: 'Good', label: 'Good', color: 'green' },
        { value: 'Medium', label: 'Medium', color: 'yellow' },
        { value: 'Bad', label: 'Bad', color: 'red' },
      ],
    };
  },
  methods: {
    selectQuality(option) {
      this.selectedQuality = option;
      this.$emit('update:qualityInfo', option.label); // Emit selected quality label
      this.closeQuality();
    },
    toggleQualityOptions() {
      this.isQualityShown = !this.isQualityShown;
    },
    closeQuality() {
      this.isQualityShown = false;
    },
  },
  watch: {
    qualityInfo: {
      immediate: true,
      handler(newValue) {
        const selected = this.qualityOptions.find(option => option.label === newValue);
        if (selected) {
          this.selectedQuality = selected;
        }
      },
    },
  },
});
</script>

<style scoped>
.font-chips-semibold-bolder {
  font-family: 'chips', sans-serif;
  font-size: 14px;
  line-height: 14px;
  font-weight: bold;
}
</style>
