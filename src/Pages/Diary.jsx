import {useParams, useNavigate} from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import useDiary from "../hooks/useDiary";
import { getStringedDate } from "../util/getStringedDate";
import usePageTitle from "../hooks/usePageTitle";
import Viewer from "../components/Viewer";


const Diary = () => {
    const params = useParams();
    const nav = useNavigate();
    const curDiaryItem = useDiary(params.id);
    usePageTitle(`${params.id}번 일기`);


    if(curDiaryItem == undefined){
      return <div>데이터 로딩 중...</div>
    }

    if(curDiaryItem == null){
      return <div>존재하지 않는 일기입니다.</div>
    }

    const {createdDate, emotionId, content} = curDiaryItem;
    const title = getStringedDate(new Date(createdDate));
  
    console.log("emotionId:", emotionId);
    return (
    <div>
      <Header 
      title={`${title}기록`} 
      leftChild={<Button onClick={()=> nav(-1)} text={"< 뒤로가기"} />}
      rightChild={<Button onClick={()=>nav(`/edit/${params.id}`)} text={"수정하기"} />}
      />
      <Viewer emotionId={emotionId} content = {content} />
      
    </div>

   
  );
}

export default Diary;