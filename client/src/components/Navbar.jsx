import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow sticky top-0 z-50">

      <div className="container mx-auto flex items-center justify-between py-5 px-4">

        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-blue-600">
          RealEstatePro
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <Link className="hover:text-blue-600" to="/">Home</Link>
          <Link className="hover:text-blue-600" to="/properties">Properties</Link>
          <Link className="hover:text-blue-600" to="/about">About</Link>
          <Link className="hover:text-blue-600" to="/contact">Contact</Link>
        </nav>

        {/* Mobile Hamburger Icon */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>

      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >

        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="font-bold text-lg">Menu</h2>
          <button onClick={() => setOpen(false)} className="text-2xl">
            ✕
          </button>
        </div>

        <nav className="flex flex-col p-5 gap-5">

          <Link onClick={() => setOpen(false)} to="/">Home</Link>
          <Link onClick={() => setOpen(false)} to="/properties">Properties</Link>
          <Link onClick={() => setOpen(false)} to="/about">About</Link>
          <Link onClick={() => setOpen(false)} to="/contact">Contact</Link>

        </nav>

      </div>

    </header>
  );
}

export default Navbar;