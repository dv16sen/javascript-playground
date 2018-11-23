import {render} from "./utils";

export default (
`const {useState, useEffect} = React;

export const Keytracker = (props) => {
    const keys = useKeydownListener((pressedKey, previousKey, setKey) => {
        setKey(previousKey + pressedKey);
    });

    return <h2 {...props}>{(keys) ? keys : "Try pressing a key!"}</h2>;
};

const useKeydownListener = (callback, initialValue = "") => {
    const [key, setKey] = useState(initialValue);
    
    const handleKeydown = (event) => callback(event.key, key, setKey);

    useEffect(() => {
        window.addEventListener("keydown", handleKeydown);
        
        return () => {
            window.removeEventListener("keydown", handleKeydown);
        };
    });
   
   return key;
}

${render(`<Keytracker/>`)}`
);