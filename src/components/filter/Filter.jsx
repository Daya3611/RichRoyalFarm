import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';
import { Search, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
function Filter() {
    const uniqueCategories = new Set();

    const context = useContext(myContext);
    const {
        mode,
        searchkey,
        setSearchkey,
        filterType,
        setFilterType,
        product,
    } = context;

    const [isSearchVisible, setIsSearchVisible] = React.useState(false);
    
    const location = useLocation();
    const pathname = location.pathname;
    return (
        <div>
            {pathname === '/' ? (
                <div className="container mx-auto px-4 lg:w-[60%] w-full rounded-3xl">
                {/* Filter Box */}
                <div
                    className="p-2 rounded-[40px] flex flex-col sm:flex-row gap-4 items-center justify-between w-full"
                >
                    <div className="relative flex w-full sm:w-auto pl-4 items-center justify-center">
                        <div 
                            className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer flex items-center text-gray-500"
                            onClick={() => setIsSearchVisible(!isSearchVisible)}
                        >
                            <Search className="m-2 h-5 w-5 text-black" />
                        </div>
                        <input
                            type="text"
                            name="searchkey"
                            value={searchkey}
                            onChange={(e) => setSearchkey(e.target.value.toLowerCase())}
                            id="searchkey"
                            placeholder="Search Products..."
                            className="pl-12 pr-4 py-3 w-full sm:w-[300px] lg:w-[550px] rounded-full border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 shadow-sm md:block hidden"
                        />
                    </div>
                </div>
            </div>
            
            ) : null}

            {/* Search Popup for small screens */}
            {isSearchVisible && (
                <div className="sm:hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-11/12 relative shadow-lg">
                    <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        onClick={() => setIsSearchVisible(false)}
                    >
                        <X className='w-9 h-9 text-white bg-red-600 rounded-full' />
                    </button>
                    <div className="flex flex-col gap-4 items-center">
                        <div className="flex items-center gap-2 w-full">
                            <input
                                type="text"
                                name="searchkey"
                                value={searchkey}
                                onChange={(e) => setSearchkey(e.target.value.toLowerCase())}
                                id="searchkey"
                                placeholder="Search Products..."
                                className={`px-4 py-2 w-full rounded-full ${mode === 'dark'
                                    ? 'bg-gray-700 text-white placeholder-gray-400'
                                    : 'bg-white text-black'}
                                    border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-sm`}
                            />
                            <button 
                                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
                                onClick={() => handleSearch(searchkey)}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}
export default Filter;
