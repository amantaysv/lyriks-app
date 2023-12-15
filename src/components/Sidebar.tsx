import { links, logo } from '@assets'
import { useState } from 'react'
import { HiOutlineMenu } from 'react-icons/hi'
import { RiCloseLine } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleSidebarOpen = () => setIsMobileOpen(!isMobileOpen)

  const sidebarContent = (
    <>
      <img src={logo} alt='logo' className='w-full h-14 object-contain' />
      <div className='mt-10'>
        {links.map(({ Icon, name, to }) => (
          <NavLink
            to={to}
            className='flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400'
            onClick={() => setIsMobileOpen(false)}
          >
            <Icon className='w-6 h-6 mr-2' />
            {name}
          </NavLink>
        ))}
      </div>
    </>
  )

  return (
    <>
      <div className='md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]'>
        {sidebarContent}
      </div>
      <div className='absolute md:hidden top-6 right-3'>
        {isMobileOpen ? (
          <RiCloseLine className='w-6 h-6 mr-2 text-white' onClick={handleSidebarOpen} />
        ) : (
          <HiOutlineMenu className='w-6 h-6 mr-2 text-white' onClick={handleSidebarOpen} />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          isMobileOpen ? 'left-0' : '-left-full'
        }`}
      >
        {sidebarContent}
      </div>
    </>
  )
}

export default Sidebar
