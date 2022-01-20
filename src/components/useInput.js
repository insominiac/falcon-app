import { useState } from "react";

export function useInput(props){

    const [value,SetValue] = useState(props);
    return[
        {value,
            onChange: (e)  =>{ SetValue(e.target.value);
            props.inputHandler(e.target.value);
        }
        },
        () =>{
            SetValue('')
        }
    
    ]
    

}