import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { CiCircleRemove } from "react-icons/ci";
import { FaPenAlt } from "react-icons/fa";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { GoCheckbox } from "react-icons/go";
import swal from 'sweetalert2';
export default function Todo() {
  const [data, setData] = useState([]);
  const [info, setInfo] = useState("");
  const [editingId,setEditingId]=useState(null);
  useEffect(()=>{
    fun();
    async function fun()
    { 
      const response = await fetch("http://localhost:8000/show_todo", {
      method: "GET",
      // headers: { "Content-Type": "application/json" },
      //body:JSON.stringify({data:obj}),
   });
   if(response)
   {
      let arr=await response.json();
      setData(arr);
   }
}
  },[])
  function newdata(e) {
    // console.log(e.target.value);
    // let obj = [{ "value": e.target.value, "flag": 0, "id": Date.now() }];
    // setData([...data, ...obj]);
    // console.log(data);
    setInfo(e.target.value);
  }

  function save(e) {
    if (e.key === 'Enter') {
        if(e.target.value.trim()=="")
        {
            swal.fire({
               title:"Please Enter something",
               icon:"warning"
            })
            setInfo("");
        }
        else{

            let obj = [{ "value": e.target.value.trim(), "flag": 0, "id": Date.now() }];
            setData([...data, ...obj]);
            fun();
             async function fun()
             { 
               const response = await fetch("http://localhost:8000/savetodo", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body:JSON.stringify({data:obj}),
            });
            if(response.status!==200)
            {
               swal.fire({
                title:"something went wrong",
                icon:"warning"
               })
            }
      }
          //console.log(e.target.value + "with Enter");
          //create_todo();
          setInfo("");
        }
    }
  }
 function remove(id)
 {
  fun();
  async function fun()
  { 
    const response = await fetch("http://localhost:8000/delete_todo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body:JSON.stringify({id:id}),
 });
 if(response.status==200)
 {
  setData((data) => data.filter((d) => d.id !== id));
 }
}
    
    
 }
 
 function checked(id) {
    // console.log(id);
    fun();
    async function fun()
    { 
      const response = await fetch("http://localhost:8000/checkbox", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify({id:id}),
   });
   if(response.status==200)
   {
    setData((data) =>
    data.map((d) =>
        d.id === id?(d.flag==1?{ ...d,flag: 0 }:{ ...d, flag: 1 }):{...d}));
   }
  }
    
}
 
 function update(id) {
  setEditingId(id); 
}

function handleUpdateText(e, id) {
  
  setData((data) =>
  data.map((d) => (d.id === id ? { ...d, value: e.target.value } : { ...d }))
   );
 }

  


function saveUpdate(e,id) {
    if(e.key==='Enter')
    {
        if(e.target.value.trim()=="")
        {
          swal.fire({
            title:"Please Enter Something",
            icon:"Warning"
          })
          e.target.value="";
        }
      
        else{
          fun();
  async function fun()
  { 
    const response = await fetch("http://localhost:8000/update_todo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body:JSON.stringify({id:id,value:e.target.value.trim()}),
 });
 if(response.status==200)
 {
  // setData((data) =>
  // data.map((d) => (d.id === id ? { ...d, value: e.target.value } : { ...d }))
  //     );
          setEditingId(null);
        
    }
  }
}
}
}
  return (
    <>
      <h1 className={styles.head}>Task List</h1>
      <div className={styles.first}>
        <div className={styles.left}>
          <ul>
            {data.map((data) => (
              <li key={data.id} className={data.flag === 1 ? styles.line : ""}>
              {editingId === data.id ? ( 
                <input
                  type="text"
                  value={data.value}
                  onChange={(e) => handleUpdateText(e, data.id)}
                  onKeyUp={(e) => saveUpdate(e,data.id)}
                />
              ) : (
                <>
                  {data.value}
                  <CiCircleRemove className={styles.icon} onClick={() => remove(data.id)} />
                  <FaPenAlt className={styles.icon} onClick={() => update(data.id)} />
                  <GoCheckbox className={styles.icon} onClick={() => checked(data.id)} />
                </>
              )}
              </li>
              // <li key={data.id} className={(data.flag==1?styles.line:"")}>{data.value}<CiCircleRemove  className={styles.icon} onClick={()=>{remove(data.id)}}/><FaPenAlt  className={styles.icon} onClick={()=>{update(data.id)}}/><GoCheckbox   className={styles.icon} onClick={()=>{checked(data.id)}}/></li>
            ))}
          </ul>
        </div>
        <div className={styles.right}>
          <form>
            <textarea
              className={styles.area} rows="13" placeholder="write What you want to do..." onChange={newdata} onKeyUp={save} value={info}
            ></textarea>
          </form>
        </div>
      </div>
    </>
  );
}
