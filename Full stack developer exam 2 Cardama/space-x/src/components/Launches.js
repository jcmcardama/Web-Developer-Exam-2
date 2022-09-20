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
                    <div className="container launch-info" key={index}>
                        <div className="launch-image">
                            <img src={item.links.patch.small} alt={item.links.patch.small}></img>
                        </div>
                        <div className="launch-description">
                            <div>
                                {item.flight_number} : {item.name} ({item.date_local.slice(0,4)})
                            </div>
                            <div>
                                Details: {item.details}
                            </div>
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