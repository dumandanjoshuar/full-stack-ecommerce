import Banner from "../components/Banner"
import FeaturedProducts from "../components/FeaturedProducts"
import { Container } from "react-bootstrap"


export default function Home() {
  
  const props = {
    title: "Welcome to Stockfinity!!!",
    subtitle: "All products that are available have infinite supply!",
    buttonText: "SHOP NOW!",
    to: "/products"
  }
  
  return (
    <>
      <Container className="text-center">
      <Banner props={props} className="text-center" />
      </Container>
      <FeaturedProducts />
      </>
  )
}