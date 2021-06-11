export function drawHistogram(percent) {
  const defaultParam = this.defaultParam
  const ctx = this.ctx
  const bottomPad = 30
  const data = defaultParam.data
  const ht = defaultParam.ht
  const maxPoint = defaultParam.maxPoint
  const pad = defaultParam.padding
  const len = data.length
  const yAxisLen = ht - pad - bottomPad
  const averageNum = defaultParam.wid / data.length - 1

  let rectHeight = this._canvas.height - bottomPad

  for (let i = 0; i < len; i++) {
    let { yVal } = data[i]

    const axisY = ht - bottomPad - (yAxisLen - 100) * yVal / maxPoint * percent
    const axisX = i * averageNum + defaultParam.x


    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = defaultParam.hisColor[i]
    ctx.fillRect(axisX, axisY, 40, rectHeight - axisY)
    ctx.closePath()
    ctx.restore()
  }
}

export default drawHistogram