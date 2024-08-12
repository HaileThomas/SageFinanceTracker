import './BankCard.css'

interface BankBalance {
  name: string
  mask: string | null
  balance: number | null
  type: string | null
}

export default function BankCard(props: BankBalance) {
  return (
    <div className={`bank-card-container stack-elements-evenly ${props.type}`}>
      <div className=''>
        <p className='bank-card-name'> {props.name} </p>
        <p className='bank-card-balance'> {`${props.balance ? '$' + props.balance : ''}`} </p>
      </div>
      <div>
        <p className='bank-card-number'> {`**** **** **** ${props.mask ? props.mask : '****'}`} </p>
      </div>
    </div>
  )
}
