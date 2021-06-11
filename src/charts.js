import utils from './utils'
import Cirque from './cirque'
import { drawAxis, drawPoint, drawBrokenLine, drawDashLine } from './broken'
import drawHistogram from './histogram'
import myAnimation from './myAnimation'

class MyCharts {
  constructor(defaultParam) {
    this.defaultParam = defaultParam
    this._canvasParDom = document.querySelector(this.defaultParam.select)
    this.containerWidth = this._canvasParDom.clientWidth
    this.containerHeight = this._canvasParDom.clientHeight
    this._canvas = document.createElement('canvas')

    this.defaultConfig = {
      styles: {
        borderColor: '',
        lineColor: '',
        pointColor: ''
      },
      data: [],
      x: 40,
      padding: 20,
      fontSize: '16px',
      wd: this.containerWidth * this.defaultParam.ratio,
      ht: this.containerHeight * this.defaultParam.ratio,
      lineWidth: 2,
      hisColor: ['#7b8c7c', '#5c968a', '#576d93', '#a0d878', '#337d56', '#c1d0ae', '#93b469', '#bda29a']
    }

    this.ctx = this._canvas.getContext('2d')

    // 缩放画布大小
    this._canvas.width = this.containerWidth * this.defaultParam.ratio
    this._canvas.height = this.containerHeight * this.defaultParam.ratio

    this._canvasParDom.appendChild(this._canvas)

    this.defaultParam = utils.extendsObj(this.defaultConfig, this.defaultParam)

    // 设置合适的画布宽度
    this.defaultParam.wid = this._canvas.width - 20

    this.init()
  }

  init() {
    switch (this.defaultParam.type) {
      case 'cirque':
        this.circleConfig = utils.extendsObj(this.defaultParam, {
          x: this.defaultParam.wd / 2,
          y: this.defaultParam.ht / 2,
          radius: 400,
          startAngle: 0,
          endAngle: 2 * Math.PI,
          arcWidth: 18,
          target: 80
        })

        myAnimation.call(this, {
          percent: this.circleConfig.target,
          render: current => {
            Cirque.call(this, current / 100)
          }
        })
        break
      case 'line':
        utils.extendsObj(this.defaultConfig, {
          maxPoint: Math.max(...this.defaultParam.data.map(({ yVal }) => yVal))
        })

        myAnimation.call(this, {
          percent: 200,
          render: current => {
            // 绘制坐标系
            drawAxis.call(this, current)

            // 绘制虚线
            drawBrokenLine.call(this, current / 200)

            // 绘制Y轴虚线
            drawDashLine.call(this, current / 200)

            // 绘制圆点
            drawPoint.call(this, current / 200)
          }
        })
        break
      case 'histogram':
        utils.extendsObj(this.defaultConfig, {
          maxPoint: Math.max(...this.defaultParam.data.map(({ yVal }) => yVal))
        })

        myAnimation.call(this, {
          percent: 100,
          render: current => {
            // 绘制坐标系
            drawAxis.call(this, current)

            // 绘制直方图
            drawHistogram.call(this, current / 100)
          }
        })
        break
      default:
        console.log('当前无此功能的绘制')
    }
  }
}

export default MyCharts