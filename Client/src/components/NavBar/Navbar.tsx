
const Navbar = () => {
  return <nav className="navbar  bg-red-400">


  <div className="flex-1">
    <span className=" font-sans font-semibold text-xl">Joz Ve Loz</span>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
  
      <li>
        <details>
          <summary>
            Yarden
          </summary>
          <ul className="">
           
            <li className="p-2">My Tasks</li>
            <li className="p-2">Logout</li>
          </ul>
        </details>
      </li>
    </ul>
  </div>


  </nav>
};
export default Navbar;