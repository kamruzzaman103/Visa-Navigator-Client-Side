const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="max-w-lg mx-auto px-4 sm:max-w-4xl lg:max-w-6xl lg:px-8">
                <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-10">
                    {/* Website Name and Copyright */}
                    <div className="text-center lg:text-left">
                        <h2 className="text-lg font-semibold">Visa Navigator</h2>
                        <p className="text-sm mt-2">&copy; {new Date().getFullYear()} Visa Navigator. All rights reserved.</p>
                    </div>

                    {/* Contact Information */}
                    <div className="text-center lg:text-left">
                        <h3 className="text-md font-semibold">Contact Us</h3>
                        <p className="text-sm mt-2">Email: <a href="mailto:support@visanavigator.com" className="text-blue-400 hover:underline">support@visanavigator.com</a></p>
                        <p className="text-sm">Phone: <a href="tel:+18005551234" className="text-blue-400 hover:underline">+1-800-555-1234</a></p>
                    </div>

                    {/* Social Media Links */}
                    <div className="text-center">
                        <h3 className="text-md font-semibold">Follow Us</h3>
                        <div className="mt-4 flex justify-center space-x-4">
                            <a href="#" className="hover:text-blue-400">
                                Facebook
                            </a>
                            <a href="#" className="hover:text-blue-400">
                                Twitter
                            </a>
                            <a href="#" className="hover:text-blue-400">
                                Instagram
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
