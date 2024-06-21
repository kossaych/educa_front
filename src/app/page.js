'use client' 
import HomeLogedIn from "@/components/Home components/home_loged_in";   
import Login from "./(authentification)/login/page";
export default function Home() { 
  
  if (typeof window !== "undefined") { 
        if (localStorage.getItem('token') ) {  
            return ( 
                  <HomeLogedIn></HomeLogedIn> 
              )
        }
        else{
            return ( 
              <div> 
                    <Login></Login>
              </div>
            )
        }
  }
 

}
