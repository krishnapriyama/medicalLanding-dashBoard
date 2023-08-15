import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const token = localStorage.getItem("accessToken");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://dev.hospitalbooking.in/doctors",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggle = async (doctorId, isAvailable) => {
    try {
      await axios.patch(
        `https://dev.hospitalbooking.in/doctors/${doctorId}`,
        {
          isAvailable: !isAvailable,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((response)=>{
        console.log(response)
      })
      
      fetchData(); // Refresh data after toggling
    } catch (error) {
      console.error("Error toggling availability:", error);
    }
  };

  return (
    <div className="dark:text-white mt-20">
      <div className="max-w-2xl mx-auto">
        <table className="w-full bg-white border border-gray-300 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Doctor Name</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Availability</th>
            </tr>
          </thead>
          <tbody>
            {data.map((doctor, index) => (
              <tr key={index}>
                <td className="border text-center px-4 py-2">{doctor.name}</td>
                <td className="text-center border px-4 py-2">
                  {doctor.department}
                </td>
                <td className="text-center border px-4 py-2">
                  <button
                    onClick={() => handleToggle(doctor._id, doctor.isAvailable)}
                    className={`${
                      doctor.isAvailable ? "bg-green-500" : "bg-red-500"
                    } hover:bg-opacity-75 text-white font-bold py-1 px-3 rounded`}
                  >
                    {doctor.isAvailable ? "Available" : "Unavailable"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
