import { Mail, MapPin, Phone } from 'lucide-react';
// src/pages/Contact.jsx
import React, { useEffect, useState } from 'react';

import FloatingActions from '../components/common/FloatingActions';
import Footer from '../components/navigation/Footer';
import Navbar from '../components/navigation/Navbar';
import TopBar from '../components/navigation/Topbar';
import { getCompanyInfo } from '../api/services';

const Contact = () => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCompanyInfo();
        setCompanyInfo(data);
      } catch (err) {
        console.error("Error fetching company info:", err);
        setError("Failed to load contact information.");
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, []);

  // --- CORRECTED Map Embed URL Construction ---
  // Uses the q= parameter for address search
  const mapEmbedUrl = companyInfo?.address
    ? `http://googleusercontent.com/maps.google.com/?q=${encodeURIComponent(companyInfo.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`
    : '';
  // For production with API Key, the structure is different:
  // const mapEmbedUrlWithKey = companyInfo?.address
  //  ? `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=.../place?key=YOUR_API_KEY&q=${encodeURIComponent(companyInfo.address)}`
  //  : '';

  return (
    <div>
      <TopBar />
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gray-100 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
        <p className="mt-2 text-lg text-gray-600">Get in touch with us for any inquiries.</p>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Contact Details Section (Uses fetched data) */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Contact Information</h2>
            {loading ? (
              <p className="text-gray-500">Loading contact details...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : companyInfo ? (
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start space-x-3">
                  <MapPin className="w-6 h-6 text-[#1228e1] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block">Address:</strong>
                    <span>{companyInfo.address}</span>
                  </div>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="w-6 h-6 text-[#1228e1]" />
                  <div>
                     <strong className="block">Email:</strong>
                     <a href={`mailto:${companyInfo.email}`} className="hover:text-[#1228e1] transition-colors">
                      {companyInfo.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="w-6 h-6 text-[#1228e1]" />
                   <div>
                     <strong className="block">Phone:</strong>
                     <a href={`tel:${companyInfo.phone}`} className="hover:text-[#1228e1] transition-colors">
                      {companyInfo.phone}
                    </a>
                  </div>
                </li>
                {companyInfo.whatsapp_number && (
                  <li className="flex items-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.487 5.235 3.487 8.413 0 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.316 1.743 6.088l-.586 2.152 2.232-.583zm-1.08-2.671c-.09-.14-.473-.654-.672-.919-.196-.265-.394-.431-.617-.451-.22-.02-.48-.02-.728-.02s-.64.09-.975.314c-.335.225-1.023 1.006-1.023 2.456s1.05 2.849 1.201 3.049c.15.199 2.078 3.2 5.039 4.487 2.96 1.288 2.96 1.83 3.494 1.768 1.13-.124 1.51-.884 1.71-1.748.2-.86.2-1.601.14-.173-.06-.112-.221-.168-.465-.295-.244-.128-1.45-.715-1.672-.793-.223-.078-.385-.119-.547.119-.161.238-.633.792-.775.946-.142.154-.282.174-.527.058-.244-.116-1.033-.387-1.968-1.213-.728-.659-1.218-1.475-1.364-1.724-.146-.248-.013-.385.104-.514.108-.121.24-.304.36-.448.119-.143.161-.248.24-.413.079-.165.038-.304-.019-.423-.056-.119-.547-1.317-.751-1.804z"/></svg>
                    <div>
                      <strong className="block">WhatsApp:</strong>
                      <a href={`https://wa.me/${companyInfo.whatsapp_number}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#1228e1] transition-colors">
                        Chat with Us
                      </a>
                    </div>
                  </li>
                )}
              </ul>
            ) : (
              <p className="text-gray-500">Contact information unavailable.</p>
            )}
          </div>

          {/* Map Section (Uses constructed URL) */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Location</h2>
            {companyInfo?.address && mapEmbedUrl ? (
              <div className="aspect-w-16 aspect-h-9 border border-gray-300 rounded-lg overflow-hidden shadow-md">
                <iframe
                  src={mapEmbedUrl} // Uses the URL derived from companyInfo.address
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map showing location of ${companyInfo.address}`}
                ></iframe>
              </div>
            ) : loading ? (
                 <div className="aspect-w-16 aspect-h-9 bg-gray-200 animate-pulse rounded-lg"></div>
            ) : (
              <p className="text-gray-500">Map could not be loaded. Address might be missing or invalid.</p> // Adjusted message
            )}
          </div>

        </div>
      </div>

      <Footer />
      <FloatingActions />
    </div>
  );
};

export default Contact;