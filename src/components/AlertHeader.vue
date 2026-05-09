<template>
  <div class="alert-header">
    <div class="alert-item">
      <div class="alert-icon">
        <span class="alert-icon-inner">!</span>
      </div>
      <div class="alert-content">
        <span class="alert-label">超期订单数</span>
        <span class="alert-value">{{ overdue }}</span>
      </div>
    </div>
    <div class="alert-divider"></div>
    <div class="alert-item">
      <div class="alert-icon">
        <span class="alert-icon-inner">⚠</span>
      </div>
      <div class="alert-content">
        <span class="alert-label">产能不足订单数</span>
        <span class="alert-value">{{ capacityShortage }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable-next-line no-undef */
defineProps({
  overdue: {
    type: Number,
    required: true
  },
  capacityShortage: {
    type: Number,
    required: true
  }
})
</script>

<style scoped>
.alert-header {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
  padding: 24px 32px;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(220, 38, 38, 0.4);
  gap: 32px;
}

.alert-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.alert-icon {
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s ease-in-out infinite;
}

.alert-icon-inner {
  font-size: 32px;
  color: #fff;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

.alert-content {
  display: flex;
  flex-direction: column;
}

.alert-label {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.alert-value {
  font-size: 48px;
  font-weight: 800;
  color: #fff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.alert-divider {
  width: 2px;
  height: 80px;
  background: rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .alert-header {
    flex-direction: column;
    gap: 24px;
  }
  
  .alert-divider {
    width: 80px;
    height: 2px;
  }
  
  .alert-value {
    font-size: 36px;
  }
}
</style>
