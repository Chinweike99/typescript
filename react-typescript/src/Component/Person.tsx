import React from 'react'

type PersonInfo = {
    names:{
      first: string
      last:string
    }[]
  }
  

export const Person = ({names}: PersonInfo) => {

    
  return (
    <div>
        <div>
        {
          names.map((nam) =>{
              return (
                  <h2 key={nam.first}>{nam.last} {nam.first}</h2>
              )
          })
        }
      </div>
    </div>
  )
}
