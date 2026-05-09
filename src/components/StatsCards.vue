<template>
  <div class="stats-grid">
    <div class="stat-card" :class="{ warning: card.warning }" v-for="card in cards" :key="card.label">
      <div class="stat-icon" :style="{ background: card.bgColor }">
        <span>{{ card.icon }}</span>
      </div>
      <div class="stat-info">
        <span class="stat-label">{{ card.label }}</span>
        <span class="stat-value">{{ card.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

/* eslint-disable-next-line no-undef */
const props = defineProps({
  stats: {
    type: Object,
    required: true
  }
})

const cards = computed(() => [
  {
    label: '总订单',
    value: props.stats.total,
    icon: '📋',
    bgColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    warning: false
  },
  {
    label: '待确认',
    value: props.stats.confirmed,
    icon: '⏳',
    bgColor: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    warning: false
  },
  {
    label: '待生产',
    value: props.stats.pending,
    icon: '📦',
    bgColor: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    warning: props.stats.pending > 5
  },
  {
    label: '生产中',
    value: props.stats.producing,
    icon: '🔧',
    bgColor: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    warning: false
  },
  {
    label: '待发货',
    value: props.stats.pendingDelivery,
    icon: '🚚',
    bgColor: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    warning: false
  },
  {
    label: '超期订单',
    value: props.stats.overdue,
    icon: '🔥',
    bgColor: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    warning: true
  }
])
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
}

.stat-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.stat-card.warning {
  border-left-color: #ef4444;
  animation: shake 0.5s ease-in-out infinite;
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-2px);
  }
  75% {
    transform: translateX(2px);
  }
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: #1e293b;
}

.stat-card.warning .stat-value {
  color: #ef4444;
}
</style>
