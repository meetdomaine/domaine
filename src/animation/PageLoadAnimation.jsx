import { children, mergeProps } from "solid-js";

export default function PageLoadAnimation(props) {

  const childElements = children(() => props.children)
  // const elements = Array.from(childElements())

  for (let i = 0; i <= childElements().length; i++) {
    console.log(childElements()[i])
  }

  console.log(childElements())

  // childElements.forEach((element) => {
  //   console.log(element)
  // })

  // console.log(elements)

}