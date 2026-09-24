const inputLugar = document.getElementById("lugar");
const botonBuscar = document.getElementById("buscar");
const resultados = document.getElementById("resultados");


async function buscarLugar() {

    const lugar = inputLugar.value.trim();

    // Verificar que se haya escrito un lugar
    if (!lugar) {
        resultados.innerHTML = `
            <p class="error">
                Ingresa el nombre de un lugar.
            </p>
        `;
        return;
    }

    // Mensaje mientras se realiza la consulta
    resultados.innerHTML = `
        <p class="cargando">
            Consultando información...
        </p>
    `;

    try {

        const respuesta = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(lugar)}&count=1&language=es&format=json`
        );

        if (!respuesta.ok) {
            throw new Error("No se pudo realizar la consulta");
        }

        const data = await respuesta.json();

        // Verificar si se encontró el lugar
        if (!data.results || data.results.length === 0) {

            resultados.innerHTML = `
                <p class="error">
                    No se encontró el lugar. Intenta con otro nombre.
                </p>
            `;

            return;
        }

        const ciudad = data.results[0];

        // Mostrar información
        resultados.innerHTML = `
            <div class="resultado">

                <h2>${ciudad.name}</h2>

                <p><strong>País:</strong> 
                    ${ciudad.country || "No disponible"}
                </p>

                <p><strong>Estado:</strong> 
                    ${ciudad.admin1 || "No disponible"}
                </p>

                <p><strong>Latitud:</strong> 
                    ${ciudad.latitude}
                </p>

                <p><strong>Longitud:</strong> 
                    ${ciudad.longitude}
                </p>

                <p><strong>Zona horaria:</strong> 
                    ${ciudad.timezone || "No disponible"}
                </p>

            </div>
        `;

        console.log(ciudad);

    } catch (error) {

        resultados.innerHTML = `
            <p class="error">
                Ocurrió un error al consultar la información.
                Intenta nuevamente.
            </p>
        `;

        console.log(error);
    }
}


// Buscar al presionar el botón
botonBuscar.addEventListener("click", buscarLugar);


// Buscar también al presionar Enter
inputLugar.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        buscarLugar();
    }

});