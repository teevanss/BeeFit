import { Container } from "react-bootstrap";
import { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeContext';
import { UserMenu } from './UserMenu.js';
import Chart from "chart.js/auto";
import LineChart from "../components/LineChart";
import { CategoryScale } from "chart.js";
import '../css/userhomepage.css';
import 'animate.css';
import { Data } from "./Data.js";
import axios from "../Axios.js";

Chart.register(CategoryScale);

export const Stats = () => {

    const {theme, setTheme} = useContext(ThemeContext);

    const getUserData = () => {
        axios
            .get("http://localhost:8080/api/checkin?username=tayworo")
            .then(data => console.log(data.data))
            .catch(error => console.log(error));
    };

    getUserData();

    const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.year), 
        datasets: [
          {
            label: "Users Gained ",
            data: Data.map((data) => data.userGain),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0"
            ],
            borderColor: "black",
            borderWidth: 2
          }
        ]
      });



    return ( 

        <section className="user-home" id={theme === 'light' ? 'user-home' : 'user-home-dark'}> 
        <Container>

            <div className="animate__animated animate__zoomIn">
            </div>

            <LineChart chartData={chartData} />
            <UserMenu/>

        </Container>
        </section>
  )
}