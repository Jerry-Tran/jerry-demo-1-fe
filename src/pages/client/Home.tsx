
import { useDispatch } from "react-redux";

import { Button } from "antd";

import { logoutService } from "@/services";


export function Home() {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logoutService())
    }
    return <div>


        <Button onClick={handleLogout}>Logout</Button>
    </div>
}