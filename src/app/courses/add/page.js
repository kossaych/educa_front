'use client'
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import PopUp from '/src/components/general/pop-up.js'
import { VscAdd, VscDeviceCamera, VscDeviceCameraVideo, VscEdit, VscEye, VscEyeClosed, VscFile, VscFilePdf, VscGift, VscListFilter, VscListFlat, VscListOrdered, VscLock, VscMegaphone, VscScreenFull, VscScreenNormal, VscTrash, VscTriangleRight, VscWatch } from "react-icons/vsc";
import { CiTrash, CiYoutube } from "react-icons/ci";



function Register() {
  const inputStyle = "m-1 border focus:outline-none border-blue-200 rounded bg-blue-100 p-1" 
  
  const [course, setCourse] = useState({ 
    title : '',
    chapiter : '',
    status : 'unpublished',  
    levels :[] 
  });
 
  const [chapiters, setChapiters] = useState([]);

  const [selectedChapiter, setSelectedChapiter] = useState(
    {
        levels : []
    }
  );



  //////////////////// auxs ///////////////////////////////
  const [isWaiting, setIsWaiting] = useState(false);
  const [message, setMessage] = useState("");
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const [embedYoutube, setEmbedYoutube] = useState(false);
 

  const openPopUp = () => {
    setPopUpOpen(true);
  }
  const closePopUp = () => {
    setPopUpOpen(false);
  }

  ////////////////////////////////////////

    const handleCreateCourse = () => { 
    setIsWaiting(true);
    fetch("https://kossaych.pythonanywhere.com/content/api/course/", {
      method: "post",
      headers: {
         'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),
         "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    }) .then(response =>{
        setIsWaiting(false)
        if (response.status==200 ){ 
          return response.json();
        }
        else if(response.status == 400){ 
          return response.json();
        } else { 
            return 'server error try again !'
        }
    }) .then(data =>{
            if(isNaN(data)){
              setMessage(data + '!')
              setPopUpOpen(true)
            }else {
              window.location = '/courses/update/' + data
            }
      
    })}; 

   // fetch chapiters
   useEffect(()=>{
    fetch("https://kossaych.pythonanywhere.com/content/api/get_teacher_desipline_chapiters/", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),

      },
     
    })
      .then((response) => {
         if (response.status === 200) {
          return response.json();
        } else {
          setPopUpOpen(true)
          setMessage('server error try again !');
        }
      })
      .then((data) => {
        if (data) {
          setChapiters(Array(data)[0])
          
        }
      });
   ;},[])
 
   useEffect(()=>{

    for(let i=0;i<chapiters.length;i++){
        if (chapiters[i].id == course.chapiter){
            setSelectedChapiter(chapiters[i])
        }

    }
         
   ;},[course])

  const handleLevelSelection = (e) => {
 
    let HandledLevels = course.levels
    if(e.target.checked) {
      HandledLevels.push(e.target.id)
    }else{
      HandledLevels = course.levels.filter((level)=> level != e.target.id)
    }
    setCourse(prevCourse => ({
      ...prevCourse,  
      levels: HandledLevels  
    }));
 
  }
 
  return (
        <div className="text-center rounded bg-white  border    my-3 p-1 mx-3 ">
            <PopUp isOpen={isPopUpOpen} onClose={closePopUp} >
                                        <h2 className="text-red-500 w-72">{message}</h2>       
            </PopUp>  
            <div className="flex flex-wrap">
                    <div className="text-center rounded bg-white  border   w-full md:w-3/4 xl:w-2/6  my-3 p-1 mx-3 "> 

                                          <div  className="flex justify-between items-center " >
                                                              <h3 className="text-blue-500 text-2xl font-bold">course</h3>
                                                            {course.status == 'published' ?<div className=" bg-emerald-100  rounded-md p-1 m-0.5  flex items-center" onClick = {(e) => setCourse({ ...course, ['status']: 'unpublished' }) } >
                                                              <VscEye size ={25}  ></VscEye>
                                                              <span className="m-1">published </span> 
                                                            </div> 
                                                            :<div className=" bg-emerald-100  rounded-md p-1 m-0.5  flex items-center" onClick = {(e) => setCourse({ ...course, ['status']: 'published' }) } >
                                                              <VscEyeClosed size={25}></VscEyeClosed>
                                                              <span className="m-1"> unpublished </span> 
                                                            </div> }
                                          </div>
  
                                          <div className="grid grid-cols-1 ">                     
                                                        <input className={inputStyle}  type="text"   placeholder="Titre" onChange = {(e) => setCourse({ ...course, ['title']: e.target.value }) }  />  
                  
                                                        <select  className={inputStyle}    id='chapiter'         onChange = {(e) => setCourse({ ...course, ['chapiter']: e.target.value }) }   >
                                                                <option>chapiter</option>
                                                                {chapiters.map(o => (
                                                                    <option key={o.id} value={o.id}>{o.title}</option>
                                                                ))}    
                                                        </select> 
                                          </div> 
 
                                    <div className="border border-black rounded">
                                            <h3> selectionez les niveaux qui peuvent voir ce cour</h3>
                                            <div    className="  h-28 rounded overflow-scroll">
                                                        {selectedChapiter.levels.map(level => (
                                                              <div key={level.id} className="flex items-center justify-center">
                                                                <input type="checkbox" class="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700" key={level.id} id={level.id} onClick={(e) => {handleLevelSelection(e)}} />  {level.title} 
                                                              </div>
                                                           
                                                            ))}
                                                         
                                            
                                            </div>
                                            <button    className="  "  > <CiTrash></CiTrash></button><br></br>  
                                    </div> 

                    </div>  
            </div> 
            <div>
                <div className="text-center grid grid-cols-1 place-items-center">
                                                    {isWaiting === false ? (
                                                      <button className="border rounded-md h-10   bg-blue-600 p-1 text-white w-1/2" onClick={handleCreateCourse} >
                                                          Ajouter
                                                      </button>
                                                    ) : (
                                                      <button disabled className="rounded border   bg-gray-600 text-white p-1" >
                                                        <div className="max-h-10">
                                                            <div  className="w-8 h-8 border-4   border-dashed rounded-full animate-spin m-auto"></div>
                                                        </div>
                                                      </button>
                                                    )} 
                </div>      

            </div>
        </div>

  ); 

}

export default Register;
