// ************* Managing Orders Page at 'My Account' Here *************

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { format } from 'date-fns';
import { useEffect, useState } from "react";

interface Product {
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
    _id: string;
  products: Product[];
  totalPrice: number;
  createdAt: string;
}

export const Orders = () => {
  
  const [orders, setOrders] = useState<Order[]>([]);
  const { userId } = useAuth();

  useEffect(() => {
    // -> Fetch orders from backend
    const fetchOrders = async () => {
      try {

        const response = await fetch(`http://localhost:3003/api/v1/order/${userId}`);
        
        const {data} = await response.json();

        setOrders(data);

      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">My Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order No</TableHead>
                <TableHead>Products</TableHead>
                <TableHead className="text-right">Total Price</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="font-medium">{order._id}</TableCell>
                  <TableCell>
                    <div className="max-h-32 overflow-y-auto">
                      {order.products.map((product, index) => (
                        <div key={index} className="text-sm">
                          {product.productName} x{product.quantity} - ${product.price.toFixed(2)}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">${order.totalPrice.toFixed(2)}</TableCell>
                  <TableCell>{format(new Date(order.createdAt), 'MMM dd, yyyy')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
