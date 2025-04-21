class Persona {
  constructor(nombre, edad, genero) {
    this.nombre = nombre;
    this.edad = edad;
    this.genero = genero;
  }

  // Método Saludar 
  saludar() {
    console.log("Hola " + this.nombre);
  }

  //Método cumpleaños
  cumpleanios(){
    return this.edad++
  }
}

class Estudiante extends Persona {
  constructor(nombre, edad, genero, curso, notas = []) {
    super(nombre, edad, genero);
    this.curso = curso;
    this.notas = Array.isArray(notas) ? notas : [];
  }

  // Método para calcular el promedio 
  notasPromedio() {
    let suma = 0;
    for (let i = 0; i < this.notas.length; i++) {
      suma += this.notas[i];
    }
    return suma / this.notas.length; 
  }
}

class Profesor extends Persona {
  constructor(nombre, edad, genero, asignatura, nivel) {
    super(nombre, edad, genero);
    this.asignatura = asignatura;
    this.nivel = nivel;
  }

  // Setter para asignar una nota a un estudiante 
  setNota(estudiante, nota) {
    if (nota >= 0 && nota <= 10) {
      estudiante.notas.push(nota); // Añade la nota al array del estudiante
    } else {
      console.log("La nota debe estar entre 0 y 10");
    }
  }
}

//DATOS DE PRUEBA
// Crear un estudiante
const estudiante1 = new Estudiante("Ana", 20, "Femenino", "Programación", [7, 8, 9]);
console.log(estudiante1.notasPromedio()); // 8

// Crear un profesor
const profesor1 = new Profesor("Carlos", 45, "Masculino", "Matemáticas", "Universidad");

// Profesor asigna nota al estudiante
profesor1.setNota(estudiante1, 10);
console.log(estudiante1.notas); // [7, 8, 9, 10]
