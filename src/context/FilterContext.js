import React, {useState, createContext} from 'react';

export const FilterContext = createContext();

export function FilterContextProvider ({children}) {

    /* ENVIRONMENT API URL */
    const [filter, setFilter] = useState(null);


    return (
        <FilterContext.Provider value={[filter, setFilter]}>
            {children}
        </FilterContext.Provider>
    );
};