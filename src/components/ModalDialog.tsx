import React, { useEffect } from 'react'

const ModalDialog = ({ isOpen, setIsOpen, children }: { isOpen: boolean, setIsOpen: (param: boolean) => void, children: React.ReactNode }) => {

  // Open modal when clicking on the button
  useEffect(() => {
    document.body.classList.toggle('no-scroll', isOpen);
  }, [isOpen]);
  
  // Delay content modal animation
  useEffect(() => {
    isOpen ? setTimeout(() => setIsOpen(true), 200) : setIsOpen(false);
  }, [isOpen]);
  
  // Close modal when pressing ESC key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        document.body.style.overflow = 'auto';
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

//   Close modal when clicking outside the modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target instanceof HTMLElement && !event.target.closest('#modalNewResto')) {
        setIsOpen(false);
        document.body.style.overflow = 'auto';
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, []);

  return (
    <div className={`${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} fixed inset-0 z-[999] flex justify-center items-center overflow-hidden bg-black bg-opacity-50 transition-all duration-300`}>
      <div id="modalNewResto" className={`${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} w-full max-w-[550px] flex bg-white rounded-lg shadow-lg overflow-hidden relative transition-all duration-300`} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default ModalDialog