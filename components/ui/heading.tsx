import React from "react";

interface HeadingProp {
    title: string;
    description: string;
}
const Heading:React.FC<HeadingProp> = ({title, description}) => {
    return(
        <div >
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            <p className="text-sm text-muted-foregound">{description}</p>
        </div>
    )
}
export default Heading