/**
 * 绘制折线图
 */
export function drawAxis(current) {
  const defaultParam = this.defaultParam
  const ctx = this.ctx
  const pad = defaultParam.padding
  const bottomPad = 30
  const wd = defaultParam.wd
  const ht = defaultParam.ht
  const data = defaultParam.data

  ctx.save()

  // 绘制坐标系
  ctx.beginPath()
  ctx.lineWidth = 2
  ctx.strokeStyle = defaultParam.styles.borderColor
  ctx.moveTo(pad, pad)
  ctx.lineTo(pad, ht - bottomPad)
  ctx.lineTo(wd - pad, ht - bottomPad)
  ctx.stroke()
  ctx.closePath()

  for (let i = 0; i < data.length; i++) {
    const x = i * (defaultParam.wid / data.length - 1) + defaultParam.x

    // 绘制文字刻度
    ctx.beginPath()
    ctx.fillStyle = '#333'
    ctx.textAlign = 'center'
    ctx.font = defaultParam.fontSize + ' Microsoft YaHei'
    ctx.fillText(data[i].xVal, x, ht - bottomPad + 20)
    ctx.closePath()
  }

  ctx.restore()
}

export function drawPoint(percent) {
  const defaultParam = this.defaultParam
  const ctx = this.ctx
  const pad = defaultParam.padding
  const bottomPad = 30
  const wd = defaultParam.wd
  const ht = defaultParam.ht
  const data = defaultParam.data
  const maxPoint = defaultParam.maxPoint
  const yAxisLen = ht - pad - bottomPad


  ctx.save()

  for (let i = 0; i < data.length; i++) {
    const x = i * (defaultParam.wid / data.length - 1) + defaultParam.x
    const y = ht - pad - (yAxisLen - 100) * data[i].yVal / maxPoint * percent

    ctx.beginPath()
    ctx.fillStyle = '#fff'
    ctx.arc(x, y, 10, 0, Math.PI * 2)
    ctx.stroke()
    ctx.fill()
    ctx.closePath()

    ctx.beginPath()
    ctx.fillStyle = '#000'
    ctx.arc(x, y, 6, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()

    ctx.beginPath()
    ctx.textAlign = 'center'
    ctx.font = defaultParam.fontSize + ' Microsoft YaHei'
    ctx.fillText(data[i].yVal, x, y - 20)
    ctx.closePath()
  }

  ctx.restore()
}

export function drawBrokenLine(percent) {
  const defaultParam = this.defaultParam
  const ctx = this.ctx
  const bottomPad = 30
  const data = defaultParam.data
  const ht = defaultParam.ht
  const maxPoint = defaultParam.maxPoint
  const len = data.length - 1
  const pad = defaultParam.padding
  const stepDots = Math.floor(percent * len)

  // 绘制线条
  ctx.save()
  ctx.beginPath()
  ctx.setLineDash([4, 4])
  ctx.lineWidth = defaultParam.lineWidth
  ctx.strokeStyle = defaultParam.styles.lineColor

  for (let i = 0; i < len; i++) {
    const yAxisLen = ht - pad - bottomPad
    const averageNum = defaultParam.wid / data.length - 1

    // 起点
    const { yVal } = data[i]
    const axisY = ht - pad - (yAxisLen - 100) * yVal / maxPoint * percent
    const axisX = i * averageNum + defaultParam.x

    // 终点
    let axisEndX = (i + 1) * averageNum + defaultParam.x
    let axisEndY = ht - pad - (yAxisLen - 100) * data[i + 1].yVal / maxPoint * percent

    if (i <= stepDots) {
      if (i === stepDots) {
        axisEndX = (axisEndX - axisX) * percent + axisX
        axisEndY = (axisEndY - axisY) * percent + axisY
      }

      ctx.moveTo(axisX, axisY)
      ctx.lineTo(axisEndX, axisEndY)
    }
  }

  ctx.stroke()
  ctx.closePath()
  ctx.restore()
}

export function drawDashLine(percent) {
  const defaultParam = this.defaultParam
  const ctx = this.ctx
  const bottomPad = 30
  const data = defaultParam.data
  const ht = defaultParam.ht
  const maxPoint = defaultParam.maxPoint
  const pad = defaultParam.padding
  const len = data.length

  ctx.save()
  ctx.beginPath()
  ctx.setLineDash([2, 4])
  ctx.strokeStyle = '#d6d6d6'
  ctx.lineWidth = defaultParam.lineWidth
  ctx.strokeStyle = defaultParam.styles.lineColor

  for (let i = 0; i < len; i++) {
    const yAxisLen = ht - pad - bottomPad
    const averageNum = defaultParam.wid / data.length - 1

    // 起始点
    const axisX = i * averageNum + defaultParam.x
    const axisY = ht - bottomPad

    // 终点
    const axisEndY = ht - pad - (yAxisLen - 100) * data[i].yVal / maxPoint * percent

    ctx.moveTo(axisX, axisY)
    ctx.lineTo(axisX, axisEndY)
  }

  ctx.stroke()
  ctx.closePath()
  ctx.restore()
}