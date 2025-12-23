import { useEffect } from "react"
import { serverURl } from "../utils/ServerUrl"
import axios from "axios"
import { useDispatch } from "react-redux"
import { setUserData } from "../redux/userSlice"

const useCurrentUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const fetchUser = async () => {
        const res = await axios.get(`${serverURl}/api/users/me`,{withCredentials:true});
        dispatch(setUserData(res.data));
      }
      
      fetchUser();
    } catch (error) {
      console.log(error);
      dispatch(setUserData(null));
    }
    
  },[])
}

export default useCurrentUser
