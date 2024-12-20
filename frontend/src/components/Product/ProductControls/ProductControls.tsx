import { Search, Plus, Edit, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const ProductControls = ({ searchTerm, onSearchChange }: ProductControlsProps) => {


  
  return (

    <div className="flex flex-col sm:flex-row justify-center items-center mb-8 gap-4">
      
      <div className="flex space-x-2">
        <Link to="/add-product">
          <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Product
          </button>
        </Link>
        
        <Link to="/edit-product">
        <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50 flex items-center gap-2">
          <Edit className="h-4 w-4" /> Edit
        </button>
        </Link>
        
        <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50 flex items-center gap-2">
          <Trash className="h-4 w-4" /> Delete
        </button>
      </div>
      
      <div className="relative w-full sm:w-64">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
      </div>

    </div>
  );
};