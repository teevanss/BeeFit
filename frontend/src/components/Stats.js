import { Container } from "react-bootstrap";
import { Calendar2CheckFill } from 'react-bootstrap-icons';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../ThemeContext';
import { UserMenu } from './UserMenu.js';
import Chart from "chart.js/auto";
import { Chart as ChartJS, CategoryScale } from 'chart.js';
import { defaults } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { toast } from 'react-toastify';
import axios from "../Axios.js";
import 'react-toastify/dist/ReactToastify.css';
import '../css/userhomepage.css';
import 'animate.css';

defaults.font.family = 'TelegrafReg, sans-serif';
defaults.font.size = '20px';
defaults.color = 'black';
Chart.register(CategoryScale);

export const Stats = () => {

  const {theme, setTheme} = useContext(ThemeContext);
  
  // Chart doesn't exist yet so leave leabels and data blank
  const [data, setData] = useState({//labels: "Loading",
  datasets: [{
    //data: "Loading",
  }]
  })

  // Send GET request for check-in data for user
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
      }
      )
      .then(response => {
        
        let color = "white"
        if (theme === "light") {
          color = "#5d6700"
        }
        else {
          color = "#261226"
        }

        // Now that we know we have received our data we can set it
        setData ({
          // Get date and only take first 10 characters, example: 01-01-2020
          labels: response.data?.map((item, index) => (item.date.substring(0,10))), // X-axis
          datasets: [{
            label: "Daily Check-in Stats",
            fill: true, // Fill in the area below the line
            tension: 0.3, // Roundness of line
            data: response.data?.map((item, index) => (item.weight)), // Y-axis
            // Make the fill color a gradient 
            backgroundColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              const gradient = canvas.createLinearGradient(160,5,90,120);
              if (theme === "light") {
                gradient.addColorStop(0, 'rgba(183, 156, 0, 0.53)');
                gradient.addColorStop(0.5, 'rgba(92, 102, 0, 0.53)');
              }
              else {
                gradient.addColorStop(0, 'rgba(74, 35, 74, 0.54)');
                gradient.addColorStop(0.5, 'rgba(29, 2, 41, 0.56)');
              }
              return gradient;
            },
            pointBackgroundColor: color,
            borderColor: [
              color,
            ],
            borderWidth: 2.5 // Thickness of line
          }]
        });
      });
        } catch (err) {
          if (!err?.response) {
            toast.error("No server response. We are so sorry!", {
              position: "top-left",
              autoClose: 5000,
              theme: theme,
              });
          } else {
          toast.error("Error Retrieving Check-in Information.", {
              position: "top-left",
              autoClose: 5000,
              theme: theme,
              });
            };
          }
    };
    fetchStats()
    // Run effect if theme changes (to update colors)
  }, [theme])

  // Chart options
  var options = {
    maintainAspectRatio: false,
    plugins: {
        legend: false,
    },
   }

    return ( 

        <section className="user-home-container" id={theme === 'light' ? 'user-home' : 'user-home-dark'}> 
        <Container>

              <h3>Check-in Log <Calendar2CheckFill size={40} color={theme === 'light' ? 'black' : 'white'} className="icon-cal"/></h3>
              <div className="chart"> 
                <Line data={data} height={500} options={options}/>
              </div>

            <UserMenu/>

        </Container>
        </section>
  )
}