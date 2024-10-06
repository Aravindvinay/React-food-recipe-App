import React,{ useContext, useState } from "react"
import CardDish from "./CardDish"
import Popup from "./Popup";
import { AllMenuContext } from "./AllMenuContext"
import AddToCart from "./AddToCart";

function SpecialDishes(props){

 let [showPopup,setShowPopup]=useState(false);
 let [currentDish,setCurrentDish]=useState('')
 let [addToCartItem,setAddToCartItem]=useState([])

 const allMenus = useContext(AllMenuContext)
 
//LET'S SHOW THE POPUP
 function showPopupHandler(dishName){
   setShowPopup(true)
   setCurrentDish(dishName)

     
 }
 //LETS CLOSE THE POPUP
 function closePopupHandler(){
    setShowPopup(false)
 }
 // ADD TO CART HANDLER
 function addToCartHandler(addToCartImg,addToCartTitle){
   
   setAddToCartItem(
    [
        ...addToCartItem,
        {
            "img":addToCartImg,
            "title":addToCartTitle
        }
    ]
   );
 }

    let maxSpecialDishes=8
    let specialMenus =allMenus.map((menuItem,index)=>{
        if(index < maxSpecialDishes){
            return ( 
           <CardDish 
           menuItem={menuItem}
           showPopup={showPopupHandler}
           />
            )

        }
       

     })

    return (
        
        <section className="special-dishes">
            {showPopup  && <Popup 
            closePopup={closePopupHandler}
            currentDish={currentDish}
            addToCartHandler={addToCartHandler}
            ></Popup>}
            <div className="container">
             <AddToCart addToCartItem={addToCartItem}/>
                <div className="special-dishes-content text-center">
                    <h2>Our special dishes</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt iure recusandae dignissimos veniam, vitae ipsam quae provident mollitia autem necessitatibus repellendus? Dicta dolore facilis blanditiis?

                    </p>

                </div>
                <div className="special-dishes-list">
                    <ul className="flex flex-wrap gap-30">
                    {specialMenus}
                    

                    </ul>
                   
                </div>
            </div>
            

        </section>
    )

}
export default SpecialDishes;