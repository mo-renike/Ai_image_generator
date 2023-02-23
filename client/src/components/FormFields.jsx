import React from 'react'

const FormFields = ({
    labelName,
    type,
    name,
    placeholder,
    value,
    handleChange,
    isSurpriseMe,
    handleSurpriseMe,
}) => {
    return (
        <div>
            <div className="flex items-center gap-2 mb-2">
                <label className="block font-medium text-[#666e75] text-sm" htmlFor={name}>
                    {labelName}
                </label>
                {isSurpriseMe && (
                    <button onClick={handleSurpriseMe} className="px-2 py-1 bg-gray-400 text-black text-xs font-bold font-medium rounded-[5px]" type='button'>
                        Surprise me
                    </button>
                )}
            </div>
            <input className="w-full px-4 py-2 border border-darkgrey rounded-[5px] focus:outline-none bg-darkgrey focus:border-darkgrey text-sm" type={type} id={name} name={name} placeholder={placeholder} value={value} required onChange={handleChange} />
        </div>
    )
}

export default FormFields