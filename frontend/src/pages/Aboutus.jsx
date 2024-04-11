import React from 'react';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
const AboutUS = () => {
    return (
        <div>
            {/* Navigation Bar */}
            <NavigationBar />

            {/* About Us Section */}
            <section className="bg-gray-100 py-12">
            <div className="rounded-full flex justify-center">
                                    <img src="./public/images/logo.png" alt="Community" className="h-16" />
                                </div>
                <div className="container mx-auto">
                    <div className="max-w-3xl mx-auto text-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-800">About Us</h2>
                        <p className="text-lg text-gray-600 mt-2">Discover the story of Ever Green Tea Factory</p>
                        
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Image */}
                        <div className=" justify-center  ">
                            <img src="./public/images/about.png" alt="About Us" className="rounded-lg " />
                        </div>
                        {/* Text */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Ever Green Tea Factory was founded in the lush valleys of Green Valley, where the climate
                                and environment are perfect for cultivating the finest tea leaves. With a passion for
                                quality and sustainability, we have been producing premium tea for over a decade.
                            </p>
                            <p className="text-gray-600 leading-relaxed mt-4">
                                Our commitment to eco-friendly practices and ethical sourcing sets us apart. We work
                                closely with local farmers and communities to ensure fair trade and support the
                                environment.
                            </p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Our Mission</h3>
                            <p className="text-gray-600 leading-relaxed">
                                At Ever Green Tea Factory, our mission is simple: to provide tea lovers around the world
                                with the highest quality, organic tea products. We believe that every cup of tea should
                                be a delightful experience, from the first sip to the last.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-green-600 text-white py-12">
                <div className="container mx-auto">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6">Our Values</h2>
                        <p className="text-lg mb-8">
                            Our core values guide everything we do at Ever Green Tea Factory. They are the foundation
                            of our business and the principles that drive us forward.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="flex flex-col items-center">
                                <div className="rounded-full bg-white p-3">
                                    <img src="./public/images/Sustainability.png" alt="Sustainable" className="h-16" />
                                </div>
                                <h3 className="text-xl font-bold mt-4">Sustainability</h3>
                                <p className="text-gray-200 text-center mt-2">
                                    We are committed to sustainable practices that protect the environment and support
                                    local communities.
                                </p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="rounded-full bg-white p-3">
                                    <img src="./public/images/Quality.png" alt="Quality" className="h-16" />
                                </div>
                                <h3 className="text-xl font-bold mt-4">Quality</h3>
                                <p className="text-gray-200 text-center mt-2">
                                    Quality is at the heart of everything we do. We strive to deliver the finest tea
                                    products to our customers.
                                </p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="rounded-full bg-white p-3">
                                    <img src="./public/images/Community.png" alt="Community" className="h-16" />
                                </div>
                                <h3 className="text-xl font-bold mt-4">Community</h3>
                                <p className="text-gray-200 text-center mt-2">
                                    We believe in building strong relationships with our local communities and supporting
                                    their growth.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default AboutUS;
