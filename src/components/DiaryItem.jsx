import { getEmotionImage } from "../util/get-emotion-image";
import Button from "./Button";
import "./DiaryItem.css"
import { useNavigate } from "react-router-dom";

const DiaryItem = ({id, emotionId, createdDate, content}) =>
{
    const nav = useNavigate();

    return(
        <div className = "DiaryItem">
            <div 
            onClick = {() => nav(`/diary/${id}`)}
            className={`imgSection imgSection_${emotionId}`}>
                <img src={getEmotionImage(emotionId)}></img>
            </div>

            <div 
            onClick = {() => nav(`/diary/${id}`)}
            className="infoSection">
                <div className="createdDate">  
                    {new Date(createdDate).toLocaleDateString()}    
                </div>
                <div className="content"> 
                    {content}
                </div>
            </div>

            <div className="buttonSection">
                <Button 
                onClick = {() => nav(`/edit/${id}`)}
                text={"수정하기"} />

            </div>


        </div>
    
    )
}
export default DiaryItem;