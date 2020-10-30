
var app = new Vue({
  el:"#app",
  data:{
    clave:'',
    titulo:'',
    descripcion:'',
    lista:[],
    txtBuscar:'',
  },

  //En esta funcion indica que si en consulta es diferente a nada entonces arreglo sera filtrado para encontrar el resultado
  //el tolowercase es para no tener problemas con mayusculas y minusculas
  computed:{
    listaFiltrada:function(){
      var arreglo = this.lista;
      var consulta = this.txtBuscar;
      
      if(consulta!== ""){
        arreglo = arreglo.filter(function(obj){
          return(
            obj.titulo.toLowerCase()+''+obj.descripcion.toLowerCase()
          ).indexOf(consulta.toLowerCase()) > -1
        });
      }

      return arreglo;
    }
  },

  //Aqui esta el boton agregar la funcion esta agregando todo el string con el push
  methods:{
    agregar:function(clave,titulo,descripcion){
      var item = {
        clave: clave,
        titulo: titulo,
        descripcion: descripcion,
      }

      //app.lista.push(item);
      firebase.database().ref("pasatiempos/"+clave).set(item);
      app.recargarLista();
    },

    recargarLista:function(){
      app.lista=[];
      app.listarElementos();
    },

    //Aqui esta obteniendo el indice de la lista  
    eliminar:function(clave){
      //var index = app.lista.map(function(obj){
        //return obj.clave;
      //}).indexOf(clave);

      //Aqui el splice tienes que indicarle de donde vas a eliminar y cuentos vas a eliminar
      //app.lista.splice(index,1);

      //esta es una forma de eliminar elementos desde la base de datos
      firebase.database().ref("pasatiempos/"+clave).remove();
      app.recargarLista();
    },

    //En Esta funcion hace el listado desde la base de datos 
    listarElementos:function(){
      var datos = firebase.database().ref("pasatiempos");

      datos.on("value", function(snapshot){
        snapshot.forEach(function(childSnaphot){
          var childData = childSnaphot.val();
          app.lista.push(childData)
        });
      });
    }
  },

  //En Esta funcion hace la busqueda desde la base de datos 
  created:function(){
    this.listarElementos();
  }

})