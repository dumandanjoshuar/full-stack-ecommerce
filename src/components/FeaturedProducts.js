import { useEffect, useState } from "react"
import PreviewProducts from "./PreviewProducts"
import { CardGroup } from "react-bootstrap"


function FeaturedProducts() {
  
  const [previews, setPreviews] = useState([])
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/all-active`)
      .then(res => res.json())
      .then(data => {
        
        const featured = []
        const numbers = []
        const generateRandomNumbers = () => {
          
          let randomNum = Math.floor(Math.random() * data.length)
          
          if (numbers.indexOf(randomNum) === -1) {
            numbers.push(randomNum)
          } else {
            generateRandomNumbers()
          }
        }
        
        for (let i = 0; i < 6; i++) {
          generateRandomNumbers()
          
          featured.push(<PreviewProducts data={data[numbers[i]]} key={data[numbers[i].id]} />)
        }
        
        setPreviews(featured)
    })
  }, [])
  
  return (
    <>
      <h2 className="text-center">Featured Products</h2>
      <CardGroup className="justify-content-center">
        {previews}
      </CardGroup>
    </>
  )
}

export default FeaturedProducts