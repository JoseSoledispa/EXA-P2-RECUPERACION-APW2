window.addEventListener('load', function(){
    let htmlGenerado="";
    htmlGenerado+=`<label for="txtid">Curso:</label>`
    htmlGenerado+=`<input type="text" id="txtid">`
    htmlGenerado+=`<label for="txtdetalle">Estudiantes Aprobados:</label>`
    htmlGenerado+=`<input type="text" id="txtdetalle">`
    htmlGenerado+=`<label for="txtdescripcion">Estudiantes con notas menores a 7 y mayores o iguales a 5:</label>`
    htmlGenerado+=`<input type="descripcion" id="txtdescripcion">`
    htmlGenerado+=`<label for="txtticket">Estudiantes que asisten a tutoria:</label>`
    htmlGenerado+=`<input type="text" id="txtticket">`
    htmlGenerado+=`<button id="btnnuevo">GET</button>`
    htmlGenerado+=`<button id="btngrabar">POST</button>`
    htmlGenerado+=`<button id="btnmodificar">PUT</button>`
    htmlGenerado+=`<button id="btnconsultar">PATCH</button>`
    htmlGenerado+=`<button id="btneliminar">DELETE</button>`
    htmlGenerado+=`<div id="divcontenido"></div>`
    htmlCuerpo.innerHTML = htmlGenerado;

    btnnuevo.addEventListener('click',function(){
        txtid.value='';
        txtdetalle.value='';
        txtdescripcion.value='';
        txtticket.value='';
        txtfecha.value='';
        txthora.value='';
    })
    btngrabar.addEventListener('click',function(){
        let url=`http://localhost:5000/v1/inventario/api/mantenimientos`;
        let data={
            detalle: txtdetalle.value,

            descripcion: txtdescripcion.value,

            ticket: txtticket.value,
            fecha: txtfecha.value,
            hora: txthora.value,
        };
        fetch(url, {
            method:'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res=> res.json())
        .then(resultado=> console.log(resultado))
        .catch(error=> console.log)
    })
    btnmodificar.addEventListener('click', function(){
        let url=`http://localhost:5000/v1/inventario/api/productos/${txtid.value}`;
        let data={
            detalle: txtdetalle.value,
            descripcion: txtdescripcion.value,
            ticket: txtticket.value,
            fecha: txtfecha.value,
            hora: txthora.value,
        };
        fetch(url, {
            method:'PUT',
            body: JSON.stringify(data),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=> res.json())
        .then(resultado=> console.log(resultado))
        .catch(error=> console.log(error))
    })
    btnconsultar.addEventListener('click',function(){
        let url=`http://localhost:5000/v1/inventario/api/mantenimientos`;
        fetch(url).then(resultado=>{
            return resultado.json()
        })
        .then(consulta=>{
            let tabla=`<table border=1>`
            for (const elemento  in consulta.productos )
            {
                const actual  =consulta.productos[elemento];
                tabla+= `<tr>`
                tabla+= `<td> <button class='actualizar' value='${actual._id}'>${ actual.detalle }</button> </td>`
                tabla+= `<td>${ actual.ticket }</td>`
                tabla+= `<td>${ actual.fecha }</td>`
                tabla+= `</tr>`
            }
            tabla+=`</table>`
            divcontenido.innerHTML = tabla;
            document.querySelectorAll('.actualizar').forEach(e=>{
                e.addEventListener('click',()=>{
                    fetch(`http://localhost:5000/v1/inventario/api/mantenimientos/${e.value}`)
                    .then(
                        respuesta=>{
                            return respuesta.json()
                        }
                    )
                    .then(convertido=>{
                        txtid.value= convertido._id;
                        txtdetalle.value= convertido.detalle;
                        txtdescripcion.value= convertido.descripcion;
                        txtfecha.value= convertido.fecha;
                        txtticket.value= convertido.ticket;
                        txthora.value= convertido.hora;
                    })
                })
            })
        })
    })
    btneliminar.addEventListener('click',function(){
        let url=`http://localhost:5000/v1/inventario/api/mantenimientos/${txtid.value}`;
        fetch(url, {
            method:'DELETE',
        })
        .then(res=> res.json())
        .then(resultado=> console.log(resultado))
        .catch(error=> console.log(error))
    })
})


