import React,{useState,useEffect} from "react"



export const AllMenuContext =React.createContext()
export const AllMenus = (props)=>{
    let [menu,setMenu]=useState([]);
    let [loading,setLoading] =useState(false);
    //get all the items from the database 
    async function getAllTheMenus(){


        setLoading(true);
        const API_URL ="https://www.themealdb.com/api/json/v1/1/search.php?f=c"
        let response = await fetch(API_URL)
        let data = await response.json()
        setMenu(data.meals);
        setLoading(false);

    }
    useEffect(()=>{
        getAllTheMenus();
    }, [])
    return (
        <AllMenuContext.Provider value={menu}>
            {!loading ? props.children: null}
          {props.children}  
          
        </AllMenuContext.Provider>
    )
}
