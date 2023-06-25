<template>
  <div class="title">
    <h1>Juego</h1>
  </div>
  <div class="principal">
    <slot name="colores" v-if="slotColores">
      <section class="cajas">
        <div id="img1" class="containers amarillo amarillo-caja" @dragover="allowDrop" @drop="drop"></div>
        <div id="img2" class="containers rojo rojo-caja" @dragover="allowDrop" @drop="drop"></div>
        <div id="img3" class="containers verde verde-caja" @dragover="allowDrop" @drop="drop"></div>
      </section>
      <div class="container-imagenes">
        <div v-for="img, index in imgAleatorio" :key="index">
          <img :id="index" :src="require('@/assets/' +img.url)" :class="img.class" draggable="true" @dragstart="drag">
        </div>  
      </div>
    </slot>
    <slot v-else>
      <section class="cajas">
        <div id="img-1" class="containers agua agua-caja" @dragover="allowDrop" @drop="drop"></div>
        <div id="img-2" class="containers tierra tierra-caja" @dragover="allowDrop" @drop="drop"></div>
        <div id="img-3" class="containers aire aire-caja" @dragover="allowDrop" @drop="drop"></div>
      </section>
      <div class="container-imagenes">
        <div v-for="img, index in imgAleatorioAnimales" :key="index">
          <img :id="index" :src="require('@/assets/' +img.url)" :class="img.class" draggable="true" @dragstart="drag">
        </div>  
      </div>
    </slot>
  </div>
  <span v-if="completado">¡Lo lograste!...</span>
</template>
<script setup>
import { ref } from 'vue';
let imgAleatorio = []
let imgAleatorioAnimales = []
const colores = [
  {class: 'amarillo', url: 'amarillo-0.png'},
  {class: 'amarillo', url: 'amarillo-1.png' },
  {class: 'amarillo', url: 'amarillo-2.png'},
  {class: 'rojo', url: 'rojo-0.png'},
  {class: 'rojo', url: 'rojo-1.png' },
  {class: 'rojo', url: 'rojo-2.png' },
  {class: 'verde', url: 'verde-0.png'},
  {class: 'verde', url: 'verde-1.png'},
  {class: 'verde', url: 'verde-2.png'},
  
]

const animales = [
  {class: 'tierra', url: 'tierra-0.png'},
  {class: 'tierra', url: 'tierra-1.png'},
  {class: 'tierra', url: 'tierra-2.png'},
  {class: 'agua', url: 'agua-0.png'},
  {class: 'agua', url: 'agua-1.png'},
  {class: 'agua', url: 'agua-2.png' },
  {class: 'aire', url: 'aire-0.png' },
  {class: 'aire', url: 'aire-1.png'},
  {class: 'aire', url: 'aire-2.png'}, 
]
const arrAleatorio = ref([])
const arrAleatrioAnimales = ref([])
const slotColores = ref(true)
const completado = ref(false)
//const completadoRojo = ref(false)
//const completadoVerde = ref(false)


while (arrAleatorio.value.length < 9) {
  let randomNumber = Math.floor(Math.random() * 9);

  if (!arrAleatorio.value.includes(randomNumber)) {
    arrAleatorio.value.push(randomNumber);
    imgAleatorio.push(colores[randomNumber])

    // console.log(imgAleatorio)
  }
  if (!arrAleatrioAnimales.value.includes(randomNumber)) {
    arrAleatrioAnimales.value.push(randomNumber);
    imgAleatorioAnimales.push(animales[randomNumber])
    // console.log(imgAleatorio)
  }
  // console.log(randomNumber, arrAleatorio)
}


function allowDrop(ev) {
  ev.preventDefault();
}
  
function drop(ev) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text")
  console.log(ev.target.__vnode.props.class)
  //console.log(data)
  //console.log(document.getElementById(data).classList[0])
  if (ev.target.classList.contains(document.getElementById(data).classList[0])) {
    ev.currentTarget.appendChild(document.getElementById(data)) 
    if (ev.target.childNodes.length === 3) {
      ev.target.classList.add('completado')
    }
    let childrens = document.querySelectorAll('.containers')
    if (childrens[0].childNodes.length === 3 && childrens[1].childNodes.length === 3 && childrens[2].childNodes.length === 3) {
      console.log('completado')
    
      slotColores.value = false
      completado.value = true
      setTimeout(() => {
        completado.value = false
      }, 1000);
    
      
    }
  }

}
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

</script>

<style lang="scss">
*, html, ::after, ::before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body{
  background-color: rgb(248, 230, 185);
  height: 100vh;
}

.cajas{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  img{
    max-width: 20%;
  }
}
.completado{
  box-shadow: 0.5px 0.5px 9px rgb(0, 110, 255);
}
.containers{
  width: 80%;
  height: 7rem;
  margin-bottom: 1rem;
  border-radius: 1.5rem;
  padding-top: 1rem;
}
.container-imagenes{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-content: space-evenly;
  height: 85vh;
  width: 100vw;
  border: thin solid black;

  div{
    text-align: center;
  }
}
.title {
  text-align: center;
  margin-bottom: 2rem;
  width: 100%;
}
img{
  max-width: 40%;
}
.principal {
  width: 100%;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
span {
  color: rgb(12, 177, 67);
  background-color: white;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: bolder;
  position: absolute;
  left: 20%;
  top: 35%;
  width: 12rem;
  height: 10rem;
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0.5px 0.5px 9px rgb(32, 32, 32);
}
.amarillo-caja{
  background-color: rgb(255, 238, 0);
}
.rojo-caja{
  background-color: rgb(248, 73, 29);
}
.verde-caja{
  background-color: rgb(6, 221, 78);
}

.agua-caja{
  background-color: rgb(0, 89, 255);
}
.aire-caja{
  background-color: rgb(142, 217, 247);
}
.tierra-caja{
  background-color: rgb(31, 243, 102);
}

@media screen and (min-width: 600px) {

  .containers {
    height: 8rem;
  }

  .cajas {
    justify-content: space-evenly;
  }

  .principal {
  flex-direction: row;
  }
}
</style>