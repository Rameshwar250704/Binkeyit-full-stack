import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast';
import fetchUserDetails from './utils/fetchUserDetails';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { setAllCategory,setAllSubCategory,setLoadingCategory } from './store/productSlice';
import { setUserDetails } from './store/userSlice';
import Axios from './utils/Axios';
import SummaryApi from './common/SummaryApi';
import { handleAddItemCart } from './store/cartProduct';
import GlobalProvider from './provider/GlobalProvider';

function App() {
  const dispatch=useDispatch()

  const fetchuser= async ()=>{
    
     const userData= await fetchUserDetails()
     dispatch(setUserDetails(userData?.data?.data))
  }


   const fetchCategory=async()=>{
      try {
        dispatch(setLoadingCategory(true))
       
        const response=await Axios({
          ...SummaryApi.getCategory
        })

       const categoryList = response?.data
       if(categoryList.success){
        console.log("category list",categoryList.data)
        dispatch(setAllCategory(categoryList.data))
        // setcategoryData(categoryList.data)
       }

       
      

        
      } catch (error) {
        
      } finally{dispatch(setLoadingCategory(false))
      }
    }

    const fetchsubCategory=async()=>{
      try {
       
        const response=await Axios({
          ...SummaryApi.getSubCategory
        })

       const subcategoryList = response?.data
       if(subcategoryList.success){
        
        dispatch(setAllSubCategory(subcategoryList.data))
        // setsubcategoryData(categoryList.data)
       }

       
      

        
      } catch (error) {
        
      } finally{
      }
    }
    
    


  useEffect(()=>{
    fetchuser()
    fetchCategory()
    fetchsubCategory()
    
  },[])

  return (
    <GlobalProvider>  
    <Header />   {/* 🔥 Added background to test visibility */}
     <main className='min-h-[80vh] bg-blue-50'>
      <Outlet />
    </main>
    <Footer />   {/* 🔥 Footer will have visible gray bg */}
    <Toaster/>
    <div>
      
    </div>
    </GlobalProvider>
  )
}

export default App
