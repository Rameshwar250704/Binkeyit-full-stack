import React from 'react'
import { MdEdit, MdDelete } from "react-icons/md";

const DisplayTable = () => {
  return (
    
        <div className="p-4">
  <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-200 rounded-md">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-3 py-2 text-left">#</th>
          <th className="border px-3 py-2 text-left">Sub Category Name</th>
          <th className="border px-3 py-2 text-left">Image</th>
          <th className="border px-3 py-2 text-left">Categories</th>
          <th className="border px-3 py-2 text-center">Actions</th>
        </tr>
      </thead>

      <tbody>
        {data.length === 0 && !loading && (
          <tr>
            <td colSpan="5" className="text-center py-4 text-gray-500">
              No Sub Categories Found
            </td>
          </tr>
        )}

        {data.map((item, index) => (
          <tr key={item._id} className="hover:bg-gray-50">
            {/* 1️⃣ Serial No */}
            <td className="border px-3 py-2">
              {index + 1}
            </td>

            {/* 2️⃣ Name */}
            <td className="border px-3 py-2 font-medium">
              {item.name}
            </td>

            {/* 3️⃣ Image */}
            <td className="border px-3 py-2">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-contain border rounded"
                />
              ) : (
                <span className="text-gray-400 text-sm">No Image</span>
              )}
            </td>

            {/* 4️⃣ Categories */}
            <td className="border px-3 py-2">
              <div className="flex flex-wrap gap-1">
                {item.category?.map((c) => (
                  <span
                    key={c._id}
                    className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded"
                  >
                    {c.name}
                  </span>
                ))}
              </div>
            </td>

            {/* 5️⃣ Actions */}
            <td className="border px-3 py-2 text-center">
              <div className="flex justify-center gap-3">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <MdEdit size={20} />
                </button>

                <button
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <MdDelete size={20} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
      
    </div>
  )}

export default DisplayTable
