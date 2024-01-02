import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AcceptRequest, AllRequest, findMember, sendRequest } from "../../Services/chatService";
import MemberCard from "../MemberCart/MemberCart";


export default function SearchMember() {
    const [SearchMember, setSearchMember] = useState([]);
    const [request, setRequest] = useState();
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


    useEffect(() => {

        const fetchRequest = async () => {
            try {
                const frinedRequest = await AllRequest();
                setRequest(frinedRequest);
            } catch (error) {
                console.log(error);
            }
        }

        fetchRequest();
    }, [])


    const handleSendRequest = async (friendId) => {
        try {
            const response = await sendRequest(friendId);
            console.log("Request response =>", response);

            if (response.success === true) {
                toast.success(response.message);
            }

            if (response.success === false) {
                toast.error(response.message, {
                    icon: '🕛'
                })
            }
        } catch (error) {
            console.log("ERROR IN SENDING REQUEST", error);
            toast.error("Request not send ! , try again");
        }
    }


    const handleacceptRequest = async (RequestId) => {
        try {
            await AcceptRequest(RequestId);
            toast.success("Request accept successfully ", {
                icon: '✌️'
            })
        } catch (error) {
            console.log("Error in accepting", error);
            toast.error("Could not accept the request ! , try again");
        }
    }

    return (
        <div className="pt-20">
            <div className="bg-gray-100 h-screen flex justify-center pt-12">
                <div className="bg-white h-auto w-[90%] mb-auto">
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
                            {SearchMember && SearchMember.length > 0 ? (
                                SearchMember.map((member) => (
                                    <MemberCard
                                        key={member._id}
                                        memberName={member.name}
                                        memberInsitutionName={member.InsitutionName}
                                        memberEmail={member.email}
                                        memberId={member._id}
                                        onSendRequest={handleSendRequest}
                                        buttonNm={"Send Request"}
                                        buttonCol={"green"}
                                    />
                                ))
                            ) : (
                                <div className="flex items-center justify-center">
                                    <Link to="/chat">
                                        <h1 className='bg-gray-600 text-white text-md rounded-md p-2'>
                                            No Student Found! Click to go back
                                        </h1>
                                    </Link>
                                </div>
                            )}
                        </div>


                        <div className="flex flex-col p-5">
                            <label className="font-semibold lg:text-2xl">Request for you</label>
                            <div className="grid grid-cols-3">
                                {request && request.length > 0 ? (
                                    request.map((frinedRequest) => (
                                        <MemberCard
                                            key={frinedRequest._id}
                                            memberId={frinedRequest._id}
                                            memberName={frinedRequest.sender.name}
                                            memberInsitutionName={frinedRequest.sender.InsitutionName}
                                            memberEmail={frinedRequest.sender.email}
                                            onSendRequest={handleacceptRequest}
                                            buttonNm={"Accept Request"}
                                            buttonCol={"blue"}
                                        />
                                    ))
                                ) : (
                                    <div className="flex items-center justify-center">
                                            <h1 className='bg-gray-600 text-white text-md rounded-md p-2'>
                                                No Request Found!
                                            </h1>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}