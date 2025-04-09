class Persona{
constructor(nombre, edad, genero){
this.nombre = nombre;
this.edad = edad;
this.genero = genero;
};
//Método Saludar

saludar(){
console.log("Hola" + this.nombre);
}

}