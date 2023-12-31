// eslint-disable-next-line react/prop-types
export default function ProjectCard({ projectTitle, status, endDate }) {
    const statusColors = {
        'On Hold': 'bg-red-500',
        'In Progress': 'bg-yellow-400',
        'Completed': 'bg-green-400',
    };
    const formattedEndDate = new Date(endDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    const statusColor = statusColors[status] || 'bg-orange-600';

    return (
        <div className="w-[30rem] h-36 bg-white hover:rounded-lg m-10 shadow-lg hover:shadow-inner border-b-[0.5rem] border-orange-500">
            <div className="pt-3 px-4">
                <div className="flex gap-2">
                    <h1 className="lg:text-2xl text-gray-600">Name:</h1>
                    <h1 className="lg:text-2xl font-semibold">{projectTitle}</h1>
                </div>

                <div className="bg-orange-400 w-1/2 h-[3px] rounded-xl mt-2 mb-3"></div>

                <div className="py-2 px-2 flex flex-row gap-4 items-center mt-2 justify-between">
                    <div className="flex items-center gap-2">
                        <h1 className="text-gray-600">Status :</h1>
                        <h1 className={`font-semibold text-slate-600 text-sm rounded-lg p-1 ${statusColor}`}>{status}</h1>
                    </div>
                    <div className="flex">
                        <h1 className="text-gray-600">End Date:</h1>
                        <h1 className="text-gray-800 font-semibold">{formattedEndDate}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
