import '../css/main.css'
import MyCharts from './charts'

new MyCharts({
  select: '#box1',
  ratio: window.devicePixelRatio,
  type: 'cirque'
})

new MyCharts({
  select: '#box2',
  ratio: window.devicePixelRatio,
  type: 'line',
  data: [{
    xVal: '周一',
    yVal: 40
  },{
    xVal: '周二',
    yVal: 70
  },{
    xVal: '周三',
    yVal: 30
  },{
    xVal: '周四',
    yVal: 80
  },{
    xVal: '周五',
    yVal: 30
  },{
    xVal: '周六',
    yVal: 20
  },{
    xVal: '周日',
    yVal: 90
  }]
})

new MyCharts({
  type: 'histogram',
  select: '#box3',
  ratio: window.devicePixelRatio,
  data: [{
    xVal: 'vue',
    yVal: 80
  }, {
    xVal: 'react',
    yVal: 70
  }, {
    xVal: 'angular',
    yVal: 70
  }, {
    xVal: 'webpack',
    yVal: 90
  }, {
    xVal: 'nodeJs',
    yVal: 60
  }, {
    xVal: 'typescript',
    yVal: 40
  }, {
    xVal: 'ES6+',
    yVal: 100
  }]
})