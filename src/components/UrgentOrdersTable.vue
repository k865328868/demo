<template>
  <div class="orders-container">
    <div class="orders-header">
      <h3 class="orders-title">紧急订单预警</h3>
      <span class="orders-count">共 {{ orders.length }} 条紧急订单</span>
    </div>
    <div class="table-wrapper">
      <table class="orders-table">
        <thead>
          <tr>
            <th>订单号</th>
            <th>客户</th>
            <th>应交付日</th>
            <th>延误天数</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders" :key="order.id" :class="{ highlight: index < 3 }">
            <td class="order-id">{{ order.id }}</td>
            <td class="customer">{{ order.customer }}</td>
            <td class="due-date">{{ order.dueDate }}</td>
            <td class="delay-days" :class="{ critical: order.delayDays > 30, warning: order.delayDays > 0 && order.delayDays <= 30 }">
              <span v-if="order.delayDays > 0">-{{ order.delayDays }}天</span>
              <span v-else class="urgent-text">即将到期</span>
            </td>
            <td>
              <span class="status-badge" :class="order.status">
                {{ getStatusText(order.status) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable-next-line no-undef */
defineProps({
  orders: {
    type: Array,
    required: true
  }
})

const getStatusText = (status) => {
  const statusMap = {
    overdue: '已超期',
    urgent: '即将超期',
    pending: '待生产',
    producing: '生产中',
    pending_delivery: '待发货',
    confirmed: '待确认'
  }
  return statusMap[status] || status
}
</script>

<style scoped>
.orders-container {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.orders-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.orders-title {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  padding-left: 16px;
  border-left: 4px solid #ef4444;
}

.orders-count {
  font-size: 14px;
  color: #ef4444;
  font-weight: 600;
}

.table-wrapper {
  overflow-x: auto;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
}

.orders-table thead th {
  text-align: left;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #e2e8f0;
}

.orders-table tbody tr {
  border-bottom: 1px solid #f1f5f9;
  transition: all 0.2s ease;
}

.orders-table tbody tr:hover {
  background: #f8fafc;
}

.orders-table tbody tr.highlight {
  background: linear-gradient(90deg, #fef2f2 0%, #fff 100%);
}

.orders-table tbody td {
  padding: 14px 16px;
  font-size: 14px;
  color: #334155;
}

.order-id {
  font-weight: 600;
  color: #1e293b;
}

.customer {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.due-date {
  color: #64748b;
}

.delay-days {
  font-weight: 600;
  color: #f97316;
}

.delay-days.critical {
  color: #ef4444;
  animation: blink 1s ease-in-out infinite;
}

.delay-days.warning {
  color: #f59e0b;
}

.urgent-text {
  color: #f97316;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.status-badge.overdue {
  background: #fee2e2;
  color: #dc2626;
}

.status-badge.urgent {
  background: #fef3c7;
  color: #d97706;
}

.status-badge.pending {
  background: #fef3c7;
  color: #d97706;
}

.status-badge.producing {
  background: #d1fae5;
  color: #059669;
}

.status-badge.pending_delivery {
  background: #dbeafe;
  color: #2563eb;
}

.status-badge.confirmed {
  background: #e0e7ff;
  color: #6366f1;
}

@media (max-width: 768px) {
  .customer {
    max-width: 120px;
  }
  
  .orders-table thead th,
  .orders-table tbody td {
    padding: 10px 12px;
    font-size: 13px;
  }
}
</style>
