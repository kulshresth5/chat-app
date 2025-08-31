import React, { useEffect } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from '../redux/userSlice';
import { BASE_URL } from '..';

const useGetOtherUsers = () => {
    const dispatch = useDispatch();

     const token = useSelector((state) => state.user?.token) || localStorage.getItem("token");

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                 if (!token) {
                    console.warn("⚠️ No token found. Skipping fetchOtherUsers");
                    return;
                }

                const res = await axios.get(`${BASE_URL}/api/v1/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });

                console.log("other users -> ",res.data);
                dispatch(setOtherUsers(res.data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchOtherUsers();
    }, [token,dispatch])

}

export default useGetOtherUsers
