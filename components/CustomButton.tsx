import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

interface ButtonProps{
 title:string
 onPress:()=>void
 disable?:boolean
 isDark?:boolean
 isLoading?:boolean
 variant:"primary" | "outline"
}
const CustomButton = ({title, onPress, disable, isDark, variant}:ButtonProps) => {
    const btnStyle = variant === 'primary' ? `rounded-xl py-4 mb-4 ${
        disable ? 'bg-gray-400' : 'bg-primary'
      }` : `rounded-xl py-4 mb-4`
  return (
    <TouchableOpacity
     onPress={onPress}
     disabled={disable}
     className={btnStyle}
    >
     <Text className={`text-center font-semibold text-lg ${variant === 'primary' ? ' text-white': 'text-primary'}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

