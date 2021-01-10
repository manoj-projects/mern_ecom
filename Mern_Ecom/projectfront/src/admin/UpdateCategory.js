import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import Base from '../core/Base';
import {getCategories, updateCategory} from './helper/adminapicall'


const UpdatedCategory = ({match}) => {

   const [name, setName] = useState("");
   const [error,setError] = useState(false);
   const [success, setSuccess] = useState(false);
   const {user, token} = isAutheticated();

   const [values, setValues] = useState({
    name: "",
    formData: ""
  });
  
   const preload = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        setValues({
          
          name:data.name,
          formData: new FormData()
        });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

   const goback =()=>(
      <div className="mt-5">
<Link className="btn btn-sm btn-dark mb-3" to="/admin/dashboard">Admin Home</Link>
     </div>
   )

   const handleChange = (event) =>{
       setError("")
       setName(event.target.value)
   }
const onSubmit = (event) =>{
    event.preventDefault();
    setError("");
    setSuccess(false);

    updateCategory(user._id, token, {
        name
    }).then(
        data => {
            if (data.error) {
                setError(true)
            } else {
                setError("");
                setSuccess(true);
                setName("");
            }
        }
    )
}
const successMessage=()=>{
    if(success){
        return <h4 className="text-success">Category created successfully</h4>
    }
}
const warningMessage=()=>{
    if(error){
        return <h4 className="text-warning">Category failed to create</h4>
    }
}

  




   const myCategoryForm = () =>(
       <form>
           <div className="form-group">
               <p className="lead text-primary">Enter the category</p>
               <input type="text" onChange={handleChange} className="form-control my-3" autoFocus required
               placeholder="For Ex. Summer" value={name} />

               <button onClick={onSubmit} className="btn btn-outline-info">Update Category</button>
           </div>
       </form>
   )


    return (
     <Base title="Create a category here" description="
     Add a category for new t-shirts"> 
     
     <div className="container bg-info p-4 ">
         <div className="row bg-white rounded">
             <div className="col-md-8 offset-2">
                 {successMessage()}
                 {warningMessage()}
             {myCategoryForm()} {goback()}
            </div>)
         </div>
     </div>
     
     </Base>
    );
}

export default UpdatedCategory;
