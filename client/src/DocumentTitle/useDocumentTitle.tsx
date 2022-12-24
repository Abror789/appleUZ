import React,{useRef,useEffect} from 'react';

type documentProps={
    title:string,
    prevailOnUnmount?:boolean
}

const UseDocumentTitle = (props:documentProps) => {

    const {title}=props
    const {prevailOnUnmount=false}=props

    const defaultTitle = useRef(document.title);

    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => () => {
        if (!prevailOnUnmount) {
            document.title = defaultTitle.current;
        }
    }, [])
};

export default UseDocumentTitle;
