import React, {useEffect} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

type BannerProps={
    status:string,
    list:{
        _id:String,
        title:String,
        desc?:String,
        source:String,
        isShow:Boolean,
        createdAt:String,
        updatedAt:String,
        __v:Boolean
    }[]
}

const Banner = (props:BannerProps) => {
   const {status}=props
   const {list}=props


    return (
        <section className={"banner"}>
            <Carousel infiniteLoop={true}>
                {list.map((item)=>{
                    const {_id,title,desc,source}=item
                    return(
                        <div key={Number(_id)}>
                            <div className={"textWrapper"}>
                                <span>Yangi</span>
                                <h2>{title}</h2>
                                {desc && <p>{desc}</p>}
                                <a href='#'>Sotib olish</a>
                            </div>
                            <div className={"videoWrapper"}>
                                {item.source.includes('mp4')?
                                    <video width="100%" height="100%"  loop autoPlay muted>
                                        <source src={`http://localhost:5000/images/${source}`} type="video/mp4"/>
                                        <source src={`http://localhost:5000/images/${source}`} type="video/webm"/>
                                    </video>
                                    :
                                    <img src={`http://localhost:5000/images/${source}`} alt=""/>
                                }

                            </div>
                        </div>
                    )
                })}
            </Carousel>
            <svg xmlns='http://www.w3.org/2000/svg' fill='%23fff' width='8' height='8' viewBox='0 0 8 8'><path d='M5.25 0l-4 4 4 4 1.5-1.5L4.25 4l2.5-2.5L5.25 0z'/></svg>
        </section>
    );
};

export default Banner;
