import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5"
import uploadImage from '../utils/uploadImage'
import { useSelector } from 'react-redux'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import toast from 'react-hot-toast'

const UploadSubCategoryModel = ({ close, fetchData }) => {

  const [subCategoryData, setsubCategoryData] = useState({
    name: "",
    image: "",
    category: []
  })

  const allCategory = useSelector(
    (state) => state.product.allCategory
  )

  const HandleChange = (e) => {
    const { name, value } = e.target
    setsubCategoryData((preve) => ({
      ...preve,
      [name]: value
    }))
  }

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      const response = await uploadImage(file)
      const imageUrl = response?.data?.data?.secure_url

      if (!imageUrl) {
        toast.error("Image uploaded but URL not found")
        return
        fetchData()
      }

      setsubCategoryData((preve) => ({
        ...preve,
        image: imageUrl
      }))
    } catch (error) {
      console.log("error callas")
    }
  }

  const handleSubmitSubCategory = async (e) => {
    e.preventDefault()
    try {
      const response = await Axios({
        ...SummaryApi.createSubCategory,
        data: subCategoryData
      })

      if (response.data.success) {
        toast.success(response?.data.message)
         fetchData()
        close()
      }
    } catch (error) {
      console.log("error in unknown")
    }
  }
  useEffect(() => {
  fetchData();
}, []);


  return (
    <section className="fixed inset-0 bg-neutral-800/70 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-4 border-b">
          <h1 className="font-semibold text-lg">Add Sub Category</h1>
          <button onClick={close}>
            <IoClose size={24} />
          </button>
        </div>

        {/* BODY */}
        <form className="p-4 grid gap-4" onSubmit={handleSubmitSubCategory}>

          {/* NAME */}
          <div className="grid gap-1">
            <label htmlFor="name">Sub Category Name</label>
            <input
              id="name"
              name="name"
              value={subCategoryData.name}
              onChange={HandleChange}
              className="p-3 bg-blue-50 border rounded outline-none focus:border-amber-400"
            />
          </div>

          {/* IMAGE */}
          <div className="grid gap-2">
            <p>Image</p>

            <div className="flex flex-col lg:flex-row gap-4 items-start">
              <div className="border h-36 w-full lg:w-36 bg-blue-50 flex items-center justify-center rounded">
                {!subCategoryData.image ? (
                  <p className="text-sm text-gray-400">No image</p>
                ) : (
                  <img
                    src={subCategoryData.image}
                    alt="subcategory"
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              <label htmlFor="uploadSubCategoryImage">
                <div className="px-5 py-2 border-2 border-yellow-400 text-yellow-500 font-semibold rounded-md cursor-pointer hover:bg-yellow-500 hover:text-yellow-50 transition">
                  Upload Image
                </div>
                <input
                  type="file"
                  id="uploadSubCategoryImage"
                  className="hidden"
                  onChange={handleUploadSubCategoryImage}
                />
              </label>
            </div>
          </div>

          {/* CATEGORY */}
          <div className="grid gap-2" >
            <label>Select Category</label>

            <div className="flex flex-wrap gap-2">
              {subCategoryData?.category?.map((cat) => (
                <div
                  key={cat._id}
                  className="flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
                >
                  <span>{cat.name}</span>
                  <button
                    type="button"
                    className="font-bold hover:text-red-500"
                    onClick={() =>
                      setsubCategoryData((prev) => ({
                        ...prev,
                        category: prev.category.filter(
                          (c) => c._id !== cat._id
                        )
                      }))
                    }
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <select
              className="bg-blue-50 border p-2 rounded"
              onChange={(e) => {
                const value = e.target.value
                if (!value) return

                const categoryDetails = allCategory.find(
                  (c) => c._id === value
                )

                if (
                  subCategoryData.category.some(
                    (c) => c._id === categoryDetails._id
                  )
                ) return

                setsubCategoryData((prev) => ({
                  ...prev,
                  category: [...prev.category, categoryDetails]
                }))
              }}
            >
              <option value="">Select Category</option>
              {allCategory.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className={`px-6 py-2 rounded font-semibold transition
              ${
                subCategoryData.name &&
                subCategoryData.image &&
                subCategoryData.category.length > 0
                  ? "bg-yellow-400 text-white hover:bg-yellow-500"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            Submit
          </button>

        </form>
      </div>
    </section>
  )
}

export default UploadSubCategoryModel
