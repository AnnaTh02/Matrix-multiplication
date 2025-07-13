//JS program to multiply two square matrices

console.log("Experimental runs started");

const N = 1000;

let end; 
let start;
let ex_time; 

//function to generate random matrix
function generateMatrix(N){

    let matrix = new Array(N);
    for(let i = 0; i < N; i++){
        matrix[i] = new Array(N);
        for(let j = 0; j < N; j++){
            matrix[i][j] = Math.floor(Math.random() * 10); //random nums 0 - 9
        }
    }
    return matrix;
}

//This function multiplies mat1[][] and mat2[][], and stores the result in res[][]

function multiply(mat1, mat2, res){

    let i, j, k;

    //res = new Array(N);
    for(i = 0; i < N; i++){
        //res[i] = new Array(N);
        for(j = 0;  j < N; j++){
            res[i][j] = 0;
            for(k = 0; k < N; k++){
                res[i][j] += mat1[i][k] * mat2[k][j];
            }
        }
    }
}


//async function to run experiment
const runs = 50;
const timings = [];

async function runExperiment(){
    //test the code with a for loop
    for(let t = 0; t < runs; t++){
        let mat1 = generateMatrix(N);
        let mat2 = generateMatrix(N);

        //measure execution time
        start = performance.now();

        //to store result
        let res = new Array(N);
        for(let k = 0; k < N; k++){
            res[k] = new Array(N);
        }

        multiply(mat1, mat2, res);

        end = performance.now();
        ex_time = end - start; 

        // console.log("Result matrix is: \n");
        // for(let i = 0; i < N; i++){
        //     for(let j = 0; j < N; j++){
        //         console.log(res[i][j] + " ");
        //     }
        //     console.log("\n");
        // }

        console.log(`Run ${t+1}: Execution time: ${ex_time.toFixed(2)} ms`);
        timings.push(ex_time);


    }

    console.log("The experiment runs have ended");

    plotTimings();
}

function plotTimings(){
    //Plot the timings
    const canvas = document.getElementById('chart');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const padding = 50; 
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;

    const maxTime = Math.max(...timings);
    const minTime = Math.min(...timings);
    const scaleY = height / (maxTime - minTime); 
    const scaleX = width / (timings.length - 1); 

    //Draw axes
    ctx.strokeStyle='black'
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    //Y-axis labels and ticks
    ctx.fillStyle = 'black';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    const steps = 5;
    for(let i = 0; i <= steps; i++){
        const val = minTime + (i * (maxTime - minTime)) / steps; 
        const y = canvas.height - padding - (val - minTime) * scaleY;
        ctx.fillText(val.toFixed(1) + ' ms', padding - 10, y);
        ctx.beginPath();
        ctx.moveTo(padding - 5, y);
        ctx.lineTo(padding, y);
        ctx.stroke();
    }

    //X-axis labels
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    const labelCount = Math.min(10, timings.length);
    for(let i = 0; i < labelCount; i++){
        const index = Math.floor((i / (labelCount - 1)) * (timings.length - 1));
        const x = padding + index * scaleX;
        ctx.fillText(index + 1, x, canvas.height - padding + 5);
        ctx.beginPath();
        ctx.moveTo(x, canvas.height - padding); 
        ctx.lineTo(x, canvas.height - padding + 5);
        ctx.stroke();
    }

    //Draw performance line
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding - (timings[0] - minTime) * scaleY);

    for(let k = 0; k <timings.length; k++){
        const x = padding + k * scaleX;
        const y = canvas.height - padding - (timings[k] - minTime) * scaleY;
        ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'green';
    ctx.setLineDash([]); //solid line
    ctx.stroke();

    //draw average line
    const avg = timings.reduce((a, b) => a + b, 0) / timings.length; 
    const avgY = canvas.height - padding - (avg - minTime) * scaleY;
    ctx.beginPath();
    ctx.moveTo(padding, avgY);
    ctx.lineTo(canvas.width - padding, avgY);
    ctx.strokeStyle = 'red';
    ctx.setLineDash([5, 5]);
    ctx.stroke();

    //draw legend
    ctx.setLineDash([]);
    ctx.fillStyle = 'black';
    ctx.fillText("Legend: ", canvas.width - padding - 75, padding);

    ctx.strokeStyle = 'green';
    ctx.beginPath();
    ctx.moveTo(canvas.width - padding - 80, padding + 15);
    ctx.lineTo(canvas.width - padding - 50, padding + 15);
    ctx.stroke();
    ctx.fillText("Run time", canvas.width - padding -  25, padding + 15);

    ctx.strokeStyle = 'red';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(canvas.width - padding - 80, padding + 35);
    ctx.lineTo(canvas.width - padding - 50, padding + 35);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillText("Avg time", canvas.width - padding - 25, padding + 35);

    console.log(`Average time: ${avg.toFixed(2)} ms`);
}

runExperiment();

// Driver code
// let i, j; 

// let mat1 = generateMatrix(N);
// let mat2 = generateMatrix(N);

//HARD CODED MATRICES
// let mat1 = [[1, 1, 1, 1],
//         [2, 2, 2, 2],
//         [3, 3, 3, 3],
//         [4, 4, 4, 4]];
// let mat1 = [[2, 4],
//             [1, 4]];

// let mat2 = [[1, 1, 1, 1],
//             [2, 2, 2, 2],
//             [3, 3, 3, 3],
//             [4, 4, 4, 4]];
// let mat2 = [[1, 4],
//             [1, 3]];



