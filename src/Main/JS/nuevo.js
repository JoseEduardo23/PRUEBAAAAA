
let peliculas = []; 
let peliculasFiltradas = []; 
let paginaActual = 1;
const peliculasPorPagina = 10;

const cargarImagenes = async () => {
  const url = 'https://imdb188.p.rapidapi.com/api/v1/getFanFavorites?country=US';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '9cd8a412e8msh32562a165b35b5ep13d3c4jsnd7ec50c8c811',
		  'x-rapidapi-host': 'imdb188.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    

    peliculas = data.data.list;  
    peliculasFiltradas = peliculas;
    mostrarPeliculas(); 
  } catch (error) {
    console.error("Error al cargar las películas:", error);
  }
};


const mostrarPeliculas = () => {
  const contenedor = document.getElementById('peliculas-container');
  contenedor.innerHTML = '';

  // Calcula el índice inicial y final para la paginación
  const inicio = (paginaActual - 1) * peliculasPorPagina;
  const fin = inicio + peliculasPorPagina;
  const peliculasPagina = peliculasFiltradas.slice(inicio, fin);

  peliculasPagina.forEach(pelicula => {
    const div = document.createElement('div');
    div.classList.add('pelicula');

    div.innerHTML = `
      <img src="${pelicula.primaryImage.imageUrl}" alt="${pelicula.titleText.text}" />
      <div class="pelicula-info">
        <h3>${pelicula.titleText.text}</h3>
        <p><strong>Año:</strong> ${pelicula.releaseYear.year}</p>
        <p><strong>Género:</strong> ${pelicula.titleType.text}</p>
        <p><strong>Descripción:</strong> ${pelicula.plot.plotText.plainText}</p>
      </div>
    `;

    contenedor.appendChild(div);
  });

  actualizarBotones();
};

const actualizarBotones = () => {
  const btnAnterior = document.getElementById('btn-anterior');
  const btnSiguiente = document.getElementById('btn-siguiente');

  // Deshabilita el botón "Anterior" si estamos en la primera página
  btnAnterior.disabled = paginaActual === 1;
  // Deshabilita el botón "Siguiente" si estamos en la última página
  btnSiguiente.disabled = paginaActual * peliculasPorPagina >= peliculasFiltradas.length;
};

const cambiarPagina = (incremento) => {
  paginaActual += incremento;
  mostrarPeliculas();
};


const filtrarPorGenero = () => {
  const generoSeleccionado = document.getElementById('genre-select').value;

  if (generoSeleccionado) {
   
    peliculasFiltradas = peliculas.filter(pelicula =>
      pelicula.titleType.text.toLowerCase().includes(generoSeleccionado.toLowerCase())
    );
  } else {
   
    peliculasFiltradas = peliculas;
  }
  paginaActual = 1; //
  mostrarPeliculas(); 
};


const buscarPeliculas = () => {
  const query = document.getElementById('search-input').value.toLowerCase();

 
  peliculasFiltradas = peliculas.filter(pelicula =>
    pelicula.titleText.text.toLowerCase().includes(query)
  );
  paginaActual = 1;
  mostrarPeliculas(); 
};


document.getElementById('genre-select').addEventListener('change', filtrarPorGenero);
document.getElementById('search-input').addEventListener('input', buscarPeliculas);
document.getElementById('btn-anterior').addEventListener('click', () => cambiarPagina(-1));
document.getElementById('btn-siguiente').addEventListener('click', () => cambiarPagina(1));

cargarImagenes();
