import {Outlet} from "react-router";
import Tasks from "screens/Main/pages/Tasks";

const Main = () => {
    return (
        <div className="h-screen flex">
            <Tasks/>
            <Outlet/>
        </div>
    );
};

export default Main;