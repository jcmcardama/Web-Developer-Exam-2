import {useEffect, useState} from "react";
import {retrieveLaunches} from "../api/api-launches.js"
import Loading from "./Loading.js";

const Launches = () => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        async function listLaunches(){
            const launchesArray = await retrieveLaunches();
            setData(launchesArray);
        }
        listLaunches();
    });
    
    return(
        <div>
            <div className="launch-container">
                {data.map((item, index) => (
                    <div className="container" key={index}>
                        {item.flight_number} : {item.name} ({item.date_local.slice(0,4)})
                        <div>
                            Details: {item.details}
                        </div>
                    </div>
                ))}  
            </div>
            {isLoading ? (
                <div>
                    End of Page
                </div>
            ) : (
                <div>
                    <Loading />
                </div>
            )
            }
        </div>
    );
};
export default Launches;