import React,{useState ,useContext,useEffect} from 'react';
import Pagination from './Pagination';
import CardDish from './CardDish';
import { AllMenuContext } from "./AllMenuContext"

function FilteredDishes(props) {
  let [menuCategory,setMenuCategory]=useState([])
  let [singleDish,setSingleDish]=useState([])
  let allMenus = useContext(AllMenuContext)
  let [filteredDishes,setfilteredDishes]=useState([])
// Eee useState use cheyyane nthina vecha ,namuk oro pravishyam oronnil click cheyyumbol sitel veran vendi    
  let[activeDish,setactiveDish]=useState("Beef")
  let[currentPage,setCurrentPage]=useState(1)
  let[itemsPerPage,setItemsPerPage]=useState(4)

  let indexOfLastDish = currentPage * itemsPerPage;
  // 1*4=4
  //2*4=8
  let indexOfFirstDish = indexOfLastDish - itemsPerPage;
   // 4-4=0
  let ShowTheDishesNow = filteredDishes.slice(indexOfFirstDish,indexOfLastDish);
  
  
  //Get all the categories
 

 async function getAllTheCategories(){
    const API_URL ="https://www.themealdb.com/api/json/v1/1/categories.php";
    let response = await fetch(API_URL)
    let categoryData = await response.json()
    
   setMenuCategory(categoryData.categories);
}
// Get only onedish
async function getOnlyOneDish(){
    const API_URL ="https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef";
    let response = await fetch(API_URL)
    let singleDishData = await response.json()
    setSingleDish(singleDishData.meals);
   
    

}

useEffect(()=>{
    getAllTheCategories();
    getOnlyOneDish();
}, []);



  
  //Lets show only one dish
  let maxItem =8
  let singleDishItems = singleDish.map((item,index)=>{
    if (index < maxItem){
      return (
        <li>
            <img src={item.strMealThumb} className="br-10"/>
            <h5>{item.strMeal}</h5>
        </li>
    )

    }
   
     return null;
  })
 
//eg:chicken click cheytha chicken veranam,pinne beef click cheytha beefum veranam
  // show dishes on the click
    function showFileteredDishesHandler(category){
        setSingleDish([])
        setactiveDish(category)
        let filteredDishesAre = allMenus.filter((item)=>{ 
            return item.strCategory === category
        }).map((menuItem)=>{// ivade map use cheyyanath namuk filter cheyth kittana result array formil ahnu ath matti jsx aaki sitel kanikan vendiya map use cheyyane
            return (
            <CardDish key={menuItem.idMeal} menuItem ={menuItem}/>
            )
        })
    
        setfilteredDishes(filteredDishesAre)// namuk kittiya result setstate use cheyth filtereddishesilootu aaki eniitu ath ahnu pass cheyyane
    }

//Lets show all the categories
  let allCategories = menuCategory.map((item) => {
    return (
      <li className={item.strCategory == activeDish ?"active":""} 
      onClick={()=>{showFileteredDishesHandler(item.strCategory)}} >
        {item.strCategory}
      </li>
    );
  });
//Rendering
  return (
    <div className="filtered-dishes">
      <div className="container">
        <div className="text-center">
          <h2>Choose your dishes</h2>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem doloribus ex incidunt ea voluptas iusto, nesciunt laudantium tenetur saepe id.</p>
        </div>
        <div className="filterd-dishes">
          <ul>
            {allCategories}
          </ul>
        </div>
        
        <div className="filtered-dishes-results">

            <ul className="flex flex-wrap gap-30">
                {singleDishItems}
                {singleDishItems !=0 || filteredDishes.length != 0 ? ShowTheDishesNow:
                <div className="alert">
                    <h3>Sorry,No items found. </h3>
                    <h4>Please choose another Menu </h4>
                </div> }
              
            </ul>
           
          </div>
        <Pagination 
        filteredDishes={filteredDishes}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default FilteredDishes;