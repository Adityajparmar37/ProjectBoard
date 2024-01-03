
// eslint-disable-next-line react/prop-types
const MemberCard = ({ memberName, memberInsitutionName, memberEmail, memberId, buttonNm, buttonCol, onSendRequest }) => {
    return (
        <div className="w-[30rem] h-32 bg-gray-100 m-5 shadow-lg">
            <div className="pt-3 px-4">
                <div className="flex gap-2">
                    <h1 className="lg:text-xl text-gray-600">Name:</h1>
                    <h1 className="lg:text-xl font-semibold">{memberName}</h1>
                </div>
                <div className="flex flex-row gap-4 items-center mt-2 justify-between">
                    <div className="flex items-center gap-2">
                        <h1 className="text-gray-600">Institution Name:</h1>
                        <h1 className={`font-bold text-black text-sm rounded-lg p-1`}>{memberInsitutionName}</h1>
                    </div>
                    <div className="flex">
                        <h1 className="text-gray-600">Email:</h1>
                        <h1 className={`font-bold text-black text-sm rounded-lg p-1`}>{memberEmail}</h1>
                    </div>
                </div>
                <div className="mt-2">
                    <button
                        onClick={() => onSendRequest(memberId)}
                        className={`p-1 m-auto bg-${buttonCol}-400 rounded-md text-white font-bold hover:bg-${buttonCol}-600 hover:rounded-lg hover:shadow-inner shadow-lg`
                        }>
                        {buttonNm}
                    </button>
                    {
                        buttonNm === "Accept Request" ? (
                            <button
                                // onClick={() => onSendRequest(memberId)}
                                className={`p-1 m-auto bg-red-400 rounded-md text-white font-bold hover:bg-red-600 hover:rounded-lg hover:shadow-inner shadow-lg ml-48`
                                }>
                                Reject Request
                            </button>
                        ) : null
                    }
                </div>
            </div>
        </div>
    );
};

export default MemberCard;