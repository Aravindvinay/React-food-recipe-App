import React, { useLayoutEffect } from 'react'

function Pagination(props) {
    

    let numberOfPages = []
    for(let i=1;i<=Math.ceil(props.filteredDishes.length/props.itemsPerPage);i++){
        numberOfPages.push(i)
        
    }
   function showNextDishesHandler(event){
    let currentPage = event.target.id
    props.setCurrentPage(currentPage)
       
   }
    let Pages=numberOfPages.map((pageNumber)=>{
        return (
            <li id={pageNumber} onClick={showNextDishesHandler}>{pageNumber}</li>
        )
    })
  return (
    <section>
    <ul className="pagination flex">
      {Pages}
    </ul>
    </section>
  )
}

export default Pagination