import React, { useState } from 'react'
import { MdCloudUpload, MdDelete } from "react-icons/md";
import uploadImage from '../utils/uploadImage';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToasrError from "../utils/AxiosToastError"
import successAlert from '../utils/SuccessAlert';

const UploadProduct = () => {
  const [data,setData]=useState({
    name:"",
    image:[],
    category:[],
    subCategory:[],
    unit:"",
    stock:"",
    price:"",
    discount:"",
    description:"",
    more_details:{},
    

  })
  const [imageloading,setimageLoading]=useState(false)

  const [selectCategory,setSelectCategory]=useState("")
  const [selectSubCategory,setSelectSubCategory]=useState("")
  const allSubCategory=useSelector(state=>state.product.allSubCategory)

  const handleChange = (e) => {
  const { name, value } = e.target
  setData((prev) => ({
    ...prev,
    [name]: value
  }))
}




  const handleUploadImage=async (e)=>{
    const file=e.target.files[0]
    if(!file){
      return
    }
    setimageLoading(true)
     const response = await uploadImage(file)
      console.log("CLOUDINARY RESPONSE 👉", response)

      // ✅ SAFELY GET URL (Cloudinary uses secure_url)
      const imageUrl =
        response?.data?.data?.secure_url 

      

      setData((preve) => {
        return{
          ...preve,
        image: [...preve.image,imageUrl]
        }
        
      })
      setimageLoading(false)

    console.log("file",file)
  }

  const handleDeleteImage=async(index)=>{
    data.image.splice(index,1)
    setData((preve)=>{
      return{
      ...preve
      }
    })
  }

  const allCategory=useSelector(state=>state.product.allCategory)

  const handleRemoveCategory=async(index)=>{
    data.category.splice(index,1)
    setData((preve)=>{
      return{
        ...preve
    }
    })

  }
  const handleRemoveSubCategory=async(index)=>{
    data.subCategory.splice(index,1)
    setData((preve)=>{
      return{
        ...preve
    }
    })

  }
const handleSubmit=async(e)=>{
  e.preventDefault()

 try {
  
  const response=await Axios({
    ...SummaryApi.createProduct,
    data:data
  })
  
  if(response.data.success){
    successAlert(response.data.message)
    
  }

 } catch (error) {
  console.log("error yat ahe ")
  AxiosToasrError(error)

  
 }

}

  return (
   <section>
    <div className='p-2 font-semibold shadow-md flex items-center justify-between'>
      <h2>upload product</h2>
      
      
    </div>
    <div className="grid p-4">
      <form className='grid gap-2' onSubmit={handleSubmit}>
        <div className='grid gap-1'>
          <label className="font-semibold" htmlFor='name'>Name</label>
          <input
          type="text"
          placeholder="Enter Product Name"
          name="name"
          value={data.name}
          onChange={handleChange}
          required

          className="
                          w-full
                          px-3 py-2
                          border border-gray-300
                          rounded-md
                          text-gray-900
                          placeholder-gray-400
                          focus:outline-none
                          focus:ring-2 focus:ring-yellow-400
                          focus:border-yellow-400
                          transition-all duration-200
                        "
          />
        </div>
        <div className='grid gap-1'>
          <label className="font-semibold"  htmlFor='name'>Description</label>
          <textarea
          id='description'
          type="text"
          placeholder="Enter Product discription"
          name="description"
          value={data.description}
          onChange={handleChange}
          required
          multiline
          className="
                          w-full
                          
                          px-3 py-2
                          border border-gray-300
                          rounded-md
                          text-gray-900
                          placeholder-gray-400
                          focus:outline-none
                          focus:ring-2 focus:ring-yellow-400
                          focus:border-yellow-400
                          transition-all duration-200 resize-none
                        "
          />
        </div>
        <div>
          <p className="font-semibold" >image</p>
          <div>
            <label htmlFor='productImage' className='bg-blue-100 h-24 brder rounded flex justify-center items-center '>
            <div className=''>
              {
                imageloading?<Loading/>:(
                  <>
                   <MdCloudUpload
                    size={50}/>
                    <p>upload image</p></>

                )
              }
             
            </div>
            <input
            type="file"
            id='productImage'
            className='hidden'
            onChange={handleUploadImage}
            />
          </label>
           {/* display an image  */}
           <div className='mt-4 flex flex-wrap gap-4'>
            {
              data.image.map((img,index)=>{
                return(
                  <div key={img+index} className='h-20 w-20 relative bg-blue-100'>
                    <img
                    src={img}
                    alt={img}
                    className='w-full h-full object-scale-down cursor-pointer '/>
                    <div onClick={()=>handleDeleteImage(index)} className='absolute bottom-1 right-0 p-1 bg-red-500 hover:bg-red-700 rounded text-white '>
                      <MdDelete/>
                      </div>
                  </div>
                )
              })
            }
           </div>
          </div>
         
        </div>
        <div className='grid gap-1'>
          <label className="font-semibold" >Category</label>
          <div>
          <select 
          value={selectCategory}
          onChange={(e)=>{
            const value=e.target.value
            const category=allCategory.find(e1=>e1._id===value)
            console.log(category)

            setData((preve)=>{
              return{
                ...preve,
                category:[...preve.category,category]
              }
            })
            setSelectCategory("")
          }}
          
          
            >
            <option value={""}>Select  Category</option>
            {
              allCategory.map((c,index)=>{
                return(
                  <option value={c?._id}>{c.name}</option>
                )
              })

            }
          </select>
          <div className='flex flex-wrap gap-3'>
            {
            data.category.map((c,index)=>{
              return(
                <div key={c._id+index+"allCategory"} className='text-sm flex items-center gap-2 mt-2 bg-blue-50 rounded'>
                  <p>{c.name}</p>
                  <div className='hover:text-red-800 cursor-pointer ' onClick={()=>handleRemoveCategory(index)}>
                  <button >x</button>
                  </div>
                </div>
              )
            })
          }
          </div>
          </div>
        </div>
        <div>
          <div className='grid gap-1'>
          <label className="font-semibold" >Sub_Category</label>
          <div>
          <select 
          value={selectSubCategory}
          onChange={(e)=>{
            const value=e.target.value
            const subCategory=allSubCategory.find(e1=>e1._id===value)
            console.log(subCategory)

            setData((preve)=>{
              return{
                ...preve,
                subCategory:[...preve.subCategory,subCategory]
              }
            })
            setSelectSubCategory("")
          }}
          
          
            >
            <option value={""}>Select Sub_Category</option>
            {
              allSubCategory.map((c,index)=>{
                return(
                  <option value={c?._id}>{c.name}</option>
                )
              })

            }
          </select>
          <div className='flex flex-wrap gap-3'>
            {
            data.subCategory.map((c,index)=>{
              return(
                <div key={c._id+index+"allCategory"} className='text-sm flex items-center gap-2 mt-2 bg-blue-50 rounded'>
                  <p>{c.name}</p>
                  <div className='hover:text-red-800 cursor-pointer ' onClick={()=>handleRemoveSubCategory(index)}>
                  <button >x</button>
                  </div>
                </div>
              )
            })
          }
          </div>
          </div>
        </div>
        </div>
        <div className='grid gap-1'>
          <label className="font-semibold"  htmlFor='name'>Unit</label>
          <input
          id='unit'
          type="text"
          placeholder="Enter Product Unit"
          name="unit"
          value={data.unit}
          onChange={handleChange}
          required

          className="
                          w-full
                          px-3 py-2
                          border border-gray-300
                          rounded-md
                          text-gray-900
                          placeholder-gray-400
                          focus:outline-none
                          focus:ring-2 focus:ring-yellow-400
                          focus:border-yellow-400
                          transition-all duration-200
                        "
          />
        </div>
        <div className='grid gap-1'>
          <label className="font-semibold"  htmlFor='name'>Number of stock</label>
          <input
          id='stock'
          type="number"
          placeholder="Enter Product stock"
          name="stock"
          value={data.stock}
          onChange={handleChange}
          required

          className="
                          w-full
                          px-3 py-2
                          border border-gray-300
                          rounded-md
                          text-gray-900
                          placeholder-gray-400
                          focus:outline-none
                          focus:ring-2 focus:ring-yellow-400
                          focus:border-yellow-400
                          transition-all duration-200
                        "
          />
        </div>
        <div className='grid gap-1'>
          <label className="font-semibold" htmlFor='name'>Price</label>
          <input
          id='price'
          type="number"
          placeholder="Enter Product price"
          name="price"
          value={data.price}
          onChange={handleChange}
          required

          className="
                          w-full
                          px-3 py-2
                          border border-gray-300
                          rounded-md
                          text-gray-900
                          placeholder-gray-400
                          focus:outline-none
                          focus:ring-2 focus:ring-yellow-400
                          focus:border-yellow-400
                          transition-all duration-200
                        "
          />
        </div>
        <div className='grid gap-1'>
          <label className="font-semibold" htmlFor='name'>Discount</label>
          <input
          id='discount'
          type="number"
          placeholder="Enter Product discount"
          name="discount"
          value={data.discount}
          onChange={handleChange}
          required

          className="
                          w-full
                          px-3 py-2
                          border border-gray-300
                          rounded-md
                          text-gray-900
                          placeholder-gray-400
                          focus:outline-none
                          focus:ring-2 focus:ring-yellow-400
                          focus:border-yellow-400
                          transition-all duration-200
                        "
          />
        </div>
        <button className='bg-yellow-300 hover:bg-amber-200 rounded'>submit</button>


      </form>
    </div>
    </section>
  )
}

export default UploadProduct
