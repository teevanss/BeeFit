import { Container } from "react-bootstrap";
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../ThemeContext';
import { UserMenu } from './UserMenu.js';
import Chart from "chart.js/auto";
import { Chart as ChartJS, CategoryScale } from 'chart.js';
import { defaults } from 'chart.js';
import { Line } from 'react-chartjs-2';
import '../css/userhomepage.css';
import 'animate.css';
import axios from "../Axios.js";

defaults.font.family = 'TelegrafReg, sans-serif';
defaults.font.size = '25px';
defaults.color = 'black';
Chart.register(CategoryScale);

export const Stats = () => {

  const {theme, setTheme} = useContext(ThemeContext);
  // Chart doesn't exist yet so leave leabels and data blank
  const [data, setData] = useState({//labels: "Loading",
  datasets: [{
    label: "Daily Check-in Stats",
    //data: "Loading",
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1
  }]
  })

  useEffect(() => {
    const fetchStats = async () => {

      // Send GET request
      try {
        const response = await axios.get("http://localhost:8080/api/checkin?username=tayworo", 
      {
      },
      {
        headers: 
        { 
          "Content-Type": "application/json", 
          "Access-Control-Allow-Origin": "http://localhost:3000",
        }
      })
      .then(response => {
        console.log(response.data);
        // Now that we know we have received our data we can set it
        setData ({
          labels: response.data?.map((item, index) => (item.date.substring(0,10))),
          datasets: [{
            label: "Daily Check-in Stats",
            data: response.data?.map((item, index) => (item.weight)),
            backgroundColor: [
              'black',
            ],
            borderColor: [
              'white',
            ],
            borderWidth: 1
          }]
        });
      });
        } catch (err) {
          if (!err?.response) {
              console.log(err)
            };
          }
    };
    fetchStats()
  }, [])

  var options = {
    maintainAspectRatio: false,
    scales: {
    },
    legend: {
      labels: {
      },
    },
  }
    return ( 

        <section className="user-home" id={theme === 'light' ? 'user-home' : 'user-home-dark'}> 
        <Container>

              <div className="chart"> 
                <Line data={data} height={500} options={options}/>
              </div>

            <UserMenu/>

        </Container>
        </section>
  )
}