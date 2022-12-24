import { useState, CSSProperties } from "react";
import BeatLoader from "react-spinners/BeatLoader";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const PageLoad = () => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#000");
    return (
        <div className={"page_load"}>
            <BeatLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default PageLoad;
