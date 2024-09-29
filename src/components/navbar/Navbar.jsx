// import { IoChevronDownOutline } from "react-icons/io5";
// import { RxHamburgerMenu } from "react-icons/rx";

// const Navbar = ({ handleNavMenuOpen }) => {
//   return (
//     <nav className="sticky top-0 h-12 md:h-14 px-4 w-full shadow-md flex flex-row justify-between items-center z-[999] bg-white">
//       <div className="flex flex-row justify-center items-center gap-x-2">
//         <button onClick={handleNavMenuOpen} className="block lg:hidden">
//           <RxHamburgerMenu size={24} />
//         </button>
//         <h1 className="text-lg font-semibold">StackIntel</h1>
//       </div>
//       <div className="flex flex-row justify-center items-center gap-x-2">
//         <div className="flex flex-row items-center">
//           <p className="border border-green-500 px-2 md:px-4 md:py-2 rounded-full">
//             R
//           </p>
//           <button className="ml-1 text-green-500">
//             <IoChevronDownOutline size={19} />
//           </button>
//         </div>
//         <div>
//           <p>Rahul</p>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { IoChevronDownOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = ({ handleNavMenuOpen }) => {
  return (
    <nav className="sticky top-0 h-12 md:h-14 px-4 w-full shadow-md flex flex-row justify-between items-center z-[999] bg-white">
      <div className="flex flex-row justify-center items-center gap-x-2">
        <button onClick={handleNavMenuOpen} className="block lg:hidden">
          <RxHamburgerMenu size={24} />
        </button>
        {/* Changed StackIntel color to #2634bb */}
        <h1 className="text-lg font-semibold" style={{ color: '#2634bb' }}>
          StackIntel
        </h1>
      </div>
      <div className="flex flex-row justify-center items-center gap-x-2">
        <div className="flex flex-row items-center">
          {/* Changed border color to #2634bb */}
          <p className="border border-[#2634bb] px-2 md:px-4 md:py-2 rounded-full">
            R
          </p>
          {/* Changed text color to #2634bb */}
          <button className="ml-1 text-[#2634bb]">
            <IoChevronDownOutline size={19} />
          </button>
        </div>
        <div>
          <p>Rahul</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
