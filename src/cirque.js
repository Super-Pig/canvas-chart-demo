/**
 * 绘制圆环
 */
let Cirque = function (percent) {
  const ctx = this.ctx
  const circleConfig = this.circleConfig

  /**
   * 绘制打底圆环
   */
  ctx.beginPath()
  ctx.lineWidth = this.circleConfig.arcWidth

  //设置渐变色
  let grd = ctx.createRadialGradient(circleConfig.x, circleConfig.y, circleConfig.radius - 10,
    circleConfig.x, circleConfig.y, circleConfig.radius + 10)
  ctx.strokeStyle
  grd.addColorStop(0, '#e9eae9')
  grd.addColorStop(0.8, '#fefefe')
  grd.addColorStop(1, '#e9eae9')
  ctx.strokeStyle = grd
  ctx.arc(circleConfig.x, circleConfig.y, circleConfig.radius, circleConfig.startAngle, circleConfig.endAngle)
  ctx.stroke()
  ctx.closePath()

  /**
   * 绘制进度圆环
   */
  ctx.beginPath()
  ctx.lineWidth = this.circleConfig.arcWidth

  // 设置渐变颜色
  const linear = ctx.createLinearGradient(220, 140, 660, 970)
  linear.addColorStop(0, '#ffc26b')
  linear.addColorStop(0.8, '#ff9a5f')
  linear.addColorStop(1, '#ff8157')
  ctx.strokeStyle = linear
  ctx.arc(circleConfig.x, circleConfig.y, circleConfig.radius, circleConfig.startAngle, circleConfig.endAngle * percent)
  ctx.stroke()
  ctx.closePath()

  /**
   * 起点的圆形
   */
  ctx.beginPath()
  ctx.fillStyle = '#ff7854'
  ctx.arc(circleConfig.x + circleConfig.radius, circleConfig.y, circleConfig.arcWidth / 2, circleConfig.startAngle, -Math.PI, true)
  ctx.fill()
  ctx.closePath()

  /**
   * 终点的圆形
   */
  ctx.beginPath()
  ctx.lineWidth = circleConfig.arcWidth - 10
  ctx.fillStyle = '#fff'
  ctx.strokeStyle = '#ff7854'

  const tarX = circleConfig.x + circleConfig.radius * Math.cos(2 * Math.PI * percent)
  const tarY = circleConfig.y + circleConfig.radius * Math.sin(2 * Math.PI * percent)

  ctx.arc(tarX, tarY, circleConfig.arcWidth - 8, circleConfig.startAngle, 2 * Math.PI)
  ctx.fill()
  ctx.stroke()
  ctx.closePath()
}

export default Cirque