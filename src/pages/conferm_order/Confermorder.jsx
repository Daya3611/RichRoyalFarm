
import { CheckCircle2 } from 'lucide-react';
import React, { useState } from 'react';

export default function Confermorder() {
    

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="flex flex-col text-center justify-center">
                {/* <img src="https://img.icons8.com/emoji/48/000000/check-mark-emoji.png" alt="Order Confirmed" className="w-12 h-12 mb-5 items-center justify-center" /> */}
                <span className='justify-center items-center flex'><CheckCircle2 className='w-[90px] h-[90px] text-blue-700'/></span>
                <p className='max-w-[500px] mt-3'>
                Your order has been confirmed, and a confirmation message will be sent automatically within 3 seconds. Please do not press the back button.
                </p>
            </div>
        </div>
    );
}
