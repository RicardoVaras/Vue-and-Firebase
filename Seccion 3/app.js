
//Aqui estoy haciendo el componente y el template es el estilo del componente
//Aqui el props esta obteniendo el valor que colocaste en el html
//Aqui en metodo esta llamando una funcion y en el boton se integra con el click
Vue.component('mi-primer-componente',{
  props:['msg'],
  template:'<div class="alert alert-primary" role="alert"><button class="btn btn-primary" v-on:click="saludar(msg)">click</button>{{msg}}</div>',
  methods:{
    saludar:function(){
      alert("Hola" + " " + this.msg)
    }
  }
})

var app = new Vue({
  el:"#app",
  data:{

  }
})