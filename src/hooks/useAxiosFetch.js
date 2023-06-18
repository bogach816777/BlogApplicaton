import { useState, useEffect } from "react";
import axios from "axios";


const useAxiosFetch = (dataUrl) => {

    const [data, setData] = useState([])
    const [fetchError, setfetchError] = useState(null)
    const [isLoading, setisLoading] = useState(null)
    useEffect(()=>{
        let isMounted = true;
        const source = axios.CancelToken.source();
        const fetchData = async (url)=>{
            setisLoading(true);
            try{
                const response = await axios.get(url, {
                    cancelToken: source.token
                });
                if(isMounted){
                    setData(response.data);
                    setfetchError(null)
                }
            }catch(err){
                if (isMounted){
                    setfetchError(err.message);
                    setData([]);
                }
            } finally{
                isMounted && setisLoading(false)

            }
        }
        fetchData(dataUrl)

        const cleanUp = ()=>{
            
            isMounted = false;
            source.cancel();
        }
        return cleanUp;
    }, [dataUrl])

    return {data, fetchError, isLoading}

}

export default useAxiosFetch
