import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../Hooks/useAuth"


export default function ProfilePage() {

    const { student, UpdateStudent } = useAuth();
    const [form, setForm] = useState({
        name: student.name,
        email: student.email,
        InsitutionName: student.InsitutionName,
        password: "",
        confirmPassword: ""
    })
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {

            const isPasswordUpdated = form.password.trim().length > 0;

            if (isPasswordUpdated && form.password !== form.confirmPassword) {
                toast.error("Password must match");
                return;
            }


            ///password change thayu hoi toj send karu nakar nhi
            const updatePayload = isPasswordUpdated
                ? { ...form, password: form.password }
                : { ...form, password: undefined };

            const updatedProfile = await UpdateStudent(updatePayload);

            if (updatedProfile && updatedProfile.update === true) {

                setForm((prevForm) => ({
                    ...prevForm,
                    name: updatedProfile.name,
                    email: updatedProfile.email,
                    InsitutionName: updatedProfile.InsitutionName,
                }));

                toast.success("Profile updated successfully");
            } else {
                toast.error("Please try again !");
            }
        } catch (error) {
            toast.error("Please try again");
            console.log("Error, please try again:", error);
        }
    };



    const handleInputChange = (e) => {
        setForm((prevForm) => ({
            ...prevForm,
            [e.target.name]: e.target.value
        }));
    }

    console.log(student);
    return (
        <div className="pt-20 bg-gray-100 h-screen flex justify-center items-center">

            <div className="flex justify-center items-center py-3 m-5">
                <div className="bg-white shadow-lg w-[70rem] h-auto grid grid-cols-3 border-b-4 border-r-4 border-gray-500">
                    <div className="p-10">
                        <h1 className="font-semibold lg:text-3xl">Profile</h1>
                        <h1 className="font-semibold text-gray-500 lg:text-xl ml-1 mt-4">Can update detials</h1>
                    </div>

                    <div className="grid grid-cols-2 py-10">
                        <form>
                            <div className="flex flex-col m-2">
                                <label className="font-semibold text-lg">Name : </label>
                                <input
                                    value={form.name}
                                    required
                                    onChange={handleInputChange}
                                    type="text" name="name" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[30rem] font-bold mb-2"></input>
                            </div>
                            <div className="flex flex-col m-2">
                                <label className="font-semibold text-lg">Email : </label>
                                <input
                                    value={form.email}
                                    required
                                    onChange={handleInputChange}
                                    type="email" name="email" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[30rem] font-bold mb-2"></input>
                            </div>
                            <div className="flex flex-col m-2 justify-between">
                                <label className="font-semibold text-lg">Insitution Name : </label>
                                <input
                                    value={form.InsitutionName}
                                    required
                                    onChange={handleInputChange}
                                    type="text" name="InsitutionName" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[30rem] font-bold mb-2"></input>
                            </div>
                            <div className="flex flex-col m-2 justify-between">
                                <label className="font-semibold text-lg">Update Password : </label>
                                <input
                                    onChange={handleInputChange}
                                    placeholder="Enter new password"
                                    type="password" name="password" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[30rem] font-bold mb-2"></input>
                            </div>
                            <div className="flex flex-col m-2 justify-between">
                                <label className="font-semibold text-lg">Confirm new password : </label>
                                <input
                                    onChange={handleInputChange}
                                    placeholder="Enter new password again"
                                    type="password" name="confirmPassword" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[30rem] font-bold mb-2"></input>
                            </div>
                            <div className="flex flex-col mt-5">
                                <button type="submit"
                                    onClick={handleUpdate}
                                    className="bg-blue-500 hover:bg-blue-700 hover:rounded-[3rem] text-white font-bold py-2 px-4 w-[12rem] rounded">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </div>
    )
}
