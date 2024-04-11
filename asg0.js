// asg0.js
function main() {
    canvas = document.getElementById('display');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function handleDrawEvent() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    v1 = new Vector3([document.getElementById('v1x').value, document.getElementById('v1y').value]);
    drawVector(v1, "red");

    v2 = new Vector3([document.getElementById('v2x').value, document.getElementById('v2y').value]);
    drawVector(v2, "blue");
}

function handleDrawOperationEvent() {
    handleDrawEvent();

    let opType = document.getElementById('operation-select').value;
    let scalar = document.getElementById('operation-scalar').value;

    let v3 = new Vector3(), v4 = new Vector3();
    
    if (opType == "Add") {
        v3.set(v1);
        v3.add(v2);
    } else if (opType == "Subtract") {
        v3.set(v1);
        v3.sub(v2);
    } else if (opType == "Multiply") {
        v3.set(v1);
        v4.set(v2);
        v3.mul(scalar);
        v4.mul(scalar);
    } else if (opType == "Divide") {
        v3.set(v1);
        v4.set(v2);
        v3.div(scalar);
        v4.div(scalar);
    } else if (opType == "Angle Between") {
        angleBetween(v1, v2);
    } else if (opType == "Magnitude") {
        console.log("Magnitude v1: " + v1.magnitude())
        console.log("Magnitude v2: " + v2.magnitude());
    } else if (opType == "Normalize") {
        v3.set(v1);
        v4.set(v2);
        v3.normalize();
        v4.normalize();
    } else if (opType == "Area") {
        areaTriangle(v1, v2);
    }

    drawVector(v3, "green");
    drawVector(v4, "green");
}


function drawVector(vec, color) {  
    let cx = canvas.width/2; 
    let cy = canvas.height/2;

    ctx.beginPath();  
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + vec.elements[0] * 20, cy + vec.elements[1] * 20);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
};

function angleBetween(v1, v2) {
    let dot = Vector3.dot(v1, v2);
    let angle = Math.acos([dot/(v1.magnitude()*v2.magnitude())]);
    
    console.log("Angle " + angle * 180/Math.PI); 
}

function areaTriangle(_v1, _v2) {
    let cross = Vector3.cross(_v1, _v2);
    let area = 0.5 * cross.magnitude();
    console.log("Area of the triangle: " + area);
}
