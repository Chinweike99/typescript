import React from 'react'
type slautation = {
  name: string;
}


const Salute = (props: slautation) => {
  return (
    <div>Hello and welcome {props.name}
      
    </div>

  )
}

export default Salute