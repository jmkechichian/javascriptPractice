# javascriptPractice
<h1>Some JS Practivce</h1>

<h2>.sort() Guide</h2>

//Función de comparación
//Para ordenar números correctamente:

const numeros = [10, 2, 1, 5, 20];
numeros.sort((a, b) => a - b);
console.log(numeros); // [1, 2, 5, 10, 20] (orden ascendente)

//Orden descendente
const numeros = [10, 2, 1, 5, 20];
numeros.sort((a, b) => b - a);
console.log(numeros); // [20, 10, 5, 2, 1]

//Ordenar objetos por propiedad
const personas = [
  { nombre: 'Juan', edad: 30 },
  { nombre: 'Ana', edad: 25 },
  { nombre: 'Carlos', edad: 35 }
];

// Ordenar por edad (ascendente)
personas.sort((a, b) => a.edad - b.edad);
console.log(personas);
/*
[
  { nombre: 'Ana', edad: 25 },
  { nombre: 'Juan', edad: 30 },
  { nombre: 'Carlos', edad: 35 }
]
////////////
//Ordenar por múltiples criterios
const productos = [
  { nombre: 'Laptop', precio: 1000, stock: 5 },
  { nombre: 'Mouse', precio: 25, stock: 10 },
  { nombre: 'Teclado', precio: 100, stock: 8 },
  { nombre: 'Monitor', precio: 1000, stock: 3 }
];

// Ordenar por precio (descendente) y luego por stock (ascendente)
productos.sort((a, b) => {
  if (b.precio !== a.precio) {
    return b.precio - a.precio;
  }
  return a.stock - b.stock;
});

///////////

