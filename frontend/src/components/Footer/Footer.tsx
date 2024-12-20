export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              About Us
            </h3>
            <p className="text-gray-600">
              Your trusted online shopping destination for quality products.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Contact
            </h3>
            <p className="text-gray-600">Email: support@eshop.com</p>
            <p className="text-gray-600">Phone: (555) 123-4567</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Twitter
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Facebook
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>&copy; 2024 Mert Topcu - NewMind AI - All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
