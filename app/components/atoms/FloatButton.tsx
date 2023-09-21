export const FloatButton = ({ ...rest }: JSX.IntrinsicElements['button']) => {
	return (
		<button
			className='absolute z-50 opacity-70 text-4xl 
            flex items-center justify-center 
            text-gray-900 bg-white rounded-full  
            w-14 h-14 bottom-5 right-5 md:bottom-10 
            hover:opacity-100 transition-all'
		>
			{rest.children}
		</button>
	)
}
