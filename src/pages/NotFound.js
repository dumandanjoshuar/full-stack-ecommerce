import Banner from "../components/Banner"


function NotFound() {
  const props = {
    title: "Page not found",
    subtitle: "Go back to the page",
    buttonText: "homepage",
    to: "/"
  }
  
  return (
    <Banner props={props} />
  )
}

export default NotFound