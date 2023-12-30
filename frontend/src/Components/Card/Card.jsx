/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Card = ({ to, bgColor, icon, title, content }) => {
    return (
        <Link to={to}>
            <div className={`w-96 h-56 bg-white rounded-lg m-10 shadow-lg hover:shadow-2xl`}>
                <div className={`w-95 h-12 ${bgColor} rounded-t-lg flex items-center px-8`}>
                    <div className="mt-10 bg-white p-2 rounded-lg">{icon}</div>
                </div>
                <div className="pt-8 px-6">
                    <h1 className="lg:text-2xl font-semibold">{title}</h1>
                    <div className="py-2 px-5">
                        {content.map((heading, index) => (
                            <h2 key={index}> - {heading}</h2>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Card;
