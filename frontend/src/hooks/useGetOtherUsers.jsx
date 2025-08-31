import React, { useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers } from '../redux/userSlice';
import { BASE_URL } from '..';

const useGetOtherUsers = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user?.token); 

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${BASE_URL}/api/v1/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    }
                });

                console.log("other users -> ", res.data);
                dispatch(setOtherUsers(res.data));
            } catch (error) {
                console.log(error);
            }
        };

        if (token) {
            fetchOtherUsers();
        } else {
            console.warn("⚠️ No token found. Skipping fetchOtherUsers");
        }
    }, [token, dispatch]); // 👈 re-run when token changes
};

export default useGetOtherUsers;
