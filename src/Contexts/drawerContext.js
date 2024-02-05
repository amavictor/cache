
import {
    createContext,
    useRef,
    useMemo,
    useState
} from "react";

export const DrawerContext = createContext()

export const DrawerContextProvider = ({ children }) => {
    const [bottomSheetContent, setBottomSheetContent] = useState(null)
    const [showHeader, setShowHeader] = useState(true)
    const sheetRef = useRef()
    const snapPoints = useMemo(() => ["20","45%", "60%"], []);
    const openBottomSheet = () => {
        sheetRef.current.expand()
    }

    const closeBottomSheet = () => sheetRef.current.close()

    return (
        <DrawerContext.Provider
            value={{
                sheetRef,
                snapPoints,
                showHeader,
                bottomSheetContent,

                openBottomSheet,
                setShowHeader,
                closeBottomSheet,
                setBottomSheetContent
            }}
        >
            {children}
        </DrawerContext.Provider>
    )
}