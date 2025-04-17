// document.addEventListener("DOMContentLoaded", function () {
//     const productoID = document.getElementById("productoID");
//     const buscarProductoBtn = document.getElementById("buscarProducto");
//     const productoInfo = document.getElementById("productoInfo");
//     const vendedorInput = document.getElementById("vendedor");
//     const confirmarVentaBtn = document.getElementById("confirmarVenta");
//     const limpiarBtn = document.getElementById("limpiar");

//     const googleSheetURL = "https://script.google.com/macros/s/AKfycbz5o2X3pxGy6v2Yd66oAm2oncuf7oC0sFtAF2N0gz21DSkNBpEHLzWMjRkHAmKxxrsO/exec";

//     // 🧠 Cargar el vendedor si está guardado
//     const vendedorGuardado = localStorage.getItem("vendedor");
//     if (vendedorGuardado) vendedorInput.value = vendedorGuardado;

//     function mostrarCargando() {
//         productoInfo.classList.remove("hidden");
//         document.getElementById("marca").innerHTML = '<span class="spinner"></span>Buscando...';
//         document.getElementById("modelo").innerText = "";
//         document.getElementById("color").innerText = "";
//         document.getElementById("familia").innerText = "";
//         document.getElementById("precio").innerText = "";
//         document.getElementById("fechaVenta").innerText = "";
//     }

//     function buscarProducto() {
//         const id = productoID.value.trim();
//         if (!id) {
//             Swal.fire("Falta el ID", "Ingresá un número de producto", "warning");
//             return;
//         }

//         mostrarCargando();
//         buscarProductoBtn.disabled = true;

//         fetch(`${googleSheetURL}?producto=${id}`)
//             .then(response => response.json())
//             .then(data => {
//                 if (data.status === "error") {
//                     Swal.fire("Error", data.mensaje, "error");
//                     productoInfo.classList.add("hidden");
//                     return;
//                 }

//                 document.getElementById("marca").innerText = data.marca || "No disponible";
//                 document.getElementById("modelo").innerText = data.modelo || "No disponible";
//                 document.getElementById("color").innerText = data.color || "No disponible";
//                 document.getElementById("familia").innerText = data.familia || "No disponible";
//                 document.getElementById("precio").innerText = data.precio || "No disponible";
//                 document.getElementById("fechaVenta").innerText = data.fechaVenta || "No vendida";

//                 productoInfo.classList.remove("hidden");
//             })
//             .catch(error => {
//                 console.error("Error en la solicitud:", error);
//                 Swal.fire("Ups...", "Hubo un error al buscar el producto", "error");
//                 productoInfo.classList.add("hidden");
//             })
//             .finally(() => {
//                 buscarProductoBtn.disabled = false;
//             });
//     }

//     function confirmarVenta() {
//         const vendedor = vendedorInput.value.trim();
//         const id = productoID.value.trim();

//         if (!id) {
//             Swal.fire("Falta producto", "No hay producto seleccionado", "warning");
//             return;
//         }
//         if (!vendedor) {
//             Swal.fire("Falta vendedor", "Ingresá el nombre del vendedor", "warning");
//             return;
//         }

//         // Guardar vendedor para la próxima
//         localStorage.setItem("vendedor", vendedor);
//         confirmarVentaBtn.disabled = true;

//         fetch(googleSheetURL, {
//             method: "POST",
//             mode: "no-cors",
//             body: JSON.stringify({ producto: id, vendedor: vendedor }),
//             headers: { "Content-Type": "application/json" }
//         })
//             .then(() => {
//                 Swal.fire("¡Éxito!", "Venta registrada correctamente", "success");
//                 productoInfo.classList.add("hidden");
//                 productoID.value = "";
//             })
//             .catch(error => {
//                 console.error("Error:", error);
//                 Swal.fire("Error", "No se pudo registrar la venta", "error");
//             })
//             .finally(() => {
//                 confirmarVentaBtn.disabled = false;
//             });
//     }

//     buscarProductoBtn.addEventListener("click", buscarProducto);
//     productoID.addEventListener("keypress", function (event) {
//         if (event.key === "Enter") buscarProducto();
//     });
//     confirmarVentaBtn.addEventListener("click", confirmarVenta);
// });
