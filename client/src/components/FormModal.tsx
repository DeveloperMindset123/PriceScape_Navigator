import React from 'react'

type FixFormModalProps = {
  isVisibleBool: boolean,
  onClose: any,
  children?: React.ReactNode
};

const FormModal: React.FC<FixFormModalProps> = ({ isVisibleBool, onClose, children }) => {
  if (!isVisibleBool) return null;

  const handleCloseOutsideModal = (e:any) => {
    if (e.target.id === "wrapper") onClose();  /*Ensure that modal does not close when it's body is clicked */
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 background-blur-sm flex justify-center items-center" onClick={handleCloseOutsideModal} id="wrapper">
        <div className='md:w-[600px] md:w-[90%] mx-auto flex flex-col'>
          <button className='text-white text-xl place-self-end' onClick={() => onClose()}>X</button>
            <div className='bg-white p-2 rounded'>
                {children}
            </div>
        </div>
    </div>
  )
}

export default FormModal;

