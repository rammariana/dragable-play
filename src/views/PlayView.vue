<template>
<h1>Juego</h1>
<section>
  <div class="containers">1</div>
  <div class="containers">2</div>
  <div class="containers">3</div>
</section>
<section>
  <div v-for="img, index in imgAleatorio" :key="index">
    <img :src="require('@/assets/' +img.url)" :class="img.class">
  </div>  
</section>
</template>
<script setup>
import { ref } from 'vue';
let imgAleatorio = []
const imagenes = [
  {class: 'amarillo', url: 'amarillo-0.png'},
  {class: 'amarillo', url: 'amarillo-1.png'},
  {class: 'rojo', url: 'rojo-0.png'},
  {class: 'rojo', url: 'rojo-1.png'},
]
const arrAleatorio = ref([])


while (arrAleatorio.value.length < 3) {
  let randomNumber = Math.floor(Math.random() * 3);

  if (!arrAleatorio.value.includes(randomNumber)) {
    arrAleatorio.value.push(randomNumber);
    imgAleatorio.push(imagenes[randomNumber])
    console.log(imgAleatorio)
  }
  console.log(randomNumber)
}

console.log(arrAleatorio.value);

  

</script>

<style>
img{
  width: 20%;
}
</style>