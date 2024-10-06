import React ,{useState, useEffect} from "react"
import Hero from "./Hero";
import SpecialDishes from "./SpecialDishes"
import FilteredDishes from "./FilteredDishes";
import Header from "./Header";
import {AllMenus} from "./AllMenuContext";
// CREATE A GLOBAL CONTEXT THAT CANBE SHARED TO ITS CHILDREN

function Menus(){ 
   return (
    <div>
        <Header/>
        <Hero />
        <AllMenus>
            <SpecialDishes/>
            <FilteredDishes />
        </AllMenus>
               

     </div>
      
    );
}
export default Menus