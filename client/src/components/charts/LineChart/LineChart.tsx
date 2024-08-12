import { Chart } from '../Chart'

interface StackedAreaChartProps {
  title: string
  axis: string[]
  data: number[]
}

export default function LineChart(props: StackedAreaChartProps) {
  const styles: React.CSSProperties = { minWidth: '100%', height: '300px' }

  const commonOptions: echarts.EChartOption = {
    title: {
      text: props.title,
    },
    xAxis: {
      type: 'category',
      data: props.axis,
    },
    grid: {
      top: '15%',
      left: '2%',
      right: '2%',
      bottom: '2%',
      backgroundColor: '#fff',
      containLabel: true,
    },
    yAxis: {
      type: 'value',
    },
  }

  const options: echarts.EChartOption = {
    ...commonOptions,
    series: [
      {
        data: props.data,
        type: 'line',
        smooth: true,
        lineStyle: { color: 'var(--green)' },
        itemStyle: { color: 'var(--green)' },
        emphasis: {
          lineStyle: { color: 'var(--green)' },
          itemStyle: { color: 'var(--green)' },
        },
      },
    ],
  }

  const loadingOptions: echarts.EChartOption = {
    ...commonOptions,
    series: [],
  }

  return props.data.length > 0 ? (
    <Chart option={options} style={styles} />
  ) : (
    <Chart option={loadingOptions} style={styles} />
  )
}
