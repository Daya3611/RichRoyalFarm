import { Loader2, LoaderCircleIcon } from 'lucide-react';
import React from 'react';
import { FiLoader } from 'react-icons/fi';

function Loader() {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-white/30 z-49'>
      <div role="status" className='flex items-center justify-center w-[3em] h-10 md:h-32'>
        <FiLoader className='w-[55px] h-[55px] text-blue-600 animate-spin' />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
