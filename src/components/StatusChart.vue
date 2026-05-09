<template>
  <div class="chart-container">
    <h3 class="chart-title">订单状态分布</h3>
    <div class="chart-wrapper">
      <div class="chart-circle">
        <div class="circle-inner">
          <span class="circle-total">{{ total }}</span>
          <span class="circle-label">总订单</span>
        </div>
        <svg viewBox="0 0 100 100" class="ring-svg">
          <circle
            v-for="(segment, index) in segments"
            :key="index"
            cx="50"
            cy="50"
            r="40"
            fill="none"
            :stroke="segment.color"
            stroke-width="12"
            :stroke-dasharray="segment.dashArray"
            :stroke-dashoffset="segment.dashOffset"
            :style="{ transform: `rotate(${segment.rotation}deg)`, transformOrigin: '50% 50%' }"
            class="ring-segment"
          />
        </svg>
      </div>
      <div class="chart-legend">
        <div v-for="item in distribution" :key="item.name" class="legend-item">
          <span class="legend-color" :style="{ background: item.color }"></span>
          <span class="legend-name">{{ item.name }}</span>
          <span class="legend-value">{{ item.value }}</span>
          <span class="legend-percent">{{ getPercent(item.value) }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

/* eslint-disable-next-line no-undef */
const props = defineProps({
  distribution: {
    type: Array,
    required: true
  }
})

const total = computed(() => props.distribution.reduce((sum, item) => sum + item.value, 0))

const getPercent = (value) => {
  return ((value / total.value) * 100).toFixed(1)
}

const segments = computed(() => {
  const circumference = 2 * Math.PI * 40
  let offset = 0
  
  return props.distribution.map((item, index) => {
    const percentage = item.value / total.value
    const dashArray = `${percentage * circumference} ${circumference}`
    const dashOffset = -offset
    const rotation = (index === 0 ? 0 : -90)
    
    offset += percentage * circumference
    
    return {
      color: item.color,
      dashArray,
      dashOffset,
      rotation
    }
  })
})
</script>

<style scoped>
.chart-container {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.chart-title {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 20px;
  padding-left: 16px;
  border-left: 4px solid #ef4444;
}

.chart-wrapper {
  display: flex;
  align-items: center;
  gap: 32px;
}

.chart-circle {
  position: relative;
  width: 180px;
  height: 180px;
  flex-shrink: 0;
}

.ring-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.ring-segment {
  transition: all 0.5s ease;
}

.circle-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.circle-total {
  display: block;
  font-size: 36px;
  font-weight: 700;
  color: #1e293b;
}

.circle-label {
  font-size: 12px;
  color: #64748b;
}

.chart-legend {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #f8fafc;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.legend-item:hover {
  background: #f1f5f9;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend-name {
  font-size: 14px;
  color: #475569;
  flex: 1;
}

.legend-value {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  min-width: 24px;
  text-align: right;
}

.legend-percent {
  font-size: 12px;
  color: #94a3b8;
  min-width: 40px;
  text-align: right;
}

@media (max-width: 768px) {
  .chart-wrapper {
    flex-direction: column;
  }
  
  .chart-legend {
    grid-template-columns: 1fr;
  }
}
</style>
