import { createContext, useReducer } from "react"

export const HouseContext = createContext()

export const HouseReducer = (state,action) => {
    switch(action.type){
        case 'SET_HOUSES':
            return {houses: action.payload}

        case 'SET_HOUSE':
            return {houses: state.houses.map((house) => house._id === action.payload._id ? action.payload :house)}

        case 'CREATE_HOUSE':
            return {houses: [action.payload,...state.houses]}

        case 'DELETE_HOUSE':
            return {houses: state.houses.filter((h) => h._id !== action.payload._id)}

        default:
            return state        
    }
}

export const HouseContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(HouseReducer,{houses:null})

    return(
        <HouseContext.Provider value={{...state,dispatch}}>
            {children}
        </HouseContext.Provider>
    )

}