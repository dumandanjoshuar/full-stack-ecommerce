import { Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"



function PreviewProducts({data}) {
  
  const { _id, name, description, price } = data
  
  return (
    <Col sm={6} md={4} className="my-3">
      <Card className="cardHighlights mx-2">
        <Card.Body>
          <Card.Title>
            <Link to={`/products/${_id}`}>{name}</Link>
          </Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <h5 className="text-center">PHP {price}</h5>
          <Link className="btn btn-primary d-block" to={`/products/${_id}`}>Buy</Link>
        </Card.Footer>
      </Card>
    </Col>
  )
}

export default PreviewProducts