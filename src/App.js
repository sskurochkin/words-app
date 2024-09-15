import './assets/reset.sass';
import './App.scss';
import React, {useCallback, useEffect, useRef, useState} from "react";
import lvl1 from './data/1.json';
import lvl2 from './data/2.json';
import lvl3 from './data/3.json';
import Words from "./components/words/words";
import {useLocalStorage} from "./hooks/useStorrage";
import ReloadScreen from "./components/reloadScreen/reloadScreen";
import {nanoid} from "nanoid";

export const AppContext = React.createContext({});

function App() {


	const [currentLvl, setCurrentLvl] = useState(1);
	const [collection, setCollection] = useState([lvl1, lvl2, lvl3]);
	const [selectedLetters, setSelectedLetters] = useState([]);
	const [isLvlComplete, setIsLvlComplete] = useState(false);
	const [words, setWords] = useState([]);

	const [isUniq, setIsUniq] = useState(true);
	const [stValue, setStValue] = useLocalStorage('word_game_lvl', {currentLvl, words});

    const [coef, setCoef] = useState(1)

    const isOpenHandler = useCallback(()=>{
        const value = getItem('word_game_lvl');
        if (value.currentLvl !== currentLvl) {
            setIsUniq(false);
        }else{
            if(value.words.length  && value.words.filter(x=>x.isActive).length !== words.filter(x=>x.isActive).length){
                setIsUniq(false);
            }
        }
    },[currentLvl, words])

    const refApp = useRef(null)

	useEffect(() => {

		window.addEventListener('focus', isOpenHandler);
		return () => {
			window.removeEventListener('focus', isOpenHandler);
		};
	}, [isOpenHandler]);

	useEffect(() => {
        const val = getItem('word_game_lvl')
        if(val.words.length) return
		const index = (currentLvl - 1) % collection.length;
		const words = collection[index].words.map(el => {
			return {
				isActive: false,
				name: el,
				id: nanoid(4)
			};
		}).sort((a, b) => a.name.length - b.name.length);

		setWords(words);
	}, [currentLvl]);



    useEffect(() => {
        let a = window.innerHeight
        setTimeout(()=>{

            if (a<refApp.current.scrollHeight) setCoef(a/refApp.current.scrollHeight * 0.65)

        })




    }, [words]);

    useEffect(() => {
        const value = getItem('word_game_lvl');
        setCurrentLvl(value.currentLvl);
        if (value.words.length)  setWords(value.words);

    }, []);

    const c = words.length> 7 ? 9/words.length  : 1


	const getItem = (key) => {
		const item = window.localStorage.getItem(key);
		return item ? JSON.parse(item) : '';
	};


	const stateContext = {
		currentLvl, setCurrentLvl,
		collection, setCollection,
		selectedLetters, setSelectedLetters,
		isLvlComplete, setIsLvlComplete,
		stValue, setStValue,
		words, setWords

	};

	return (
		<AppContext.Provider value={stateContext}>
			<div className="app"

				// onClick={()=>isOpenHandler()}
			>
                {!isUniq
                    ? <ReloadScreen

                        setIsUniq={setIsUniq}/>
                    : null}
                <div className="app-inner"
                     ref={refApp}
                     style={{

                         transform: `scale(${coef})`
                     }}>

					<Words/>


				</div>

			</div>
		</AppContext.Provider>

	);
}

export default App;
