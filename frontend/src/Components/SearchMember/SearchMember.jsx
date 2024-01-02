import { useEffect, useState } from "react";
import { findMember } from "../../Services/studentServices";

export default function SearchMember() {
    const [SearchMember, setSearchMember] = useState([]);
    const [filters, setFilters] = useState({
        keywordSearch: "",
    });

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                // console.log(filters)
                const searchData = await findMember(filters);
                setSearchMember(searchData);
            } catch (error) {
                console.log(error);
                setSearchMember([]); 
            }
        };

        fetchMembers();
    }, [filters]);

    const HandleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="pt-20">
            <div className="bg-gray-100 h-screen flex justify-center pt-12">
                <div className="bg-white h-[90%] w-[90%]">
                    <div className="flex flex-col">
                        <div className="flex flex-col p-5">
                            <label className="font-semibold lg:text-2xl">Search</label>
                            <input
                                onChange={HandleChange}
                                type="text"
                                name="keywordSearch"
                                className="p-1 border-2 border-gray-200 focus:outline-none rounded-lg bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-full"
                                placeholder="Enter word"
                            />
                        </div>

                        <div className="grid grid-cols-3">
                            {Array.isArray(SearchMember) &&
                                SearchMember.map((member) => (
                                    <div key={member._id} className="w-[30rem] h-32 bg-gray-100 m-5 shadow-lg">
                                        <div className="pt-3 px-4">

                                            <div className="flex gap-2">
                                                <h1 className="lg:text-xl text-gray-600">Name:</h1>
                                                <h1 className="lg:text-xl font-semibold">{member.name}</h1>
                                            </div>
                                            <div className=" flex flex-row gap-4 items-center mt-2 justify-between">
                                                <div className="flex items-center gap-2">
                                                    <h1 className="text-gray-600">Institution Name:</h1>
                                                    <h1 className={`font-bold text-black text-sm rounded-lg p-1`}>{member.InsitutionName}</h1>
                                                </div>
                                                <div className="flex">
                                                    <h1 className="text-gray-600">Email:</h1>
                                                    <h1 className={`font-bold text-black text-sm rounded-lg p-1`}>{member.email}</h1>
                                                </div>
                                            </div>

                                            <div className="mt-2">
                                                <button className="p-1 m-auto bg-green-400 rounded-md text-white font-bold hover:rounded-lg hover:shadow-inner shadow-lg">
                                                    Send Request
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}