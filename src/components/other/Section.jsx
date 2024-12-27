import React from 'react'

export default function Section() {
  return (
    <section className='grid grid-cols-1 lg:flex px-7 gap-9'>
        <div className='lg:max-w-[45%] items-center mt-9'>
            <h2 className='text-5xl font-bold mb-5'>We Provide You <span className='text-blue-600'>Super Quality</span> Products</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est esse iste libero. Non, culpa. Assumenda, vel! Ipsa, consequuntur tempora rerum saepe nemo, possimus dicta doloribus beatae quae ratione distinctio ab!</p>
        </div>
        <div className='flex items-center text-center '>
            <img src="/agri2.jpeg" alt="" className='h-[80%] w-[95%] rounded-xl' />
        </div>
    </section>
  )
}


