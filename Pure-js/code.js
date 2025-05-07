//JS program to multiply two square matrices

console.log("Hello world");

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

        console.log(`Run ${t+1}: Execution time with Web Worker: ${ex_time.toFixed(2)} ms`);
        timings.push(ex_time);


    }

    console.log("The experiment runs have ended");

    plotTimings();
}

function plotTimings(){
    //Plot the timings
    const canvas = document.getElementById('chart');
    const ctx = canvas.getContext('2d');

    const maxTime = Math.max(...timings);
    const scaleY = canvas.height / maxTime; 
    const scaleX = canvas.width / runs; 

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(0, canvas.height - timings[0] * scaleY);

    for(let k = 0; k <timings.length; k++){
        ctx.lineTo(k * scaleX, canvas.height - timings[k] * scaleY);
    }

    ctx.strokeStyle = 'green';
    ctx.setLineDash([]); //solid line
    ctx.stroke();

    //draw average line
    const avg = timings.reduce((a, b) => a + b, 0) / timings.length; 
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - avg * scaleY);
    ctx.lineTo(canvas.width, canvas.height - avg * scaleY);
    ctx.strokeStyle = 'red';
    ctx.setLineDash([5, 5]);
    ctx.stroke();

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



