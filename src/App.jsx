import './App.css'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Diary from './Pages/Diary.jsx'
import New from './Pages/New.jsx'
import NotFound from './Pages/NotFound.jsx'
import { getEmotionImage } from './util/get-emotion-image.jsx'
import Button from './components/Button.jsx'
import Header from './components/Header.jsx'
import Edit from './Pages/Edit.jsx'
import { useReducer,useRef, createContext, useState, useEffect } from 'react'

/*const mockData = [
  {
    id:1,
    createdDate : new Date("2025-07-24").getTime(),
    emotionId : 1,
    content : "1번 일기 내용"
  }, 
  {
    id:2,
    createdDate : new Date("2025-07-23").getTime(),
    emotionId : 2,
    content : "2번 일기 내용"
  },
  {
    id:3,
    createdDate : new Date("2025-06-18").getTime(),
    emotionId : 3,
    content : "3번 일기 내용"
  }
]*/

function reducer(state, action) {
  let nextState;

  switch (action.type) {
    case "INIT" : 
      return action.data;
    case 'CREATE':{
      nextState= [action.data, ...state];
      break
    }
      
    case 'UPDATE':{
      nextState= state.map((item) => 
      String(item.id) === String(action.data.id) 
      ? action.data : item);
      break;
    } 
    case 'DELETE':{
        nextState = state.filter((item) => 
        String(item.id) !== String(action.data.id));
        break;
      }
    default:
      return state;
    }
    
    localStorage.getItem("diary", JSON.stringify(nextState));
    return nextState;
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const[isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);;
  const idRef = useRef(0);

  useEffect(()=>{
    const storedData = localStorage.getItem("diary");
    
    if(!storedData) { 
      setIsLoading(false);
      return;
    }

    const parsedData = JSON.parse(storedData);
    if(!Array.isArray(parsedData)){
       setIsLoading(false);
      return;
    }

    let maxId=0;
    parsedData.forEach((item)=>{
      if(Number(item.id) > maxId){
        maxId=Number(item.id)
      }
    })

    idRef.current = maxId + 1;

    dispatch({
      type : "INIT",
      data : parsedData,
    })
    setIsLoading(false);
  },[])

  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: 'CREATE',
      data:{
        id: idRef.current++,
        createdDate,
        emotionId,
        content
      }
    });
  };

  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: 'UPDATE',
      data:{
        id,
        createdDate,
        emotionId,
        content
      }
    });
  };

  const onDelete = (id) => {
     dispatch({
      type: 'DELETE',
      data:{
        id,
      }
    });
  };

  if(isLoading){
    return <div> 데이터 로딩 중입니다... </div>
  }

  return (
    <>
     <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider 
      value={{ onCreate, onUpdate, onDelete }}>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="*" element={<NotFound />} /> 
      </Routes>
      </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;