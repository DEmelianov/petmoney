import {useRef} from 'react'

const renderCounter = {}

const useRenderCounter = label => {
  let count = 0
  if (Object.keys(renderCounter).includes(label)) {
    count = renderCounter[label]
  }

  const counter = useRef(count)
  counter.current++
  renderCounter[label] = counter.current
  console.log(`${label} rendered ${renderCounter[label]} times`)
}
export default useRenderCounter