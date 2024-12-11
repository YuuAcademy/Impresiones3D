document.addEventListener("DOMContentLoaded", () => {
    // Lightbox para ampliar imágenes
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const images = document.querySelectorAll(".trabajos img");

    // Mostrar la imagen ampliada al hacer clic
    images.forEach((img) => {
        img.addEventListener("click", () => {
            lightboxImg.src = img.src;
            lightbox.classList.remove("hidden");
        });
    });

    // Cerrar el lightbox al hacer clic fuera de la imagen
    lightbox.addEventListener("click", (e) => {
        if (e.target !== lightboxImg) {
            lightbox.classList.add("hidden");
            lightboxImg.src = ""; // Limpia la imagen para evitar problemas
        }
    });

    // Manejo del formulario de registro de ventas
    const btnRegistrarVenta = document.getElementById("btnRegistrarVenta");
    const formularioVenta = document.getElementById("formularioVenta");
    const cerrarFormulario = document.getElementById("cerrarFormulario");
    const ventaForm = document.getElementById("ventaForm");

    // Abrir formulario
    btnRegistrarVenta.addEventListener("click", () => {
        formularioVenta.classList.remove("hidden");
    });

    // Cerrar formulario
    cerrarFormulario.addEventListener("click", () => {
        formularioVenta.classList.add("hidden");
    });

    // Enviar los datos del formulario
    ventaForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const datos = {
            producto: document.getElementById("producto").value.trim(),
            cantidad: Number(document.getElementById("cantidad").value),
            precio: parseFloat(document.getElementById("precio").value),
        };

        try {
            const respuesta = await fetch("/guardarVenta", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datos),
            });

            if (respuesta.ok) {
                const mensaje = await respuesta.text();
                alert(mensaje);
                formularioVenta.classList.add("hidden");
                ventaForm.reset();
            } else {
                const error = await respuesta.text();
                alert(`Error: ${error}`);
            }
        } catch (error) {
            console.error("Error al enviar los datos:", error);
            alert("Hubo un problema al conectar con el servidor.");
        }
    });
});
