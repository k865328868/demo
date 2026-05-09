<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <div class="header-content">
        <h1 class="dashboard-title">画都-订单监控中心</h1>
        <p class="dashboard-subtitle">实时监控订单执行情况</p>
      </div>
      <div class="header-meta">
        <span class="update-time">更新时间: {{ currentTime }}</span>
        <span class="data-status online">数据正常</span>
      </div>
    </header>

    <AlertHeader :overdue="stats.overdue" :capacityShortage="stats.capacityShortage" />

    <StatsCards :stats="stats" />

    <div class="bottom-section">
      <StatusChart :distribution="statusDistribution" />
      <UrgentOrdersTable :orders="urgentOrders" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import AlertHeader from './components/AlertHeader.vue'
import StatsCards from './components/StatsCards.vue'
import StatusChart from './components/StatusChart.vue'
import UrgentOrdersTable from './components/UrgentOrdersTable.vue'
import { getOrderStats, getStatusDistribution, getUrgentOrders } from './data/orders.js'

const currentTime = ref('')
const stats = ref(getOrderStats())
const statusDistribution = ref(getStatusDistribution())
const urgentOrders = ref(getUrgentOrders())

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

let timer = null

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%);
  min-height: 100vh;
}

#app {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.dashboard {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 20px 24px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.header-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.dashboard-title {
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.5px;
}

.dashboard-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.header-meta {
  display: flex;
  align-items: center;
  gap: 16px;
}

.update-time {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  font-family: 'Monaco', 'Consolas', monospace;
}

.data-status {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.data-status.online {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
}

.bottom-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 1024px) {
  .bottom-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  #app {
    padding: 16px;
  }
  
  .dashboard-header {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
  
  .dashboard-title {
    font-size: 22px;
  }
}
</style>
