// lib
import { useCallback, useState } from "react";

const useToggle = (initialState = false) => {
    const [componentState, setComponentState] = useState(initialState);

    const Toggle = useCallback(() => setComponentState(!componentState), [componentState]);

    return [componentState, Toggle];
}

export default useToggle;