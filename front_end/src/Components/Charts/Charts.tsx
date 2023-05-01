import { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import VacationsContext from "../../Context/VacationContext/VacationContext";
import VacationModel from "../../Models/VacationModel";
import getRandomColor from "../../Services/createRandomColor";
import "./Charts.css"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

export default function Charts(){
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const {vacations} = useContext(VacationsContext);
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Vacations Likes Chart',
        },
      },
    }

    const [datasets, setDatasets] = useState([]);

    useEffect(()=>{
      setDatasets(vacations.map((v: VacationModel) => ({label: v.destination, data: [v.likes], backgroundColor: getRandomColor()})))
    }, [vacations]);


    const data = {
      labels: ["vacations"], 
      datasets
    }

    console.log(data);
    
    return (
        <div className="Charts">
           <Bar options={options} data={data} />
        </div>
    )
}




