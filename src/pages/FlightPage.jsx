import FlightList from "../components/FlightList";
import SearchFlight from "../components/SearchFlight";
import '../style/FlightPage.css';

function FlightPage() {

    return (
        <div className="flight-page">
            <div className="search-box">
                <SearchFlight />
            </div>

            <div className="list-section">
                <FlightList />
            </div>
        </div>
    );
}

export default FlightPage;
