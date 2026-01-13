import {useState, useContext, useEffect} from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const useDiary = (id) =>{
    const data = useContext(DiaryStateContext);
    const [curDiaryItem, setCurDiaryItem] = useState();
    const nav = useNavigate();
    
     useEffect(() =>{
      if (!data || data.length === 0) {
        setCurDiaryItem();
        return;
      }

      const currentDiaryItem = 
      data.find((item) => String(item.id) === String(id))

      
     if (!currentDiaryItem) {
        setCurDiaryItem(null); // 일기 없음
        setTimeout(() => {
          window.alert("존재하지 않는 일기입니다.");
          nav('/', {replace: true});
        }, 0);
      } 
        setCurDiaryItem(currentDiaryItem);
    }, [id, data, nav]);


    return curDiaryItem;
}

export default useDiary;