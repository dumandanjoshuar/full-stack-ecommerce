import { Button, Col, Row } from "react-bootstrap"
import { NavLink } from "react-router-dom"


function Banner({ props }) {
  
  const {title, subtitle, buttonText, to} = props
  
  return (
    <Row>
      <Col>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <Button variant="primary" as={NavLink} to={to}>{buttonText}</Button>
      </Col>
    </Row>
  )
}

export default Banner