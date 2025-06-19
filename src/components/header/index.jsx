 import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import { HiMenuAlt2 } from "react-icons/hi";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { FaRegUser } from "react-icons/fa6";
import { VscSignOut } from "react-icons/vsc";
import { CheckIcon, ChevronDownIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { LuBellRing } from "react-icons/lu";
import { SidebarContext } from '../../context/SidebarContext';
import { useAuth } from '../../components/context/authContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
     const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
    
  const [isOpenlan, setIsOpenlan] = useState(false);
const [selectedLanguage, setSelectedLanguage] = useState({
    code: 'en',
    name: 'English',
    flag: '🇬🇧'  // Using emoji for consistency
});

 const languages = [
    { code: 'en', name: 'English', flag: <img src="https://flagcdn.com/w20/gb.png" width="20" height="15" alt="UK"   className="border border-gray-300 rounded-sm" />},
    { code: 'es', name: 'Español', flag: <img src="https://flagcdn.com/w20/es.png" width="20" height="15" alt="Spain"   className="border border-gray-300 rounded-sm" />},
    { code: 'fr', name: 'Français',  flag: <img src="https://flagcdn.com/w20/fr.png" width="20" height="15" alt="France"   className="border border-gray-300 rounded-sm" /> },
    { code: 'de', name: 'Deutsch',  flag: <img src="https://flagcdn.com/w20/de.png" width="20" height="15" alt="Germany"   className="border border-gray-300 rounded-sm"/> },
     {
    code: 'ar',
    name: 'العربية',
    flag: <img src="https://flagcdn.com/w20/sa.png" width="20" height="15" alt="Saudi Arabia"   className="border border-gray-300 rounded-sm" />
  }, {
    code: 'ur',
    name: 'اردو',
    nameLatin: 'Urdu',
    flag: <img src="https://flagcdn.com/w20/pk.png" width="20" height="15" alt="Pakistan"   className="border border-gray-300 rounded-sm" />
  }
  ];

const toggleDropdownlan = () => setIsOpenlan(!isOpenlan);
const selectLanguage = (language) => {
    setSelectedLanguage(language);
    setIsOpenlan(false);
};
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, text: 'New message received', time: '5 min ago', read: false },
        { id: 2, text: 'System update available', time: '2 hours ago', read: true },
        { id: 3, text: 'Your report is ready', time: '1 day ago', read: true },
    ]);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const markAsRead = (id) => {
        setNotifications(notifications.map(n => 
            n.id === id ? { ...n, read: true } : n
        ));
    };
    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const unreadCount = notifications.filter(n => !n.read).length;
    const [anchorMyAcc, setAnchorMyAcc] = React.useState(null);
    const openMyAcc = Boolean(anchorMyAcc);
    const handleClickMyAcc = (event) => {
        setAnchorMyAcc(event.currentTarget);
    };
    const handleCloseMyAcc = () => {
        setAnchorMyAcc(null);
    };
    const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        
      <header className={`w-full py-3 shadow-md bg-white flex items-center justify-between ${
        isSidebarOpen ? 'pl-64' : 'pl-4'
      } pr-4 transition-all duration-300 ease-in-out`}>
        {/* Menu button to toggle sidebar */}
        <Button 
          className="!min-w-[40px] !h-[40px] !rounded-full hover:!bg-gray-200"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <HiMenuAlt2 className="text-xl text-gray-700" />
        </Button>
            
            <div className='flex items-center'>
                <div className='hidden md:flex'>
                    <input 
                        type="text" 
                        placeholder="Search.."
                        className='bg-gray-100 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 w-[500px]'
                    />
                </div>
            </div>

            <div className='flex items-center justify-end gap-7'>
             <div className="relative inline-block text-left">
        <button
            type="button"
            onClick={toggleDropdownlan}
            className="inline-flex items-center justify-center px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium bg-black border border-gray-300 rounded-md shadow-sm hover:bg-gray-500 focus:outline-none text-white transition-all duration-200"
        >
            <GlobeAltIcon className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
            <span className="mr-1">
                {selectedLanguage.flag}
                <span className="hidden md:inline ml-1">{selectedLanguage.name}</span>
            </span>
            <ChevronDownIcon className="w-3 h-3 md:w-4 md:h-4 text-black" />
        </button>

        {isOpenlan && (
            <div className="absolute right-0 z-10 w-48 md:w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu">
                    {languages.map((language) => (
                        <button
                            key={language.code}
                            onClick={() => selectLanguage(language)}
                            className={`flex items-center w-full px-4 py-2 text-sm ${
                                selectedLanguage.code === language.code
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                            role="menuitem"
                        >
                            <span className="text-lg mr-3">{language.flag}</span>
                            <span>{language.name}</span>
                            {selectedLanguage.code === language.code && (
                                <span className="ml-auto text-green-500">✓</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        )}
    </div>

                <div className="relative inline-block">
                    <button
                        onClick={toggleDropdown}
                        className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 relative transition-colors"
                    >
                        <LuBellRing className="h-6 w-6" />
                        {unreadCount > 0 && (
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-red-500 rounded-full transform translate-x-1/2 -translate-y-1/2">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
                                <h3 className="font-medium text-gray-900">Notifications</h3>
                                {unreadCount > 0 && (
                                    <button 
                                        onClick={markAllAsRead}
                                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                                    >
                                        <CheckIcon className="h-4 w-4 mr-1" />
                                        Mark all read
                                    </button>
                                )}
                            </div>

                            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                                {notifications.length > 0 ? (
                                    notifications.map(notification => (
                                        <div
                                            key={notification.id}
                                            onClick={() => markAsRead(notification.id)}
                                            className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                                        >
                                            <p className="text-sm font-medium text-gray-900">{notification.text}</p>
                                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-4 py-3 text-sm text-gray-500">
                                        No notifications available
                                    </div>
                                )}
                            </div>

                            <div className="px-4 py-2 text-center border-t border-gray-200">
                                <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                                    View all notifications
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className='relative'>
                    <div className='rounded-full w-[40px] h-[40px] overflow-hidden cursor-pointer'>
                        <img 
                            src="https://demo.tailadmin.com/src/images/user/owner.jpg" 
                            className='w-full h-full object-cover'
                            onClick={handleClickMyAcc}
                            alt="User profile"
                        />
                    </div>
                    <Menu
                        anchorEl={anchorMyAcc}
                        id="account-menu"
                        open={openMyAcc}
                        onClose={handleCloseMyAcc}
                        onClick={handleCloseMyAcc}
                        slotProps={{
                            paper: {
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&::before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleCloseMyAcc} className='gap-3'>
                            <div className='flex items-center'>
                                <div className='rounded-full w-[40px] h-[40px] overflow-hidden cursor-pointer'>
                                    <img 
                                        src="https://demo.tailadmin.com/src/images/user/owner.jpg" 
                                        className='w-full h-full object-cover'
                                        alt="User profile"
                                    />
                                </div>
                            </div>
                            <div className='info'>
                                <h3 className='text-[15px] font-[500] leading-5'>Asad Liaqat</h3>
                                <p className='text-[12px] font-[300]'>asadliaqat123@gmail.com</p>
                            </div>
                        </MenuItem>  
                        <Divider/>
                        <MenuItem onClick={handleCloseMyAcc} className='flex items-center gap-3 hover:!bg-sky-300'>
                            <FaRegUser /> <span>Profile</span>
                        </MenuItem>
                        <Divider/>
                       <MenuItem onClick={handleLogout} className='flex items-center gap-3 hover:!bg-sky-300'>
  <VscSignOut /> <span>SignOut</span>
</MenuItem>
                    </Menu>
                </div>
            </div>
        </header>
    );
};

export default Header;