import React from 'react';
import NavigationBar from '../components/NavigationBar';
import { IoLocationOutline, IoMailOutline, IoPhonePortraitOutline } from 'react-icons/io5';
import Footer from '../components/Footer';
const ContactUs = () => {
    return (
        <div>
            {/* Navigation Bar */}
            <NavigationBar />

            {/* Contact Information Section */}
            
            <section className="bg-gray-100 py-12">
                <div className="container mx-auto">
                <br></br><br></br><br></br><br></br><br></br><br></br>
                    <div className="max-w-3xl mx-auto text-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-800">Contact Us</h2>
                        <p className="text-lg text-gray-600 mt-2">Get in touch with Ever Green Tea</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Location */}
                        <div className="flex flex-col items-center">
                            <IoLocationOutline className="text-4xl text-green-600 mb-4" />
                            <h3 className="text-xl font-bold text-gray-800">Location</h3>
                            <p className="text-gray-600">132/A Colombo, Srilanka<br />EVER GREEN TEA</p>
                        </div>
                        {/* Email */}
                        <div className="flex flex-col items-center">
                            <IoMailOutline className="text-4xl text-green-600 mb-4" />
                            <h3 className="text-xl font-bold text-gray-800">Email</h3>
                            <p className="text-gray-600">evergreen-tea@gmail.com</p>
                        </div>
                        {/* Phone */}
                        <div className="flex flex-col items-center">
                            <IoPhonePortraitOutline className="text-4xl text-green-600 mb-4" />
                            <h3 className="text-xl font-bold text-gray-800">Phone</h3>
                            <p className="text-gray-600">+94766738383</p>
                        </div>
                    </div>
                </div>
                <br></br><br></br><br></br><br></br><br></br><br></br>
            </section>

            {/* Social Media Section */}
            <section className="bg-green-600 text-white py-12">
                <div className="container mx-auto text-center">
                <br></br><br></br><br></br>
                    <h2 className="text-4xl font-bold mb-6">Follow Us on Facebook</h2>
                    <p className="text-lg mb-8">Stay updated with our latest news and updates on Facebook.</p>
                    <a
                        href="https://m.facebook.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-white py-2 px-4 text-green-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                    >
                        Follow Us
                    </a>
                </div>
            </section>

            {/* Footer */}
            <Footer />
            
        </div>
    );
};

export default ContactUs;
