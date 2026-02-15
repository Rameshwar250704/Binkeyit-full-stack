import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/uploadImage";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useDispatch } from "react-redux";


const UploadCategoryModel = ({ close, fetchData }) => {
  const [data, setData] = useState({
    name: "",
    image: "",
  });

  const dispatch=useDispatch()

  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ ADD CATEGORY
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.addCategory,
        data:data
      });

      if (response.data.success) {
        toast.success(response.data.message);
        close();
        fetchData();
      }
    } catch (error) {
      console.log("error in unknown")
    } finally {
      setLoading(false);
    }
  };
  

  // ✅ UPLOAD IMAGE (CLOUDINARY FIXED)
  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try { 
      setLoading(true);

      // uploadImage RETURNS res.data
      const response = await uploadImage(file);
      console.log("CLOUDINARY RESPONSE 👉", response);

      // ✅ SAFELY GET URL (Cloudinary uses secure_url)
      const imageUrl =
        response?.data?.data?.secure_url 

      if (!imageUrl) {
        toast.error("Image uploaded but URL not found");
        return;
      }

      setData((prev) => ({
        ...prev,
        image: imageUrl,
      }));
      
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="fixed inset-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center">
      <div className="bg-white max-w-4xl w-full p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Category</h1>
          <button onClick={close}>
            <IoClose size={25} />
          </button>
        </div>

        <form className="my-3 grid gap-3" onSubmit={handleSubmit}>
          {/* CATEGORY NAME */}
          <div className="grid gap-1">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter category name"
              value={data.name}
              name="name"
              onChange={handleOnChange}
              className="bg-blue-50 p-2 border rounded outline-none"
            />
          </div>

          {/* IMAGE UPLOAD */}
          <div className="grid gap-2">
            <p>Image</p>

            <div className="flex gap-4 flex-col lg:flex-row items-center">
              <div className="border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded">
                {data.image ? (
                  <img
                    src={data.image}
                    alt="category"
                    className="w-full h-full object-scale-down"
                  />
                ) : (
                  <p className="text-sm text-neutral-500">No Image</p>
                )}
              </div>

              <label htmlFor="uploadCategoryImage">
                <div
                  className={`px-4 py-2 rounded cursor-pointer border font-medium ${
                    !data.name
                      ? "bg-gray-300"
                      : "border-yellow-200 hover:bg-yellow-100"
                  }`}
                >
                  Upload Image
                </div>

                <input
                  type="file"
                  id="uploadCategoryImage"
                  className="hidden"
                  disabled={!data.name}
                  onChange={handleUploadCategoryImage}
                />
              </label>
            </div>
          </div>

          {/* SUBMIT */}
          <button
            disabled={!data.name || !data.image || loading}
            className={`py-2 font-semibold rounded ${
              data.name && data.image
                ? "bg-primary-200 hover:bg-primary-100"
                : "bg-gray-300"
            }`}
           > 
            {loading ? "Please wait..." : "Add Category"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadCategoryModel;
