import React, {CSSProperties} from 'react';
import BeatLoader from "react-spinners/BeatLoader";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

type TableLoadProps={
    loading:boolean
}

const SectionLoad = (props:TableLoadProps) => {
    const {loading}=props
    return (
        <>
            {loading
                ?
                <div className={"section_load"}>
                    <BeatLoader
                        color={"#000"}
                        loading={loading}
                        cssOverride={override}
                        size={25}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
                :
                null
            }
        </>
    );
};

export default SectionLoad;
