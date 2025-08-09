import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

import axios from "../../axios.js";
import './FullPost.css'

function FullPost(){
    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(true);
    const {id} = useParams();

    useEffect(() => {
        axios.get(`/days/${id}`).then(res => {
            setData(res.data);
            setLoading(false);
        }).catch(err => {
            console.warn(err);
            alert('Ошибка при получении поста');
        });
    }, [])

    console.log(data);

    if(isLoading){
        return <h1>Loading</h1>;
    }

    return(
        <>
            <table cellSpacing='15'>
                <tr>
                    <td>
                        <img src={data.avatarUrl} alt="loading..." className='fullpost_avatar'/> 
                    </td>
                    <td>
                        <h1 className="fullpost_date">{data.month} {data.day} число {data.year} год  </h1>
                    </td>
                    <Link to='/days' className="fullpost_back"> &lt; Назад </Link>
                </tr>
            </table>
            <h4 className="fullpost_text">{data.text}</h4>
            {data.images.map((imageUrl) => (
                <>
                    <img src={imageUrl} alt="loading..." className='fullpost_image'/>
                </>
            ))}
        </>
    );
}

export default FullPost;