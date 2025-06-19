import React from 'react'

const Database = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">ANPR Recognition Database</h1>
      
      {/* Download and Upload in one row */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Download Section */}
        <div className="bg-white rounded-lg shadow-md p-6 flex-1">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Download Database</h2>
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors">
            Export Database
          </button>
        </div>
        
        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-md p-6 flex-1">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Upload Database</h2>
          <div className="flex items-center">
            <input
              type="file"
              className="hidden"
              id="database-upload"
              accept=".jpeg,.jpg,.png"
            />
            <label
              htmlFor="database-upload"
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded cursor-pointer mr-4 transition-colors"
            >
              Choose File
            </label>
            <span className="text-gray-500 text-sm">No file chosen</span>
          </div>
        </div>
      </div>
      
      {/* Database Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left font-medium text-gray-700">ID</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Name</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Time Upload</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Time Modified</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Images</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { id: 6, name: 'john', upload: '19:24:12', modified: '19:24:12', type: '.jpeg' },
                { id: 5, name: 'clark', upload: '19:24:10', modified: '19:24:10', type: '.jpeg' },
                { id: 4, name: 'jenny', upload: '19:24:09', modified: '19:24:09', type: '.jpeg' },
                { id: 3, name: 'hurry', upload: '19:24:08', modified: '19:24:08', type: '.jpeg' },
                { id: 2, name: 'chris', upload: '19:24:06', modified: '19:24:06', type: '.jpeg' },
                { id: 1, name: 'both', upload: '19:24:03', modified: '19:24:03', type: '.jpeg' },
              ].map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{item.id}</td>
                  <td className="py-3 px-4">{item.name}</td>
                  <td className="py-3 px-4">{item.upload}</td>
                  <td className="py-3 px-4">{item.modified}</td>
                  <td className="py-3 px-4">💬</td>
                  <td className="py-3 px-4">{item.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Database
