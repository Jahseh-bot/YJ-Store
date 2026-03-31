export enum OrderStatus {
  PENDING_PAYMENT = 'pending_payment',   // 待付款
  PAID = 'paid',                         // 已付款(待发货)
  PROCESSING = 'processing',             // 处理中(商家确认)
  SHIPPED = 'shipped',                   // 已发货
  DELIVERED = 'delivered',               // 已收货(待评价)
  COMPLETED = 'completed',               // 已完成
  CANCELLED = 'cancelled',              // 已取消
  REFUNDING = 'refunding',              // 退款中
  REFUNDED = 'refunded',                // 已退款
  CLOSED = 'closed'                     // 已关闭(超时)
}
