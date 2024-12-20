import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from "../src/contexts/AuthContext"
import Product from "./components/Product/main";
import AddProduct from "../src/components/Product/ProductControls/AddProduct";
import EditProduct from "../src/components/Product/ProductControls/EditProduct";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const RouterComponent = () => {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<Product />} />
      
      {/* Protected routes */}
      <Route
        path="/add-product"
        element={
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-product"
        element={
          <ProtectedRoute>
            <EditProduct />
          </ProtectedRoute>
        }
      />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default RouterComponent;