import React, { useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers } from '../redux/userSlice';
import { BASE_URL } from '..';

const useGetOtherUsers = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.authUser?.token); 

    useEffect(() => {
        const fetchOtherUsers = async () => {
            if (!token) {
                console.warn("⚠️ No token found. Skipping fetchOtherUsers");
                return;
            }

            try {
                const res = await axios.get(`${BASE_URL}/api/v1/user`, {
                    headers: {
                        Authorization: `Bearer ${token}` 
                    },
                    withCredentials: true
                });

                console.log("other users -> ", res);
                dispatch(setOtherUsers(res.data));
            } catch (error) {
                console.log(error);
            }
        };

        fetchOtherUsers();
    }, [token, dispatch]);
};

export default useGetOtherUsers;
