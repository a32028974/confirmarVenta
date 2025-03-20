document.addEventListener("DOMContentLoaded", function() {
    const productoID = document.getElementById("productoID");
    const buscarProductoBtn = document.getElementById("buscarProducto");
    const productoInfo = document.getElementById("productoInfo");
    const vendedorInput = document.getElementById("vendedor");
    const confirmarVentaBtn = document.getElementById("confirmarVenta");
    const limpiarBtn = document.getElementById("limpiar");

    // 👉 URL de Google Apps Script (actualizada con la nueva implementación)
    const googleSheetURL = "https://script.google.com/macros/s/AKfycbz5o2X3pxGy6v2Yd66oAm2oncuf7oC0sFtAF2N0gz21DSkNBpEHLzWMjRkHAmKxxrsO/exec";

    function buscarProducto() {
        const id = productoID.value.trim();
        if (!id) {
            alert("Ingrese un número de producto");
            return;
        }

        fetch(`${googleSheetURL}?producto=${id}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === "error") {
                    alert(`⚠️ Error: ${data.mensaje}`);
                    return;
                }

                document.getElementById("marca").innerText = data.marca || "No disponible";
                document.getElementById("modelo").innerText = data.modelo || "No disponible";
                document.getElementById("color").innerText = data.color || "No disponible";
                document.getElementById("familia").innerText = data.familia || "No disponible";
                document.getElementById("precio").innerText = data.precio || "No disponible";
                document.getElementById("fechaVenta").innerText = data.fechaVenta || "No vendida";

                productoInfo.classList.remove("hidden");

                document.querySelector(".container").classList.add("horizontal");

            })
            .catch(error => {
                console.error("Error en la solicitud:", error);
                alert("⚠️ Hubo un error al buscar el producto.");
            });
    }

    confirmarVentaBtn.addEventListener("click", function() {
        const vendedor = vendedorInput.value.trim();
        const id = productoID.value.trim();
    
        if (!id) {
            alert("No hay producto seleccionado.");
            return;
        }
        if (!vendedor) {
            alert("Ingrese el nombre del vendedor.");
            return;
        }
    
        fetch(googleSheetURL, {
            method: "POST",
            mode: "no-cors",  // 👈 Evita el bloqueo de CORS
            body: JSON.stringify({ producto: id, vendedor: vendedor }),
            headers: { "Content-Type": "application/json" }
        })
        .then(() => {
            alert("✅ Venta registrada con éxito.");
            productoInfo.classList.add("hidden");
            productoID.value = "";
            vendedorInput.value = "";
        })
        .catch(error => console.error("Error:", error));
    });
    buscarProductoBtn.addEventListener("click", function() {
    buscarProducto();
});    

    productoID.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            buscarProducto();
        }
    });
        confirmarVentaBtn.addEventListener("click", confirmarVenta);
});
