import { ReactNode } from "react"
import "./InfoCard.css"

interface InfoCardProps {
  icon: ReactNode
  heading: string
  subheading: string
}

export default function InfoCard(props: InfoCardProps) {
  return (
    <div className="stack-elements-evenly info-card-container">
      <div className="padded-info-card-icon"> {props.icon} </div>
      <p className="header"> {props.heading} </p>
      <p className="subheader"> {props.subheading} </p>
    </div>
  )
}
