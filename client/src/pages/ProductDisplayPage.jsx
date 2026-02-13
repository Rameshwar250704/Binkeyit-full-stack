import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from "../utils/Axios"
import SummaryApi from '../common/SummaryApi'
import AddToCartButton from '../components/AddToCartButton'

const ProductDisplayPage = () => {
  const params = useParams()
  const productId = params?.product?.split("-")?.pop()

  const [data, setData] = useState({})
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchProductDetails = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: { productId }
      })

      if (response?.data?.success) {
        setData(response.data.data)
        setImage(response.data.data.image[0])
      }
    } catch (error) {
      console.log("error in product display", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (productId) fetchProductDetails()
  }, [productId])

  if (loading) return <p className="p-10">Loading...</p>

  const isOutOfStock = data?.stock === 0

  return (
    <section className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4">

        {/* COMBINED CARD */}
        <div className="bg-white rounded-2xl shadow-xl p-6 grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* IMAGE SECTION */}
          <div className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-200 p-6 flex flex-col items-center">

            {/* MAIN IMAGE */}
            <div className="w-full h-[420px] flex items-center justify-center">
              <img
                src={image}
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>

            {/* THUMBNAILS */}
            <div className="flex gap-3 mt-5">
              {data?.image?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setImage(img)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition
                    ${image === img 
                      ? "ring-2 ring-orange-500 shadow-md" 
                      : "opacity-80 hover:opacity-100"}`}
                />
              ))}
            </div>
          </div>

          {/* DETAILS SECTION */}
          <div className="flex flex-col justify-between">

            <div className="space-y-5">
              <h1 className="text-3xl font-semibold text-gray-800">
                {data?.name}
              </h1>

              {/* PRICE */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-green-600">
                  ₹{data?.price - data?.discount*data.price/100}
                </span>
                <span className="line-through text-gray-400 text-lg">
                  ₹{data?.price}
                </span>
                <span className="text-green-600 font-semibold">
                  {data?.discount}% OFF
                </span>
              </div>

              {/* STOCK */}
              {/* <p className={`font-medium ${
                isOutOfStock ? "text-red-500" : "text-green-600"
              }`}>
                {isOutOfStock ? "Out of Stock" : `In Stock (${data?.stock} left)`}
              </p> */}

              {/* DESCRIPTION */}
              <p className="text-gray-600 leading-relaxed">
                {data?.description}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="mt-6 space-y-4">
              <button
                disabled={isOutOfStock}
                className={`w-fit px-10 py-3 rounded-xl text-white text-lg font-medium transition
                  ${isOutOfStock
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-800 active:scale-95"}`}
              >
                {isOutOfStock ? "Out of Stock" : <AddToCartButton data={data}/>}
                
              </button>

              <div className="text-sm text-gray-500 space-y-1">
                <p>🚚 Delivery in 3–5 days</p>
                <p>💵 Cash on Delivery available</p>
                <p>🔄 7 Days Replacement Policy</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

export default ProductDisplayPage
