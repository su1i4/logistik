import { FC, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

interface ProvidersProps {
  children: ReactNode
}

const Natification: FC<ProvidersProps> = ({ children }) => {
  return (
    <div className='z-[9999]'>
      <Toaster
        position='top-center'
        reverseOrder={false}
        containerStyle={{
          zIndex: 9999,
        }}
      />
      {children}
    </div>
  )
}

export default Natification