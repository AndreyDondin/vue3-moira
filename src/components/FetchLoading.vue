<template>
  <div>
    <p>З</p>
    <p>А</p>
    <p>Г</p>
    <p>Р</p>
    <p>У</p>
    <p>З</p>
    <p>К</p>
    <p>А</p>
  </div>
</template>
<style scoped>
* {
  margin: 0;
}

body {
  display: flex;
  width: 100vw;
  height: 100vh;
  background: black;
  align-items: center;
  justify-content: center;
}

div {
  position: absolute;
  margin-left: -150px;
  margin-top: -40px;
  left: 50%;
  top: 50%;
  text-align: center;
}

p {
  display: inline-block;
  text-transform: uppercase;
  text-align: center;
  font-size: 4em;
  font-family: arial;
  font-weight: 600;
  transform: scale(0.5);
  color: #121212;
  -webkit-text-stroke: 2px gray;
}

p:nth-child(1) {
  animation: hover 1s linear infinite;
}

p:nth-child(2) {
  animation: hover 1s linear infinite 0.125s;
}

p:nth-child(3) {
  animation: hover 1s linear infinite 0.25s;
}

p:nth-child(4) {
  animation: hover 1s linear infinite 0.375s;
}

p:nth-child(5) {
  animation: hover 1s linear infinite 0.5s;
}

p:nth-child(6) {
  animation: hover 1s linear infinite 0.675s;
}

p:nth-child(7) {
  animation: hover 1s linear infinite 0.75s;
}
p:nth-child(8) {
  animation: hover 1s linear infinite 0.875s;
}

@keyframes hover {
  0% {
    transform: scale(0.5);
    color: #121212;
    -webkit-text-stroke: 2px gray;
  }

  20% {
    transform: scale(1);
    color: pink;
    -webkit-text-stroke: 3px red;
    filter: drop-shadow(0 0 1px black) drop-shadow(0 0 1px black)
      drop-shadow(0 0 3px red) drop-shadow(0 0 5px red) hue-rotate(10turn);
  }

  50% {
    transform: scale(0.5);
    color: #121212;
    -webkit-text-stroke: 2px gray;
  }
}
</style>
