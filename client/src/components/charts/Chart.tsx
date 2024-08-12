import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

interface ChartProps {
  option: echarts.EChartOption
  style?: React.CSSProperties
}

export const Chart = (props: ChartProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      const myChart = echarts.init(ref.current, null, { renderer: 'svg' })
      myChart.setOption(props.option)

      window.addEventListener('resize', () => myChart.resize())

      return () => {
        window.removeEventListener('resize', () => myChart.resize())
      }
    }
  }, [props.option])

  return <div ref={ref} style={props.style} />
}
