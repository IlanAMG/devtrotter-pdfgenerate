import React from 'react'

export const InputText = (props) => {
    return (
        <>
            <div className="container-input">
                    <div>
                        <label htmlFor={props.name}>{props.label}</label>
                    </div>
                    <div>
                        <input placeholder={props.placeholder} type="text" name={props.name} value={props.value} onChange={props.onChange}/>
                    </div>
            </div>   
        </>
    )
}
