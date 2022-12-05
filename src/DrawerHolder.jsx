import React, { useState } from 'react';
import Drawer from './Drawer';
const DrawerHolder = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <section className="flex space-x-6 m-4">
        <button
          className="bg-blue-600 text-white px-4 py-1 fixed top-5 right-5"
          onClick={() => setIsOpen(true)}
        >
          open
        </button>
      </section>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}></Drawer>
    </div>
  );
};

export default DrawerHolder;
