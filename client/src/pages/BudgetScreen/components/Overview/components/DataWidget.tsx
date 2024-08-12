import { Card, Statistic, StatisticProps } from 'antd'
import { valueType } from 'antd/es/statistic/utils'
import CountUp from 'react-countup'

const formatter: StatisticProps['formatter'] = (value) => {
  return <CountUp end={value as number} separator=',' duration={2} />
}
interface DataWidgetProps {
  heading: string
  value: valueType | undefined
}

export default function DataWidget(props: DataWidgetProps) {
  const valueStyle = { color: 'var(--green)' }

  return (
    <Card bordered={false} style={{ marginBottom: 12 }}>
      <Statistic
        title={`${props.heading}`}
        formatter={props.value ? formatter : undefined}
        value={props.value ? props.value : '--'}
        prefix={props.value ? '$' : ''}
        valueStyle={valueStyle}
      />
    </Card>
  )
}
