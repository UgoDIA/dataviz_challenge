import { onMount, createSignal, createResource } from 'solid-js';
import { Chart, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';
import { Line } from 'solid-chartjs';

export function MyChart() {
    // Register chart components
    onMount(() => {
        Chart.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);
    });

    // State for API data
    const [data, setData] = createSignal([]);

    // Fetch data from API
    async function fetchData() {
        try {
            const response = await fetch('https://dataviz-challenge-api.azurewebsites.net/api/prod/');
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Fetch data on component mount
    onMount(fetchData);

    // Prepare chart data
    const chartData = () => ({
        labels: data().map(item => item.year),
        datasets: [
            {
                label: 'Value',
                data: data().map(item => item.value),
            },
        ],
    });

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div>
            <Line data={chartData()} options={chartOptions} width={500} height={500} />
        </div>
    );
}