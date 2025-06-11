let trator;
let frutas = [];
let cidade;
let campo;
let entregues = 0;
let festa = false;
let festaTimer = 0;

function setup() {
  createCanvas(800, 400);
  
  trator = createVector(100, height/2);
  
  for (let i = 0; i < 5; i++) {
    frutas.push(createVector(random(50, 300), random(50, height - 50)));
  }
  
  cidade = createVector(width - 100, height/2);
  campo = createVector(100, height/2);
}

function draw() {
  background(200, 250, 200);
  
  // Desenhar campo
  fill(100, 200, 100);
  rect(0, 0, width / 2, height);
  
  // Desenhar cidade
  fill(180);
  rect(width / 2, 0, width / 2, height);
  
  // Desenhar cidade icônica
  fill(80);
  rect(cidade.x - 30, cidade.y - 60, 60, 60);
  rect(cidade.x - 10, cidade.y - 90, 20, 30);
  
  // Desenhar trator
  fill(255, 0, 0);
  rect(trator.x - 15, trator.y - 10, 30, 20);
  
  // Desenhar frutas
  for (let f of frutas) {
    fill(255, 150, 0);
    ellipse(f.x, f.y, 20);
  }
  
  // Movimento trator
  if (keyIsDown(LEFT_ARROW)) trator.x -= 2;
  if (keyIsDown(RIGHT_ARROW)) trator.x += 2;
  if (keyIsDown(UP_ARROW)) trator.y -= 2;
  if (keyIsDown(DOWN_ARROW)) trator.y += 2;
  
  trator.x = constrain(trator.x, 0, width);
  trator.y = constrain(trator.y, 0, height);
  
  // Coletar frutas
  for (let i = frutas.length - 1; i >= 0; i--) {
    if (dist(trator.x, trator.y, frutas[i].x, frutas[i].y) < 20) {
      frutas.splice(i, 1);
    }
  }
  
  // Entregar na cidade
  if (frutas.length == 0 && dist(trator.x, trator.y, cidade.x, cidade.y) < 30) {
    entregues++;
    for (let i = 0; i < 5; i++) {
      frutas.push(createVector(random(50, 300), random(50, height - 50)));
    }
    festa = true;
    festaTimer = 60;
  }
  
  // Mostrar número de entregas
  fill(0);
  textSize(20);
  text("Entregas: " + entregues, 10, 30);
  
  // Festa
  if (festa) {
    for (let i = 0; i < 50; i++) {
      fill(random(255), random(255), random(255));
      ellipse(random(width), random(height), random(5, 15));
    }
    festaTimer--;
    if (festaTimer <= 0) {
      festa = false;
    }
  }
}
