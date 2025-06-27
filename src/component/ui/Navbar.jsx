import React, { useState, useEffect } from 'react';
import { FaBars, FaSearch, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import axios from 'axios';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const toggleIcon = () => {
    setShowMenu(!showMenu);
  };

  const toggleSearch = () => {
    setShowSearchBar(!showSearchBar);
    setShowResults(false);
    setSearchQuery('');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/products/public?q=${encodeURIComponent(searchQuery)}`
      );
      setSearchResults(response.data.slice(0, 3)); // Show only 3 results for non-logged users
      setShowResults(true);
    } catch (err) {
      console.error("Search error:", err);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleResultClick = (productId) => {
    navigate(`/buyer-dashboard/products/${productId}`);
    setShowResults(false);
    setSearchQuery('');
    setShowSearchBar(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.closest('.search-container') === null) {
        setShowResults(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className='py-1 bg-white shadow-sm sticky top-0 z-50'>
      <nav className='container mx-auto py-1 flex items-center justify-between px-4'>
        <div>
          <Link to='/' className='font-clash text-primary text-2xl'>Crop Direct</Link>
        </div>
        
        <button onClick={toggleSearch} className='md:hidden flex'>
          <FaSearch />
        </button>
        
        <div className='md:hidden flex'>
          <button onClick={toggleIcon}>{showMenu ? <FaTimes /> : <FaBars />}</button>
        </div>

        {/* Desktop Search */}
        <form 
          onSubmit={handleSearch}
          className='flex-1 max-w-2xl hidden md:block relative search-container'
        >
          <div className='relative'>
            <input 
              type="text" 
              className='rounded-full py-3 pl-4 border w-full' 
              placeholder='Search tomatoes, onions...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchResults.length > 0 && setShowResults(true)}
            />
            <button 
              type="submit"
              className='border absolute right-2 rounded-full px-6 py-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-accent duration-300 ease-linear'
            >
              <FaSearch />
            </button>
          </div>

          {/* Search Results Dropdown */}
          {showResults && (
            <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-lg mt-1 z-50 max-h-96 overflow-y-auto">
              {loading ? (
                <div className="p-4 text-center">Searching...</div>
              ) : searchResults.length > 0 ? (
                <>
                  {searchResults.map((product) => (
                    <div
                      key={product._id}
                      className="p-3 border-b hover:bg-gray-50 cursor-pointer flex items-center gap-3"
                      onClick={() => handleResultClick(product._id)}
                    >
                      <img 
                        src={product.images?.[0] || '/images/produce.avif'} 
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">₦{product.price?.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                  <div className="p-3 bg-gray-50 text-center">
                    <p className="text-sm text-gray-600">
                      <Link 
                        to="/auth/login" 
                        className="text-accent font-medium hover:underline"
                        onClick={() => setShowResults(false)}
                      >
                        Sign in
                      </Link> to see all {searchResults.length > 0 ? 'results' : 'products'}
                    </p>
                  </div>
                </>
              ) : (
                <div className="p-4 text-center text-gray-500">No products found</div>
              )}
            </div>
          )}
        </form>

        <div className='md:flex hidden items-center gap-6'>
          <Button link='/auth/login' text='Login' hover='text-accent' padding='px-4' py='py-1' />
          <Button bgColor='bg-accent' link='/auth/signup' text='Signup' hover='text-white' opacity='bg-opacity-90' padding='px-4' py='py-1' />
        </div>
      </nav>

      {/* Mobile Search */}
      {showSearchBar && (
        <form 
          onSubmit={handleSearch}
          className='container mx-auto px-4 py-2 search-container'
        >
          <div className='relative'>
            <input 
              type="text" 
              className='rounded-full py-2 pl-4 border w-full' 
              placeholder='Search tomatoes...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchResults.length > 0 && setShowResults(true)}
            />
            <button 
              type="button"
              onClick={toggleSearch}
              className='absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500'
            >
              <FaTimes />
            </button>
            <button 
              type="submit"
              className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500'
            >
              <FaSearch />
            </button>
          </div>

          {/* Mobile Search Results */}
          {showResults && (
            <div className="bg-white shadow-lg rounded-lg mt-1 z-50 max-h-96 overflow-y-auto">
              {loading ? (
                <div className="p-4 text-center">Searching...</div>
              ) : searchResults.length > 0 ? (
                <>
                  {searchResults.map((product) => (
                    <div
                      key={product._id}
                      className="p-3 border-b hover:bg-gray-50 cursor-pointer flex items-center gap-3"
                      onClick={() => handleResultClick(product._id)}
                    >
                      <img 
                        src={product.images?.[0] || '/images/produce.avif'} 
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">₦{product.price?.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                  <div className="p-3 bg-gray-50 text-center">
                    <p className="text-sm text-gray-600">
                      <Link 
                        to="/auth/login" 
                        className="text-accent font-medium hover:underline"
                        onClick={() => setShowResults(false)}
                      >
                        Sign in
                      </Link> to see all {searchResults.length > 0 ? 'results' : 'products'}
                    </p>
                  </div>
                </>
              ) : (
                <div className="p-4 text-center text-gray-500">No products found</div>
              )}
            </div>
          )}
        </form>
      )}

      {/* Mobile Menu */}
      {showMenu && 
        <div className='border-t py-4 mt-4 md:hidden flex'>
          <ul className='flex flex-col gap-4 px-4 w-full'>
            <li><Link to='/' onClick={toggleIcon}>Home</Link></li>
            <li><Link to='/about' onClick={toggleIcon}>About</Link></li>
            <li><Link to='/pricing' onClick={toggleIcon}>Pricing</Link></li>
            <li><Link to='/contact' onClick={toggleIcon}>Contact</Link></li>
            <div className='flex items-center gap-6 mt-2'>
              <Button link='/auth/login' text='Login' hover='text-accent' py='py-1' />
              <Button 
                bgColor='bg-accent' 
                link='/auth/signup' 
                text='Signup' 
                padding='px-4' 
                py='py-1' 
                hover='text-white' 
                opacity='bg-opacity-90' 
              />
            </div>
          </ul>
        </div>
      }
    </header>
  );
};

export default Navbar;