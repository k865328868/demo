export const mockOrders = [
  { id: 'PO-2024-001', customer: '美国-微软', status: 'overdue', dueDate: '2024-01-15', delayDays: 65 },
  { id: 'PO-2024-002', customer: '德国-西门子', status: 'overdue', dueDate: '2024-01-20', delayDays: 60 },
  { id: 'PO-2024-003', customer: '日本-索尼', status: 'overdue', dueDate: '2024-01-25', delayDays: 55 },
  { id: 'PO-2024-004', customer: '韩国-三星', status: 'overdue', dueDate: '2024-02-01', delayDays: 48 },
  { id: 'PO-2024-005', customer: '英国-戴森', status: 'overdue', dueDate: '2024-02-10', delayDays: 39 },
  { id: 'PO-2024-006', customer: '法国-空客', status: 'overdue', dueDate: '2024-02-15', delayDays: 34 },
  { id: 'PO-2024-007', customer: '意大利-菲亚特', status: 'overdue', dueDate: '2024-02-20', delayDays: 29 },
  { id: 'PO-2024-008', customer: '西班牙-桑坦德', status: 'overdue', dueDate: '2024-02-25', delayDays: 24 },
  { id: 'PO-2024-009', customer: '荷兰-飞利浦', status: 'urgent', dueDate: '2024-03-01', delayDays: 18 },
  { id: 'PO-2024-010', customer: '比利时-百威', status: 'urgent', dueDate: '2024-03-05', delayDays: 14 },
  { id: 'PO-2024-011', customer: '瑞士-雀巢', status: 'urgent', dueDate: '2024-03-10', delayDays: 9 },
  { id: 'PO-2024-012', customer: '瑞典-沃尔沃', status: 'urgent', dueDate: '2024-03-15', delayDays: 4 },
  { id: 'PO-2024-013', customer: '挪威-Equinor', status: 'pending', dueDate: '2024-03-20', delayDays: 0 },
  { id: 'PO-2024-014', customer: '丹麦-马士基', status: 'pending', dueDate: '2024-03-25', delayDays: 0 },
  { id: 'PO-2024-015', customer: '芬兰-诺基亚', status: 'pending', dueDate: '2024-03-30', delayDays: 0 },
  { id: 'PO-2024-016', customer: '澳大利亚-必和必拓', status: 'producing', dueDate: '2024-04-01', delayDays: 0 },
  { id: 'PO-2024-017', customer: '新西兰-恒天然', status: 'producing', dueDate: '2024-04-05', delayDays: 0 },
  { id: 'PO-2024-018', customer: '新加坡-淡马锡', status: 'producing', dueDate: '2024-04-10', delayDays: 0 },
  { id: 'PO-2024-019', customer: '马来西亚-马石油', status: 'pending_delivery', dueDate: '2024-04-15', delayDays: 0 },
  { id: 'PO-2024-020', customer: '泰国-正大', status: 'pending_delivery', dueDate: '2024-04-20', delayDays: 0 },
  { id: 'PO-2024-021', customer: '印度-塔塔', status: 'confirmed', dueDate: '2024-04-25', delayDays: 0 },
  { id: 'PO-2024-022', customer: '巴西-淡水河谷', status: 'confirmed', dueDate: '2024-04-30', delayDays: 0 },
  { id: 'PO-2024-023', customer: '墨西哥-美洲电信', status: 'confirmed', dueDate: '2024-05-05', delayDays: 0 },
  { id: 'PO-2024-024', customer: '加拿大-罗杰斯', status: 'confirmed', dueDate: '2024-05-10', delayDays: 0 },
  { id: 'PO-2024-025', customer: '俄罗斯- Gazprom', status: 'confirmed', dueDate: '2024-05-15', delayDays: 0 },
  { id: 'PO-2024-026', customer: '阿联酋-阿提哈德', status: 'pending', dueDate: '2024-05-20', delayDays: 0 },
  { id: 'PO-2024-027', customer: '沙特-阿美', status: 'pending', dueDate: '2024-05-25', delayDays: 0 },
  { id: 'PO-2024-028', customer: '南非-Sasol', status: 'pending', dueDate: '2024-05-30', delayDays: 0 },
  { id: 'PO-2024-029', customer: '尼日利亚- Dangote', status: 'pending', dueDate: '2024-06-01', delayDays: 0 },
  { id: 'PO-2024-030', customer: '阿根廷-YPF', status: 'pending', dueDate: '2024-06-05', delayDays: 0 },
]

export const getOrderStats = () => {
  const total = mockOrders.length
  const confirmed = mockOrders.filter(o => o.status === 'confirmed').length
  const pending = mockOrders.filter(o => o.status === 'pending').length
  const producing = mockOrders.filter(o => o.status === 'producing').length
  const pendingDelivery = mockOrders.filter(o => o.status === 'pending_delivery').length
  const overdue = mockOrders.filter(o => o.status === 'overdue').length
  const urgent = mockOrders.filter(o => o.status === 'urgent').length
  const capacityShortage = pending + overdue + urgent
  
  return {
    total,
    confirmed,
    pending,
    producing,
    pendingDelivery,
    overdue,
    urgent,
    capacityShortage
  }
}

export const getStatusDistribution = () => {
  return [
    { name: '待确认', value: mockOrders.filter(o => o.status === 'confirmed').length, color: '#6366f1' },
    { name: '待生产', value: mockOrders.filter(o => o.status === 'pending').length, color: '#f59e0b' },
    { name: '生产中', value: mockOrders.filter(o => o.status === 'producing').length, color: '#10b981' },
    { name: '待发货', value: mockOrders.filter(o => o.status === 'pending_delivery').length, color: '#3b82f6' },
    { name: '即将超期', value: mockOrders.filter(o => o.status === 'urgent').length, color: '#f97316' },
    { name: '已超期', value: mockOrders.filter(o => o.status === 'overdue').length, color: '#ef4444' },
  ]
}

export const getUrgentOrders = () => {
  return mockOrders.filter(o => o.status === 'overdue' || o.status === 'urgent').sort((a, b) => a.delayDays - b.delayDays).reverse()
}
