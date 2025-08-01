import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from "./navbar/Navbar";
import Home from "./home/Home";

function App() {
  const userId = 1; // Test

  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/userdata?userId=${userId}`);
        setUser(res.data);
        // console.log(res.data);
      } catch (err) {
        console.error('Failed to fetch:', err);
      }
    };

    fetchUserData();
  }, []); 
  
  return <div>
    <Navbar />
    <Home user={user}/>    


  </div>

  // const [employees, setEmployees] = useState([])

  // const fetchEmployees = async () => {
  //   try {
  //     const res = await axios.get('http://localhost:8000/employees')
  //     setEmployees(res.data)
  //   } catch (err) {
  //     console.error('Failed to fetch:', err)
  //   }
  // }

  // return (
  //   <div style={{ padding: 20 }}>
  //     <button onClick={fetchEmployees}>Fetch Employees</button>
  //     <ul>
  //       {employees.map(emp => (
  //         <li key={emp.id}>{emp.name} – {emp.position}</li>
  //       ))}
  //     </ul>
  //   </div>
  // )
}

export default App;
